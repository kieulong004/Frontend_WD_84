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
import ComfirmCancel from "./pages/ComfirmCancel";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import DiscountPage from "./pages/DiscountPage";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<Productpage />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route
            path="voucher"
            element={
              <PrivateRoute>
                <DiscountPage />
              </PrivateRoute>
            }
          />
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
          >
            <Route index element={<OrderHistory />} />
            <Route path="profile" element={<Profile />} />
          </Route>
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
              <PrivateRoute>
                <Confirm />
              </PrivateRoute>
            }
          />
           <Route
            path="/about"
            element={
                <About />
            }
          />
          <Route
            path="/confirm-cancel"
            element={
              <PrivateRoute>
                <ComfirmCancel />
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
