import Footer from '../Footer';
import Header from '../Header';
import { Outlet, useLocation } from 'react-router-dom';
import Logo from '../logo';

const LayoutWebsite = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/products/pay";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <div>
      {isCheckoutPage ? (
        <div className="d-flex align-items-center my-4 mx-4">
          <Logo   />
          <h1 className="mb-2" style={{ fontSize: '20px' }}>Thanh toán</h1>
        </div>
      ) : isLoginPage ? (
        <div className="d-flex align-items-center my-4 mx-4">
          <Logo  />
          <h1 className="mb-2" style={{ fontSize: '20px' }}>Đăng nhập</h1>
        </div>

      ) : isRegisterPage ? (
        <div className="d-flex align-items-center my-4 mx-4">
          <Logo  />
          <h1 className="mb-2" style={{ fontSize: '20px' }}>Đăng kí</h1>
        </div>
      ) : (
        <Header />
      )}
      <Outlet />
      {!isCheckoutPage && !isLoginPage && !isRegisterPage && <Footer />}
    </div>
  );
};

export default LayoutWebsite;