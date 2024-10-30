import { Link, useLocation, Outlet } from "react-router-dom";
const OrderList = () => {
  const location = useLocation();
  return (
    <div className="container mt-5 mb-5">
      <hr />
      <div className="row mt-5">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group">
            <Link 
              to="/order-list/profile" 
              className={`list-group-item list-group-item-action ${location.pathname === '/order-list/profile' ? 'active' : ''}`}
            >
              Thông tin
            </Link>
            <Link 
              to="/order-list" 
              className={`list-group-item list-group-item-action ${location.pathname === '/order-list' ? 'active' : ''}`}
            >
              Lịch sử và chi tiết đơn hàng
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OrderList;
