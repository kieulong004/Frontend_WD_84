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
import ListProduct from "./pages/ListProduct";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWebsite />}>
          <Route index element={<HomePage />} />
          <Route path="list" element={<ListProduct />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="products/cart" element={<CartPage />} />
          <Route path="products/pay" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/order-list" element={<OrderList />} />
          <Route path="/order-detail" element={<OrderDetail />} />
          <Route path="/order-confirm" element={<OrderConfirm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
