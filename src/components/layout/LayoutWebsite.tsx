import Footer from '../Footer'
import Header from '../Header'
import { Outlet, useLocation } from 'react-router-dom'
import Logo from '../logo';

const LayoutWebsite = () => {
  const location = useLocation();
  const isCheckoutPage = location.pathname === "/products/pay";
  return (
    <div>
       {isCheckoutPage ? <Logo  /> : <Header />}
        <Outlet />
        {!isCheckoutPage && <Footer />}
    </div>
  )
}

export default LayoutWebsite