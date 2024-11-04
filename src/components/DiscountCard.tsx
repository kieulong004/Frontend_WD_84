import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export interface Discount {
  id: number;
  name: string;
  discount_value: number | null;
  discount_min_price: number | null;
  end_date: string;
  code?: string;
}

interface DiscountCardProps {
  discount: Discount;
  onSave: (discount: Discount) => Promise<void>;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);

  const currentDate = new Date();
  const expirationDate = new Date(discount.end_date);

  const formatCurrency = (value: number | null) => {
    if (value === null) return 'N/A';
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const isExpired = expirationDate < currentDate;

  // Check if the voucher is already saved when the component mounts
  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await axios.post('/api/storeUserVoucher', {
          voucher_id: discount.id,
          checkOnly: true, // Pass the check-only flag to only verify status
        });
        setIsSaved(response.data.isSaved);
      } catch (error) {
        console.error("Error checking if voucher is saved:", error);
      }
    };

    checkIfSaved();
  }, [discount.id]);

  // Save the voucher and update the button if successful
  const handleSave = async () => {
    try {
      await onSave(discount);
      setIsSaved(true); // Update state to show "Mua hàng ngay"
    } catch (error) {
      console.error("Lỗi khi lưu voucher:", error);
    }
  };

  const handleRedirect = () => {
    window.location.href = '/products'; // Redirect to the products page
  };

  return (
    <div className="card h-100 text-center">
      <div className="card-body d-flex flex-column">
        <p className="card-text">
          <strong>{discount.name} - Giảm:</strong> {formatCurrency(discount.discount_value)} VNĐ
        </p>
        <p className="card-text">
          <strong>Đơn hàng tối thiểu:</strong> {formatCurrency(discount.discount_min_price)} VNĐ
        </p>
        <p className="card-text">
          <strong>Hết hạn:</strong> {new Date(discount.end_date).toLocaleDateString()}
        </p>

        {isSaved ? (
          <button className="btn btn-success mt-auto mx-auto" onClick={handleRedirect}>
            Mua hàng ngay
          </button>
        ) : isExpired ? (
          <p className="text-danger mt-3"><strong>Voucher đã hết hạn</strong></p>
        ) : (
          <button 
            className="btn btn-primary mt-auto mx-auto" 
            onClick={handleSave}
          >
            Lưu
          </button>
        )}
      </div>
    </div>
  );
};

export default DiscountCard;
