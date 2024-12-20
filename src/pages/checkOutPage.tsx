import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
  total_uses: number
  name: string;
}

const CheckoutPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cod");
  const [shippingFee, setShippingFee] = useState<number>(0);
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>([]);
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>([]);
  const [wards, setWards] = useState<{ id: string; name: string }[]>([]);
  const [provinceId, setProvinceId] = useState<string>("");
  const [districtId, setDistrictId] = useState<string>("");
  const [wardId, setWardId] = useState<string>("");
  const navigate = useNavigate();
  const userFromStorage = getUser();
  const userId = userFromStorage?.id;
  const token = getToken();

  useEffect(() => {
    document.title = "Thanh toán";
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (userFromStorage) {
        setName(userFromStorage.name || "");
        setPhone(userFromStorage.phone || "");
        setAddress(userFromStorage.address || "");
        setProvinceId(userFromStorage.province_id || "");

        // Gọi fetchDistricts và fetchWards sau khi nhận được dữ liệu người dùng
        if (userFromStorage.province_id) {
          await fetchDistricts(userFromStorage.province_id);
          setDistrictId(userFromStorage.district_id || "");
          if (userFromStorage.district_id) {
            await fetchWards(userFromStorage.district_id);
            setWardId(userFromStorage.ward_id || "");
          }
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/vouchers/getUserVouchers', {
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
      try {
        const response = await axios.get<CartResponse>(
          `http://localhost:8000/api/carts/cart-list/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        );
  
        if (response.data.status) {
          const validCartItems = response.data.cart_items.filter(
            (item) => item.product !== null
          );
          setCartItems(validCartItems);
          const total = validCartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );
          setTotalPrice(total);
        } else {
          toast.error(response.data.message || "Không có sản phẩm trong giỏ hàng");
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
            toast.error(
              error.response?.data.message || "Lỗi khi lấy các sản phẩm trong giỏ hàng"
            );
          }
        } else {
          console.error("Lỗi không xác định:", error);
        }
      }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, token]);

  const formatCurrency = (value: number | string | null): string => {
    if (value === null) return 'N/A';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return 'N/A';

    return numericValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const calculateTotalPrice = (): number => {
    let total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (selectedCoupon) {
      const discountValue = parseFloat(selectedCoupon.discount_value);
      total -= discountValue;
    }
    total += shippingFee; // Thêm phí vận chuyển vào tổng giá
    return Math.max(total, 0);
  };

  const handleOrderConfirmation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !phone || !provinceId || !districtId || !wardId || !address || cartItems.length === 0) {
      toast.error("Vui lòng điền đầy đủ thông tin và kiểm tra giỏ hàng.");
      return;
    }

    const orderData = {
      user_id: userId,
      name: name,
      phone: phone,
      address: address,
      province_id: provinceId,
      district_id: districtId,
      ward_id: wardId,
      payment_method: paymentMethod,
      total_price: calculateTotalPrice(),
      shipping_fee: shippingFee,
      products: cartItems.map((item) => ({
        product_id: item.product.id,
        variant_id: item.variant?.id || null,
        price: item.price,
        quantity: item.quantity,
      })),
      voucher_id: selectedCoupon ? selectedCoupon.id : null, // Thêm coupon_id vào orderData nếu có mã giảm giá được chọn
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
        toast.dismiss(); // Đóng tất cả toast hiện tại
        setTimeout(() => {
          // Thông báo Sản phẩm đã hết hàng
          toast.error(`${response.data.message}`, {
            autoClose: 2000, // Thời gian tự động đóng sau 5 giây
          });
        }, 300); // Đợi 300ms để toast cũ được đóng trước khi tạo toast mới
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Lỗi khi gửi đơn hàng:",
          error.response?.data || error.message
        );
        toast.dismiss();
        setTimeout(() => {
          //  Thông báo Voucher đã hết lượt sử dụng
          toast.error(`${error.response?.data?.message || error.message}`, {
            autoClose: 2000, // Thời gian tự động đóng sau 5 giây
          });
        }, 300);
      } else {
        console.error("Lỗi không xác định:", error);
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
        console.log("Giỏ hàng đã được làm trống sau khi đặt hàng.");
      } else {
        console.error("Không thể xóa giỏ hàng.");
      }
      console.log(clearCartResponse);
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };
  const calculateShippingFee = async (provinceId: string, districtId: string, wardId: string) => {
    try {
      const response = await axios.post('http://localhost:8000/api/shipping-fee', {
        province_id: provinceId,
        district_id: districtId,
        ward_id: wardId,
      });

      if (response.data.success) {
        return response.data.fee;
      } else {
        toast.error(response.data.message || 'Không thể tính phí ship');
        return 0;
      }
    } catch (error) {
      console.error('Lỗi khi tính phí ship:', error);
      toast.error('Lỗi khi tính phí ship');
      return 0;
    }
  };

  useEffect(() => {
    const fetchShippingFee = async () => {
      if (provinceId && districtId && wardId) {
        const fee = await calculateShippingFee(provinceId, districtId, wardId);
        setShippingFee(fee);
      }
    };

    fetchShippingFee();
  }, [provinceId, districtId, wardId]);


  // Lấy danh sách tỉnh
  const fetchProvinces = async () => {
    const response = await axios.get("http://localhost:8000/api/provinces");
    setProvinces(response.data.provinces);
  };

  const fetchDistricts = async (provinceId: string) => {
    const response = await axios.post(`http://localhost:8000/api/districts`, {
      province_id: provinceId,
    });
    setDistricts(response.data.districts);
    setWards([]); // Reset wards khi thay đổi tỉnh
  };

  const fetchWards = async (districtId: string) => {
    const response = await axios.post(`http://localhost:8000/api/wards`, {
      district_id: districtId,
    });
    setWards(response.data.wards);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWards(districtId);
    }
  }, [districtId]);
  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row">
        <div className="col-md-7">
          <h2 className="mb-4">Thông tin giao hàng</h2>
          <form onSubmit={handleOrderConfirmation}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Họ và tên</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Số điện thoại</label>
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
              <label htmlFor="province" className="form-label">Tỉnh</label>
              <select
                className="form-control"
                id="province"
                value={provinceId}
                onChange={(e) => {
                  setProvinceId(e.target.value);
                  fetchDistricts(e.target.value); // Gọi hàm fetchDistricts với id của tỉnh
                }}
                required
              >
                <option value="">Chọn Tỉnh</option>
                {provinces.map((prov: { id: string; name: string }) => {
                  return (
                    <option key={prov.id} value={prov.id}>{prov.name}</option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="district" className="form-label">Quận</label>
              <select
                className="form-control"
                id="district"
                value={districtId}
                onChange={(e) => {
                  setDistrictId(e.target.value);
                  fetchWards(e.target.value); // Gọi hàm fetchWards với id của quận
                }}
                required
              >
                <option value="">Chọn Quận</option>
                {districts.map((dist: { id: string; name: string }) => {
                  return (
                    <option key={dist.id} value={dist.id}>{dist.name}</option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="ward" className="form-label">Phường/Xã</label>
              <select
                className="form-control"
                id="ward"
                value={wardId}
                onChange={(e) => {
                  setWardId(e.target.value);
                }}
                required
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((ward: { id: string; name: string }) => {
                  return (
                    <option key={ward.id} value={ward.id}>{ward.name}</option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Địa chỉ cụ thể</label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <strong>{formatCurrency(shippingFee)}</strong>
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