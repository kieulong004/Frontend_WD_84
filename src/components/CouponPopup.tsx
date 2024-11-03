import React from 'react';

interface Coupon {
  id: number;
  code: string;
  discount_min_price: string;
  discount_type: string;
  discount_value: string;
  end_date: string;
  name: string;
}

interface CouponPopupProps {
  coupons: Coupon[];
  onSelect: (coupon: Coupon) => void;
  onClose: () => void;
  totalPrice: number; // Thêm totalPrice vào props
}

const CouponPopup: React.FC<CouponPopupProps> = ({ coupons, onSelect, onClose, totalPrice }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase()); // Chuyển đổi searchTerm thành chữ thường
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.name.toLowerCase().includes(searchTerm) // Chuyển đổi coupon.name thành chữ thường
  );

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Chọn phiếu giảm giá</h3>
        <input
          type="text"
          placeholder="Tìm kiếm mã giảm giá"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <ul>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => {
              const isDisabled = parseFloat(coupon.discount_min_price) > totalPrice;
              return (
                <li key={coupon.id}>
                  <button
                    className={`coupon-button btn btn-outline-primary ${isDisabled ? 'btn-disabled' : ''}`}
                    onClick={() => onSelect(coupon)}
                  >
                    {coupon.name} - Giảm: {coupon.discount_value}
                  </button>
                  {isDisabled && <div className="error-message">Đơn hàng không đủ điều kiện</div>}
                </li>
              );
            })
          ) : (
            <li>Không tìm thấy mã giảm giá nào</li>
          )}
        </ul>
        <button className="btn btn-secondary" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default CouponPopup;
