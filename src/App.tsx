import { Route, Routes } from "react-router-dom";
import "@/css/style.css";
import "@/css/login.css";
import LayoutWebsite from "./components/layout/LayoutWebsite";
import ProductDetail from "./pages/productDetail";
import CartPage from "./pages/cartPage";
import CheckoutPage from "./pages/checkOutPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import HomePage from "./pages/HomePage";
import OrderList from "./pages/orderlist";
import OrderDetail from "./pages/orderdetail";
import OrderConfirm from "./pages/orderconfirm";
import Productpage from "./pages/productPage";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import Confirm from "./pages/Confirm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Productpage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route
            path="products/cart"
            element={
              <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            }
          />
          <Route
            path="products/pay"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-list"
            element={
              <PrivateRoute>
                <OrderList />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-detail/:id"
            element={
              <PrivateRoute>
                <OrderDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/confirm"
            element={
              <PrivateRoute allowedRoles={[1]}>
                <Confirm />
              </PrivateRoute>
            }
          />
          <Route
            path="/order-confirm"
            element={
              <PrivateRoute>
                <OrderConfirm />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
      <ToastContainer /> {/* Thêm ToastContainer để hiển thị thông báo */}
    </>
  );
}

export default App;
