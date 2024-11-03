import React, { useState } from 'react';

// Định nghĩa kiểu cho Coupon
interface Coupon {
  id: number;
  code: string;
  discount_min_price: string;
  discount_type: string;
  discount_value: string;
  end_date: string;
  name: string;
}

// Định nghĩa kiểu cho các props của component
interface CouponPopupProps {
  coupons: Coupon[];
  onSelect: (coupon: Coupon) => void;
  onClose: () => void;
}

const CouponPopup: React.FC<CouponPopupProps> = ({ coupons, onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State cho từ khóa tìm kiếm

  // Hàm cập nhật từ khóa tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Lọc danh sách mã giảm giá theo từ khóa
  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Chọn Gemstone voucher</h2>
        
        {/* Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm mã giảm giá..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        
        <ul>
          {filteredCoupons.length > 0 ? (
            filteredCoupons.map((coupon) => (
              <li key={coupon.id} onClick={() => onSelect(coupon)}>
                <strong>{coupon.code}</strong> - <small>{coupon.name}</small>
                <br />
                <small>Giảm: {coupon.discount_value}</small>
                <br />
                <small>Đơn hàng tối thiểu: {coupon.discount_min_price}</small>
                <br />
                <small>Hết hạn: {coupon.end_date}</small>
              </li>
            ))
          ) : (
            <li>Không tìm thấy mã giảm giá nào</li>
          )}
        </ul>
        
        <button onClick={onClose}>Trở lại</button>
      </div>
    </div>
  );
};

export default CouponPopup;
