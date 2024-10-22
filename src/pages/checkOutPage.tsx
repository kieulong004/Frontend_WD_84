import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserFromLocalStorage } from "@/components/utils";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Variant = {
  id: number;
  weight: {
    weight: string;
    unit: string;
  };
  size?: string;
};

type CartItem = {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  variant?: Variant;
};

type CartResponse = {
  status: boolean;
  message: string;
  cart_items: CartItem[];
};

type Order = {
  id: number;
  code: string;
  total_price: number;
};

type OrderResponse = {
  status: boolean;
  message: string;
  order?: Order;
};

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const shippingFee = 30000; // Đặt giá trị mặc định cho phí vận chuyển

  const userFromStorage = getUserFromLocalStorage();
  const userId = userFromStorage.id;

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userFromStorage) {
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
          } else {
            setError(
              response.data.message || "Không có sản phẩm trong giỏ hàng"
            );
            setTotalPrice(0);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Lỗi khi lấy các sản phẩm trong giỏ hàng:",
              error.response?.data
            );
            setError(
              error.response?.data.message ||
                "Lỗi khi lấy các sản phẩm trong giỏ hàng"
            );
          } else {
            console.error("Lỗi không xác định:", error);
            setError("Có lỗi không xác định xảy ra");
          }
        }
      }
    };

    fetchCartItems();
  }, [userFromStorage]);

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

    if (!name || !phone || !address || cartItems.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin và kiểm tra giỏ hàng.");
      return;
    }

    const orderData = {
      user_id: userId,
      code: generateOrderCode(),
      name,
      phone,
      address,
      shipping_fee: shippingFee, // Gửi phí vận chuyển từ Frontend, nhưng không cộng vào tổng tiền
      payment_method: "COD",
      total_price: totalPrice, // Chỉ tổng tiền sản phẩm, không cộng phí ship
      products: cartItems.map((item) => ({
        product_id: item.product.id,
        variant_id: item.variant?.id || null,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    setLoading(true);

    try {
      const response = await axios.post<OrderResponse>(
        "http://127.0.0.1:8000/api/orders/storeOrder",
        orderData
      );

      if (response.data.status) {
        toast.success("Đơn hàng đã được xác nhận thành công!");
        await clearCart();

        setCartItems([]);
        setTotalPrice(0);

        navigate("/confirm", {
          state: { orderId: response.data.order?.code },
        });
      } else {
        toast.error(`Lỗi: ${response.data.message}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Lỗi khi gửi đơn hàng:",
          error.response?.data || error.message
        );
        toast.error(
          `Có lỗi xảy ra: ${error.response?.data?.message || error.message}`
        );
      } else {
        console.error("Lỗi không xác định:", error);
        toast.error("Có lỗi xảy ra trong quá trình xác nhận đơn hàng.");
      }
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const clearCartResponse = await axios.delete(
        `http://localhost:8000/api/carts/delete-cart/${userId}`
      );
      if (clearCartResponse.data.status) {
        toast.success("Giỏ hàng đã được làm trống sau khi đặt hàng.");
      } else {
        toast.error("Không thể xóa giỏ hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
      toast.error("Có lỗi xảy ra khi làm trống giỏ hàng.");
    }
  };

  const generateOrderCode = () => {
    return `ORDER-${Date.now()}`;
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row">
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
                pattern="[0-9]{10}"
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
            {/* Không hiển thị phí vận chuyển trên giao diện */}
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
                    onError={(e) => {
                      e.currentTarget.src = "/path-to-fallback-image.jpg"; // Đường dẫn thay thế nếu không tải được ảnh
                    }}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <span className="fw-bold">
                    {item.product.name} (x{item.quantity})
                  </span>
                  {item.variant && (
                    <div
                      style={{
                        fontSize: "0.9rem",
                        color: "#555",
                        marginLeft: "10px",
                      }}
                    >
                      <div>
                        Trọng lượng: {item.variant.weight.weight}{" "}
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

            {/* Phí vận chuyển */}
            <li className="list-group-item d-flex justify-content-between">
              <span>Phí vận chuyển</span>
              <strong>{formatCurrency(30000)}</strong>{" "}
              {/* Hiển thị phí vận chuyển */}
            </li>

            {/* Tổng cộng không bao gồm phí vận chuyển */}
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng cộng</span>
              <strong>{formatCurrency(totalPrice)}</strong>{" "}
              {/* Tổng tiền chỉ bao gồm tổng sản phẩm */}
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
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment2"
                value="bankTransfer"
              />
              <label className="form-check-label" htmlFor="payment2">
                Chuyển khoản ngân hàng
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
