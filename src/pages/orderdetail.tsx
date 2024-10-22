import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const { order } = location.state as { order: Order };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN").format(Number(price));
  };

  return (
    <div className="container mt-4 mb-5">
      <hr />
      <h3 className="text-center">Chi tiết đơn hàng</h3>
      <div className="order-details ">
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
          <p>
            <strong>Trạng thái:</strong> {order.status}
          </p>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Địa chỉ giao hàng</h5>
            <p>{order.name}</p>
            <p>{order.address}</p>
            <p>{order.phone}</p>
          </div>
        </div>
      </div>

      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Ảnh sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Tổng giá</th>
          </tr>
        </thead>
        <tbody>
          {order.order_details.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.variant.product.name}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000${detail.variant.product.image}`}
                  alt={detail.variant.product.name}
                  width={50}
                />
              </td>
              <td>{detail.quantity}</td>
              <td>{formatPrice(detail.variant.selling_price)} VNĐ</td>
              <td>{formatPrice(detail.total)} VNĐ</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
