import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { IoStar } from "react-icons/io5";

interface User {
  id: number;
  userName: string;
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

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [comments, setComments] = useState<Record<number, string>>({});
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [existingComments, setExistingComments] = useState<Record<string, Comment[]>>({});

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/orders/order-detail/${id}`);
        if (data.status) {
          setOrder(data.data);

          // Lấy đánh giá cho từng biến thể của sản phẩm trong đơn hàng
          const orderDetails = data.data?.order_details;
          if (Array.isArray(orderDetails) && orderDetails.length > 0) {
            orderDetails.forEach((detail) => {
              if (detail.variant && detail.variant.product) {
                // Gọi hàm fetchComments với cả productId và variantId
                fetchComments(detail.variant.product.id, detail.variant.id);
              }
            });
          }
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
  }, [id]);

  // Lấy danh sách đánh giá cho một sản phẩm và biến thể cụ thể
  const fetchComments = async (productId: number, variantId: number) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/api/comments/product/${productId}/variant/${variantId}`);
      setExistingComments((prev) => {
        const updatedComments = { ...prev, [`${productId}-${variantId}`]: data.data || [] };
        return updatedComments;
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentChange = (variantId: number, value: string) => {
    setComments((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleRatingChange = (variantId: number, value: number) => {
    setRatings((prev) => ({ ...prev, [variantId]: value }));
  };

  // Gửi đánh giá mới cho một biến thể cụ thể của sản phẩm
  const submitComment = async (productId: number, variantId: number) => {
    if (!ratings[variantId] || ratings[variantId] < 1 || ratings[variantId] > 5) {
      toast.error("Vui lòng nhập số sao hợp lệ (1-5).");
      return;
    }

    if (!comments[variantId]) {
      toast.error("Vui lòng nhập nội dung đánh giá.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/comments/add", {
        order_id: order?.id,
        product_id: productId,
        variant_id: variantId, // Thêm variant_id vào dữ liệu gửi lên
        user_id: order?.user_id,
        content: comments[variantId],
        rating: ratings[variantId],
      });
      toast.success("Đánh giá đã được thêm thành công.");
      setComments((prev) => ({ ...prev, [variantId]: "" }));
      setRatings((prev) => ({ ...prev, [variantId]: 0 }));
      fetchComments(productId, variantId); // Tải lại đánh giá sau khi thêm mới
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
      await axios.get(`http://localhost:8000/api/orders/cancel-order/${order?.id}`);
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
      await axios.get(`http://localhost:8000/api/orders/order-markAsCompleted/${order?.id}`);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4 mb-5">
      <ToastContainer />
      <hr />
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
            <th>Đánh giá</th>
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
              <td>
                {order.status === "completed" ? (
                  <>
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
                  </>
                ) : (
                  "Chỉ đánh giá khi đơn hàng hoàn thành"
                )}
              </td>
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
            className="btn btn-info animate__animated animate__pulse"
            style={{ marginLeft: "10px", color: "white" }}
            onClick={handleReceivedOrder}
          >
            Đã nhận được hàng
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
