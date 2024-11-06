import React from 'react';

interface Coupon {
  id: number;
  code: string;
  discount_min_price: string;
  discount_type: string;
  discount_value: string;
  end_date: string;
  name: string;
  total_uses: number; // Thêm thuộc tính total_uses
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
  const formatCurrency = (value: number | string | null): string => {
    if (value === null) return 'N/A';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return 'N/A';
    
    return numericValue.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };
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
              const isDisabled = (coupon.discount_type !== 'all' && parseFloat(coupon.discount_min_price) > totalPrice ) || coupon.total_uses <= 0;
              return (
                <li key={coupon.id}>
                  <button
                    className={`coupon-button btn btn-outline-primary ${isDisabled ? 'btn-disabled' : ''}`}
                    onClick={() => onSelect(coupon)}
                    disabled={isDisabled} // Vô hiệu hóa nút nếu không đủ điều kiện
                  >
                    {coupon.name} - Giảm: {formatCurrency(coupon.discount_value) +' VND'}
                  </button>
                  {parseFloat(coupon.discount_min_price) > totalPrice && coupon.discount_type !== 'all' && (
                    <div className="error-message">Đơn hàng không đủ điều kiện</div>
                  )}
                  {coupon.total_uses <= 0 && (
                    <div className="error-message">Voucher đã hết lượt sử dụng</div>
                  )}
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
