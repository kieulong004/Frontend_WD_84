/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { getToken } from './utils';

export interface Discount {
  id: number;
  name: string;
  discount_value: number | null;
  discount_min_price: number | null;
  end_date: string;
  total_uses: number; // Thêm thuộc tính total_uses
  code?: string;
}

interface DiscountCardProps {
  discount: Discount;
  onSave: (discount: Discount) => Promise<void>;
}

const DiscountCard: React.FC<DiscountCardProps> = ({ discount, onSave }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
  const [isOutOfUses, setIsOutOfUses] = useState(false); // Thêm trạng thái hết lượt sử dụng
  const token = getToken();
  console.log(token);

  const formatCurrency = (value: number | string | null): string => {
    if (value === null) return 'N/A';
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) return 'N/A';
    
    return numericValue.toLocaleString('vi-VN', { minimumFractionDigits: 0 });
  };
  
  

  // Check if the voucher is already saved when the component mounts
  useEffect(() => {
    const checkIfSaved = async () => {
      if (discount.total_uses === 0) {
        setIsOutOfUses(true);
        setIsLoading(false);
        return;
      }

      try {
        const {data} = await axios.get('http://127.0.0.1:8000/api/vouchers/getUserVouchers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const voucherIds = data.map((voucher: any) => voucher.id); // Extract ids from objects
        setIsSaved(voucherIds.includes(discount.id)); // Compare discount.id with the array of IDs
      } catch (error) {
        console.error("Error checking if voucher is saved:", error);
      } finally {
        setIsLoading(false); // Kết thúc trạng thái loading
      }
    };

    checkIfSaved();
  }, [token, discount.id, discount.total_uses]);

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
          <strong>Đơn hàng tối thiểu:</strong> {formatCurrency((discount.discount_min_price) || 0)} VNĐ
        </p>
        <p className="card-text">
          <strong>Hết hạn:</strong> {new Date(discount.end_date).toLocaleDateString()}
        </p>

        {isLoading ? (
          <p>Đang tải...</p> // Hiển thị trạng thái tải
        ) : isOutOfUses ? (
          <p className="text-secondary mt-3 "><strong>Hết lượt sử dụng</strong></p> // Hiển thị thông báo hết lượt sử dụng với màu xám
        ) : isSaved ? (
          <button className="btn btn-outline-primary mt-auto mx-auto" onClick={handleRedirect}>
            Mua hàng ngay
          </button>
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
