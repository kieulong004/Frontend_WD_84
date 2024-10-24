import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
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

interface SearchFormData {
  searchTerm: string;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const userFromStorage = getUserFromLocalStorage();
  const { register, handleSubmit } = useForm<SearchFormData>();

  const fetchOrders = useCallback(async () => {
    if (userFromStorage) {
      const userId = userFromStorage.id;
      try {
        const { data } = await axios.get(`http://localhost:8000/api/orders/order-list/${userId}`);
        setOrders(data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  }, [userFromStorage]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    setSearchTerm(data.searchTerm);
  };

  const handleCancelOrder = async (orderId: number) => {
    try {
      await axios.post(`http://localhost:8000/api/orders/cancel/${orderId}`);
      setOrders(orders.filter(order => order.id !== orderId));
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const filteredOrders = orders.filter(order =>
    order.code.includes(searchTerm)
  );

  return (
    <div className="container mt-5 mb-5">
      <hr />
      <h3 className="text-center">Tài khoản của bạn</h3>
      <div className="row mt-5">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group">
            <button className="list-group-item list-group-item-action">
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
          <form onSubmit={handleSubmit(onSubmit)} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm đơn hàng theo mã"
                {...register("searchTerm")}
              />
              <button type="submit" className="btn btn-primary">Tìm kiếm</button>
            </div>
          </form>
          <div className="table-responsive">
            <table className="table table-hover">
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
                {filteredOrders.map((order: Order) => (
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
                        <button className="btn btn-outline-danger btn-sm px-3 d-flex justify-content-center align-items-center" onClick={() => handleCancelOrder(order.id)}>
                          <i className="bi bi-x-circle-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default OrderList;