import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { getUser } from "@/components/utils";
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  code: string;
  created_at: string;
  total_price: string;
  payment_method: string;
  payment_status: string;
  status: string;
  order_details: {
    id: number;
    product_name: string;
    quantity: number;
    price: string;
    total: string;
    product_image: string;
  }[];
}

interface SearchFormData {
  searchTerm: string;
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userFromStorage = getUser();
  const { register, handleSubmit } = useForm<SearchFormData>();

  useEffect(() => {
    document.title = "Lịch sử đơn hàng";
  }, []);
  const fetchOrders = async () => {
    if (userFromStorage) {
      const userId = userFromStorage.id;
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/orders/order-list/${userId}`
        );
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    setSearchTerm(data.searchTerm);
  };

  const filteredOrders = orders.filter((order) =>
    order.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm định dạng giá tiền theo VNĐ
  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      {orders.length > 0 && (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
          <h4>Lịch sử đơn hàng</h4>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm đơn hàng theo mã"
              {...register("searchTerm")}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Tìm kiếm
            </button>
          </div>
        </form>
      )}
      {filteredOrders.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-secondary p-5 border border-light">
            <h4 className="mb-3 text-primary">Đơn hàng của bạn đang trống</h4>
            <p className="mb-4">Khám phá thêm những sản phẩm tuyệt vời và đặt hàng để nhận nhiều ưu đãi đặc biệt.</p>
            <Link to="/products" className="btn btn-success btn-lg">
              <i className="bi bi-cart-plus me-2"></i>Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      ) : (
        <div className="table-responsive" style={{ maxHeight: "415px", overflowY: "scroll" }}>
          <table className="table table-hover table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Mã đặt hàng</th>
                <th scope="col">Ngày</th>
                <th scope="col">Tổng đơn</th>
                <th scope="col">Thanh toán</th>
                <th scope="col">Trạng thái thanh toán</th>
                <th scope="col">Trạng thái đơn hàng</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order: Order) => (
                <tr key={order.id} className="align-middle">
                  <td className="text-center">{order.code}</td>
                  <td className="text-center">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-center">{formatCurrency(Number(order.total_price))}</td>
                  <td className="text-center">
                    {order.payment_method === "cod"
                      ? "Thanh toán khi nhận hàng (COD)"
                      : order.payment_method}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        order.payment_status === "paid"
                          ? "bg-success"
                          : "bg-warning"
                      } text-white mb-1`}
                    >
                      {order.payment_status === "paid"
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </span>
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        order.status === "completed"
                          ? "bg-primary"
                          : order.status === "cancelled"
                          ? "bg-danger"
                          : order.status === "shipping"
                          ? "bg-info"
                          : order.status === "confirmed"
                          ? "bg-secondary"
                          : order.status === "pending"
                          ? "bg-warning text-dark"
                          : order.status === "failed"
                          ? "bg-dark"
                          : order.status === "delivering"
                          ? "bg-success"
                          : "bg-info"
                      } text-white`}
                    >
                      {order.status === "completed"
                        ? "Hoàn thành / Đã nhận được hàng"
                        : order.status === "cancelled"
                        ? "Đã hủy"
                        : order.status === "shipping"
                        ? "Đang giao"
                        : order.status === "confirmed"
                        ? "Đã xác nhận"
                        : order.status === "pending"
                        ? "Chờ xác nhận"
                        : order.status === "failed"
                        ? "Giao hàng thất bại"
                        : order.status === "delivering"
                        ? "Giao hàng thành công"
                        : "Không xác định"}
                    </span>
                  </td>
                  <td className="text-center">
                    {order.order_details.length}
                  </td>
                  <td className="text-center">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                      <Link
                        to={`/order-detail/${order.id}`}
                        state={{ order }}
                      >
                        <button className="btn btn-outline-info btn-sm px-3 d-flex justify-content-center align-items-center">
                          <i className="bi bi-exclamation-circle-fill"></i>
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;