import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUserFromLocalStorage } from '@/components/utils'; 

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

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userFromStorage = getUserFromLocalStorage();

      if (userFromStorage) {
        const userId = userFromStorage.id;
        try {
          const { data } = await axios.get(`http://localhost:8000/api/orders/order-list/${userId}`);
          setOrders(data.data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <hr />
      <h3 className="text-center">Tài khoản của bạn</h3>
      <div className="row mt-5">
        {/* Sidebar */}
        <div className="col-md-3">
          <div className="list-group">
            <button className="list-group-item list-group-item-action ">
              Thông tin
            </button>
            <button className="list-group-item list-group-item-action active">
              Lịch sử và chi tiết đơn hàng
            </button>
            <button className="list-group-item list-group-item-action">
              Đăng xuất
            </button>
          </div>
        </div>

        {/* Order History Table */}
        <div className="col-md-9">
          <h4>Lịch sử đơn hàng</h4>
          <p>Đây là các đơn đặt hàng bạn có kể từ khi tạo tài khoản này</p>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Mã đặt hàng</th>
                <th scope="col">Ngày</th>
                <th scope="col">Tổng giá</th>
                <th scope="col">Thanh toán</th>
                <th scope="col">Trạng thái thanh toán</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr key={order.id}>
                  <td>{order.code}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.total_price} đ</td>
                  <td>{order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : order.payment_method}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.status}</td>
                  <td>{order.order_details.length}</td>
                  <td className="text-center align-middle">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                      <Link to={`/order-detail/${order.id}`} state={{ order }}>
                        <button className="btn btn-outline-info btn-sm px-3 d-flex justify-content-center align-items-center">
                          <i className="bi bi-exclamation-circle-fill"></i>
                        </button>
                      </Link>
                      <button className="btn btn-outline-danger btn-sm px-3 d-flex justify-content-center align-items-center">
                        <i className="bi bi-cart-plus-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderList;