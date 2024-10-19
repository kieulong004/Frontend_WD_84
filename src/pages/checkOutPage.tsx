import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Định nghĩa kiểu cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  image: string; // Đường dẫn ảnh của sản phẩm
};

// Định nghĩa kiểu cho biến thể
type Variant = {
  id: number;
  weight: {
    weight: string;
    unit: string;
  };
  size?: string; // Nếu có kích thước
};

// Định nghĩa kiểu cho sản phẩm trong giỏ hàng
type CartItem = {
  id: number;
  product: Product; // Thông tin sản phẩm chi tiết
  quantity: number;
  price: number;
  variant?: Variant; // Biến thể sản phẩm (nếu có)
};

// Định nghĩa kiểu cho phản hồi từ API giỏ hàng
type CartResponse = {
  status: boolean;
  message: string;
  cart_items: CartItem[];
};

// Định nghĩa kiểu cho phản hồi khi lưu đơn hàng
type OrderResponse = {
  status: boolean;
  message: string;
};

const CheckoutPage: React.FC = () => {
  const userId = null; // userId là null
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const shippingFee = 30000;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<CartResponse>(
          `http://localhost:8000/api/carts/cart-list/${userId}`
        );
        if (response.data.status) {
          setCartItems(response.data.cart_items);
          const total = response.data.cart_items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotalPrice(total);

          // Kiểm tra nếu giỏ hàng trống và chuyển hướng về trang sản phẩm
          if (response.data.cart_items.length === 0) {
            toast.error("Giỏ hàng của bạn trống, quay lại trang sản phẩm.");
            nav("/products"); // Chuyển hướng về trang sản phẩm
          }
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Không có sản phẩm nào.");
        // Nếu có lỗi khi lấy giỏ hàng hoặc giỏ hàng rỗng, chuyển hướng về trang sản phẩm
        nav("/products");
      }
    };

    fetchCartItems();
  }, [userId, nav]);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const handleOrderConfirmation = async (event: React.FormEvent) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;

    const orderData = {
      user_id: null,
      code: generateOrderCode(),
      name: name,
      phone: phone,
      address: address,
      total_price: totalPrice + shippingFee,
      products: cartItems.map((item) => ({
        variant_id: item.variant?.id || null,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    setLoading(true);

    try {
      const response = await axios.post<OrderResponse>(
        "http://localhost:8000/api/orders/storeOrder",
        orderData
      );
      if (response.data.status) {
        toast.success("Đơn hàng đã được xác nhận thành công!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        nav("/order-confirm");
      } else {
        toast.error(`Lỗi: ${response.data.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Có lỗi xảy ra trong quá trình xác nhận đơn hàng.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const generateOrderCode = () => {
    // Tạo mã đơn hàng tùy ý
    return `ORDER-${Date.now()}`;
  };

  return (
    <div className="container py-5">
      <div className="row">
        {/* Thông tin người dùng và các thông tin khác */}
        <ToastContainer />
        <div className="col-md-7">
          <h2 className="mb-4">Thông tin giao hàng</h2>
          <form onSubmit={handleOrderConfirmation}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="0901234567"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="123 Đường ABC, Quận X, TP.HCM"
                required
              />
            </div>
            <button
              className="btn btn-primary btn-lg w-100 mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Xác nhận đơn hàng"}
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <h2 className="mb-4">Tóm tắt đơn hàng</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <img
                    src={`http://127.0.0.1:8000${item.product.image}`}
                    alt={item.product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <span className="fw-bold margin-right: 10px">
                    {item.product.name} (x{item.quantity})
                  </span>
                  {/* Hiển thị thông tin biến thể nếu có */}
                  {item.variant && (
                    <div style={{ fontSize: "0.9rem", color: "#555" }}>
                      <div>
                        Kích thước: {item.variant.weight.weight}{" "}
                        {item.variant.weight.unit}
                      </div>
                      {item.variant.size && (
                        <div>Kích thước: {item.variant.size}</div>
                      )}
                    </div>
                  )}
                </div>
                <strong>{formatCurrency(item.price * item.quantity)}</strong>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Phí vận chuyển</span>
              <strong>{formatCurrency(shippingFee)}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng cộng</span>
              <strong>{formatCurrency(totalPrice + shippingFee)}</strong>
            </li>
          </ul>

          <h4 className="mb-3">Phương thức thanh toán</h4>
          <form>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment1"
                value="cod"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="payment1">
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment2"
                value="creditCard"
              />
              <label className="form-check-label" htmlFor="payment2">
                Thẻ tín dụng/Thẻ ghi nợ
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
