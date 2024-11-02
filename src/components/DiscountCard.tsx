import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Discount {
  id: number;
  name: string;
  discount_value: number | null;          // Giá trị giảm giá
  discount_min_price: number | null;      // Giá trị tối thiểu của đơn hàng để áp dụng voucher
  end_date: string;                       // Ngày hết hạn
  code?: string;                          // Nếu cần thêm thuộc tính code
}


interface DiscountCardProps {
  discount: Discount;
  onSave: (discount: Discount) => Promise<void>; // Đổi về Promise<void> nếu hàm onSave là async
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount, onSave }) => {
  const formatCurrency = (value: number | null) => {
    // Chuyển đổi chuỗi thành số nếu cần thiết
    if (value === null) return 'N/A';
    
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    return numericValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
  
  return (
    <div className="card h-100 text-center">
      <div className="card-body d-flex flex-column">
        <p className="card-text">
          <strong>{discount.name} - Giảm:</strong> {formatCurrency(discount.discount_value ? discount.discount_value : 0).toLocaleString()} VNĐ
        </p>
        <p className="card-text">
          <strong>Đơn hàng tối thiểu:</strong> {formatCurrency(discount.discount_min_price ? discount.discount_min_price : 0).toLocaleString() } VNĐ
        </p>
        <p className="card-text">
          <strong>Hết hạn:</strong> {new Date(discount.end_date).toLocaleDateString()}
        </p>
        <button 
          className="btn btn-primary mt-auto mx-auto" 
          onClick={() => onSave(discount)} 
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default DiscountCard;
