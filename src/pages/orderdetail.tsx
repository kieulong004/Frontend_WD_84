import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IoStar } from "react-icons/io5";
import { getToken } from "@/components/utils";

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  phone: string;
}

interface Weight {
  id: number;
  weight: string;
  unit: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image: string;
  sku: string;
  created_at: string;
  updated_at: string;
}

interface Variant {
  id: number;
  product_id: number;
  quantity: number;
  selling_price: string;
  import_price: string;
  listed_price: string;
  weight_id: number;
  product: Product;
  weight: Weight;
  created_at: string;
  updated_at: string;
}

interface OrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  total: string;
  variant_id: number;
  variant: Variant;
  created_at: string;
  updated_at: string;
}

interface Order {
  id: number;
  code: string;
  created_at: string;
  updated_at: string;
  address: string;
  name: string;
  phone: string;
  payment_method: string;
  payment_status: string;
  status: string;
  total_price: string;
  user_id: number;
  user: User;
  order_details: OrderDetail[];
}

interface Comment {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  user: { id: number; name: string } | null;
  product: { id: number; name: string };
  variant: { id: number; name: string | null };
}


const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [comments, setComments] = useState<Record<number, string>>({});
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [existingComments, setExistingComments] = useState<Record<string, Comment[]>>({});
  const token = getToken();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/orders/order-detail/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.status) {
          setOrder(data.data);
          fetchComments(data.data.id); // Gọi fetchComments với order_id
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Có lỗi xảy ra khi lấy chi tiết đơn hàng.");
      }
    };

    if (id) {
      fetchOrderDetail();
    }
  }, [id, token]);

  // Lấy danh sách đánh giá cho một sản phẩm và biến thể cụ thể
  const fetchComments = async (orderId: number) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/comments/product`,
        { order_id: orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.status) {
        const commentsData = data.data || [];
        const updatedComments = commentsData.reduce((acc: Record<string, Comment[]>, comment: Comment) => {
          const key = `${comment.product.id}-${comment.variant.id}`;
          if (!acc[key]) acc[key] = [];
          acc[key].push(comment);
          return acc;
        }, {} as Record<string, Comment[]>);
        setExistingComments(updatedComments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Có lỗi xảy ra khi lấy danh sách bình luận.");
    }
  };



  const handleCommentChange = (variantId: number, value: string) => {
    setComments((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleRatingChange = (variantId: number, value: number) => {
    setRatings((prev) => ({ ...prev, [variantId]: value }));
  };

  const submitComment = async (productId: number, variantId: number) => {
    if (!order || !order.id) {
      toast.error("Đơn hàng không tồn tại hoặc chưa được tải.");
      return;
    }

    if (!ratings[variantId] || ratings[variantId] < 1 || ratings[variantId] > 5) {
      toast.error("Vui lòng nhập số sao hợp lệ (1-5).");
      return;
    }

    if (!comments[variantId]) {
      toast.error("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/comments/add",
        {
          order_id: order?.id,
          product_id: productId,
          variant_id: variantId,
          user_id: order?.user_id,
          content: comments[variantId],
          rating: ratings[variantId],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Đánh giá đã được thêm thành công.");
      setComments((prev) => ({ ...prev, [variantId]: "" }));
      setRatings((prev) => ({ ...prev, [variantId]: 0 }));
      await fetchComments(order.id); 
    } catch (error) {
      console.error("Lỗi khi thêm đánh giá:", error);
      toast.error("Bạn chỉ có thể đánh giá một lần cho mỗi sản phẩm");
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN").format(Number(price));
  };

  const handleCancelOrder = async () => {
    try {
      await axios.get(`http://localhost:8000/api/orders/cancel-order/${order?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đơn hàng đã được hủy thành công.");
      setTimeout(() => {
        navigate("/order-list");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      toast.error("Đơn hàng đã được xác nhận không thể hủy");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleReceivedOrder = async () => {
    try {
      await axios.get(`http://localhost:8000/api/orders/order-markAsCompleted/${order?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Đơn hàng đã được xác nhận là đã nhận.");
      setTimeout(() => {
        navigate("/order-list");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi xác nhận đơn hàng:", error);
      toast.error("Có lỗi xảy ra khi xác nhận đơn hàng.");
    }
  };

  if (!order) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-4 mb-5">
      <ToastContainer />
      <h3 className="text-center">Chi tiết đơn hàng</h3>
      <div className="order-details">
        <div className="mb-3">
          <p>
            <strong>Mã đơn hàng:</strong> {order.code} - đặt vào{" "}
            {new Date(order.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Thanh toán:</strong>{" "}
            {order.payment_method === "cod"
              ? "Thanh toán khi nhận hàng (COD)"
              : order.payment_method}
          </p>
          <p><strong>Trạng thái:</strong>
            <span className={`badge ${order.status === 'completed' ? 'bg-primary' : order.status === 'cancelled' ? 'bg-danger' : order.status === 'shipping' ? 'bg-info' : order.status === 'confirmed' ? 'bg-secondary' : order.status === 'pending' ? 'bg-warning text-dark' : order.status === 'failed' ? 'bg-dark' : order.status === 'delivering' ? 'bg-success' : 'bg-info'} text-white`}>
              {order.status === 'completed' ? 'Hoàn thành / Đã nhận được hàng' : order.status === 'cancelled' ? 'Đã hủy' : order.status === 'shipping' ? 'Đang giao' : order.status === 'confirmed' ? 'Đã xác nhận' : order.status === 'pending' ? 'Chờ xác nhận' : order.status === 'failed' ? 'Giao hàng thất bại' : order.status === 'delivering' ? 'Giao hàng thành công' : 'Không xác định'}
            </span>
          </p>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Địa chỉ giao hàng</h5>
            <p>
              <strong>Tên khách hàng:</strong> {order.name}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order.address}
            </p>
            <p>
              <strong>Số điện thoại:</strong>
              {order.phone}
            </p>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Ảnh sản phẩm</th>
            <th>Kích thước</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Tổng giá</th>
            {order.status === "completed" && <th>Đánh giá</th>}
          </tr>
        </thead>
        <tbody>
          {order.order_details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.variant.product.name}</td>
              <td><img src={`http://127.0.0.1:8000${detail.variant.product.image}`} alt={detail.variant.product.name} width={50} /></td>
              <td>
                {detail.variant.weight ? `${detail.variant.weight.weight} ${detail.variant.weight.unit}` : "Không xác định"}
              </td>
              <td>{detail.quantity}</td>
              <td>{formatPrice(detail.variant.selling_price)} VNĐ</td>
              <td>{formatPrice(detail.total)} VNĐ</td>
              {order.status === "completed" && (
                <td>
                  <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <IoStar
                        key={star}
                        size={24}
                        color={star <= (ratings[detail.variant.id] || 0) ? "#ffc107" : "#e4e5e9"}
                        onClick={() => handleRatingChange(detail.variant.id, star)}
                        style={{ cursor: "pointer" }}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Nhập bình luận"
                    value={comments[detail.variant.id] || ""}
                    onChange={(e) => handleCommentChange(detail.variant.id, e.target.value)}
                    className="form-control mt-2"
                  />
                  <button
                    onClick={() => submitComment(detail.variant.product.id, detail.variant.id)}
                    disabled={!comments[detail.variant.id] || !ratings[detail.variant.id]}
                    className="btn btn-primary mt-2"
                  >
                    Gửi đánh giá
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-4">
        <button
          className="btn btn-danger"
          onClick={handleCancelOrder}
          disabled={order.status !== "pending"}
          style={{ color: "white" }}
        >
          Hủy đơn hàng
        </button>
        {order.status === "delivering" && (
          <button
            className="btn btn-info"
            style={{ marginLeft: "10px", color: "white" }}
            onClick={handleReceivedOrder}
          >
            Đã nhận được hàng
          </button>
        )}
      </div>

      {/* Phần hiển thị bình luận đã có */}
      <div className="existing-comments mt-5">
        <h4>Đánh giá của khách hàng về sản phẩm</h4>
        {order?.order_details.map((detail) => {
          const key = `${detail.variant.product.id}-${detail.variant.id}`;
          const comments = existingComments[key] || []; // Lấy comments cho product-variant cụ thể
          return (
            <div key={key} className="product-comments mb-4 p-3" style={{ border: "1px solid #ddd", borderRadius: "5px" }}>
              <h5 style={{ color: "#333", marginBottom: "10px" }}>{detail.variant.product.name}</h5>
              <div>
                {comments.map((comment: Comment, index: number) => (
                  <div key={index} style={{ marginBottom: "8px", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "5px", boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}>
                    <p>Kích thước: <strong>{detail.variant.weight ? `${detail.variant.weight.weight} ${detail.variant.weight.unit}` : "Không xác định"}</strong></p>
                    <p><strong>Nội dung:</strong> {comment.content}</p>
                    <p>
                      {[...Array(5)].map((_, i) => (
                        <IoStar
                          key={i}
                          size={20}
                          color={i < (comment.rating as number) ? "#ffc107" : "#e4e5e9"}
                          style={{ marginLeft: "4px" }}
                        />
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>



    </div>
  );
};

export default OrderDetail;