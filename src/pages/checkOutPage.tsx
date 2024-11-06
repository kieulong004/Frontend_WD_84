import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken, getUser } from "@/components/utils";
import CouponPopup from "@/components/CouponPopup";
import '../css/CouponPopup.css';

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
  vnpay_url: string;
  payment_method: string;
};

interface Coupon {
  id: number;
  code: string;
  discount_min_price: string;
  discount_type: string;
  discount_value: string;
  end_date: string;
  total_uses:number
  name: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const navigate = useNavigate();
  const userFromStorage = getUser();
  const userId = userFromStorage?.id;
  const token = getToken();

  useEffect(() => {
    if (userFromStorage) {
      setName(userFromStorage.name || "");
      setPhone(userFromStorage.phone || "");
      setAddress(userFromStorage.address || "");
    }
  }, [userFromStorage]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const {data} = await axios.get('http://localhost:8000/api/vouchers/getUserVouchers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCoupons(data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
        toast.error('Failed to fetch coupons.');
      }
    };

    fetchCoupons();
  }, [token]);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSelectCoupon = async (coupon: Coupon) => {
    try {
      const response = await axios.post('http://localhost:8000/api/vouchers/checkVoucher', {
        voucher_id: coupon.id,
        total_price: totalPrice
      });

      console.log('Voucher check response:', response.data);

      if (response.data.status) {
        setSelectedCoupon(coupon);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi kiểm tra voucher:', error);
    }
    closePopup();
  };

  const fetchCartItems = async (retryCount = 0) => {
    if (userFromStorage) {
      try {
        const response = await axios.get<CartResponse>(
          `http://localhost:8000/api/carts/cart-list/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
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
          if (error.response?.status === 429 && retryCount < 3) {
            // Retry after 1 second if too many attempts
            setTimeout(() => fetchCartItems(retryCount + 1), 1000);
          } else {
            console.error(
              "Lỗi khi lấy các sản phẩm trong giỏ hàng:",
              error.response?.data
            );
            setError(
              error.response?.data.message || "Lỗi khi lấy các sản phẩm trong giỏ hàng"
            );
          }
        } else {
          console.error("Lỗi không xác định:", error);
          setError("Có lỗi không xác định xảy ra");
        }
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [ userId, token]);

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const calculateTotalPrice = (): number => {
    let total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (selectedCoupon) {
      const discountValue = parseFloat(selectedCoupon.discount_value);
      total -= discountValue;
    }
    return total;
  };

  const handleOrderConfirmation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !address || cartItems.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin và kiểm tra giỏ hàng.");
      return;
    }

    const orderData = {
      user_id: userId,
      name: name,
      phone: phone,
      address: address,
      payment_method: paymentMethod,
      total_price: calculateTotalPrice(),
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
      console.log(orderData);
      if (response.data.status) {
        setCartItems([]);
        setTotalPrice(0);
        if (response.data.status) {
          if (response.data.payment_method === "vnpay") {
            window.location.href = response.data.vnpay_url;
            toast.success("Đơn hàng đã được xác nhận thành công!", {
              autoClose: 1000,
            });
          } else {
            navigate("/confirm");
            await clearCart();
          }
        }
        console.log(response.data.payment_method);
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
        `http://localhost:8000/api/carts/delete-cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (clearCartResponse.data.status) {
        toast.success("Giỏ hàng đã được làm trống sau khi đặt hàng.");
      } else {
        toast.error("Không thể xóa giỏ hàng.");
      }
      console.log(clearCartResponse);
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
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
                value={name} // Sử dụng state name
                onChange={(e) => setName(e.target.value)}// Cập nhật state khi người dùng thay đổi
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <strong>Miễn phí</strong>{" "}
              {/* Hiển thị phí vận chuyển */}
            </li>

            {/* Chọn và hiển thị phiếu giảm giá */}
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Gemstone voucher</span>
              <button className="btn btn-outline-primary" onClick={openPopup}>Chọn phiếu giảm giá</button>
            </li>
            {selectedCoupon && (
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Phiếu giảm giá đã chọn: <strong>{selectedCoupon.code}</strong></span>
                <span>Giảm: <strong>{formatCurrency(parseFloat(selectedCoupon.discount_value))}</strong></span>
              </li>
            )}

            {/* Tổng cộng không bao gồm phí vận chuyển */}
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng cộng</span>
              <strong>{formatCurrency(calculateTotalPrice())}</strong>{" "}
              {/* Tổng tiền chỉ bao gồm tổng sản phẩm */}
            </li>
          </ul>
          {showPopup && (
            <CouponPopup 
              coupons={coupons} 
              onSelect={handleSelectCoupon} 
              onClose={closePopup} 
              totalPrice={totalPrice}
            />
          )}
          <h4 className="mb-3">Phương thức thanh toán</h4>
          <form>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment1"
                value="cod"
                onChange={handlePaymentChange}
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
                value="vnpay"
                onChange={handlePaymentChange}
              />
              <label className="form-check-label" htmlFor="payment2">
                Thanh toán qua VNPAY
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
