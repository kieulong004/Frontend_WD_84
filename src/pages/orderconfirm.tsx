import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Các interface định nghĩa kiểu dữ liệu
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

const OrderConfirm: React.FC = () => {
  const formatCurrency = (value: number | string): string => {
    return Number(value).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy thông tin đơn hàng từ state
  const order: Order = location.state?.order;

  // Kiểm tra xem có thông tin đơn hàng hay không
  if (!order) {
    return <p>Không có thông tin đơn hàng.</p>;
  }

  return (
    <div className="container py-5">
      <div className="text-center">
        <h1>Xác nhận đơn hàng</h1>

        {/* Chi tiết sản phẩm */}
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Chi tiết sản phẩm</h5>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                      <th scope="col">Tổng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_details.map((detail) => (
                      <tr key={detail.id}>
                        <td>
                          <img
                            src={`http://127.0.0.1:8000${detail.variant.product.image}`} // Đường dẫn đến hình ảnh
                            alt={detail.variant.product.name}
                            onError={(e) => {
                              e.currentTarget.src =
                                "/path-to-fallback-image.jpg"; // Cập nhật đường dẫn này
                            }}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>{detail.variant.product.name}</td>
                        <td>{detail.quantity}</td>
                        <td>{formatCurrency(detail.variant.selling_price)}</td>
                        <td>
                          {formatCurrency(
                            parseFloat(detail.variant.selling_price) *
                              detail.quantity
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className="text-danger mt-3">
                  Tổng cộng: {formatCurrency(order.total_price)}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Chi Tiết Đơn Hàng</h5>
                <p>
                  Mã đơn hàng:<strong>{order.code}</strong>
                </p>
                <p>
                  Phương thức thanh toán:
                  <strong>{order.payment_method}</strong>
                </p>
                <p>Tên: {order.name}</p>
                <p>Liên hệ: {order.phone}</p>
                <p>Địa chỉ: {order.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/order-list")}
          >
            Xem Lịch Sử Đơn Hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
