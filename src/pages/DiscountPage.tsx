/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/DiscountPage.css";
import axios from 'axios';
import { getToken, getUser } from "@/components/utils";
import DiscountCard from '@/components/DiscountCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Discount {
  id: number;
  name: string;
  discount_value: number | null;          // Giá trị giảm giá
  discount_min_price: number | null;      // Giá trị tối thiểu của đơn hàng để áp dụng voucher
  end_date: string;    
  total_uses: number;                        // Thêm thuộc tính total_uses                   
  code?: string;                          // Nếu cần thêm thuộc tính code
}

const DiscountPage: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userFromStorage = getUser();
  const token = getToken();
  const userId = userFromStorage?.id;

  useEffect(() => {
    document.title = "Mã giảm giá";
  }, []);
  useEffect(() => {
    const fetchVouchers = async () => {
        try {
          const { data } = await axios.get('http://127.0.0.1:8000/api/vouchers/getVoucherList');
          setDiscounts(data.data);
        } catch (error) {
          console.error('Lỗi khi lấy voucher:', error);
        } finally {
          setIsLoading(false);
        }
    };
    fetchVouchers();
  }, [token]);

  const handleSave = async (discount: Discount) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/vouchers/storeUserVoucher', {
        user_id: userId,
        voucher_id: discount.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Voucher saved:', response.data);
    } catch (error: any) {
      console.error('Lỗi khi lưu voucher:', error.response ? error.response.data : error.message);
      toast.error('Bạn đã lưu voucher này rồi', error.response ? error.response.data : error.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center mb-4">Gemstone Voucher</h1>
      {isLoading ? (
        <div className="text-center">Đang tải...</div>
      ) : (
        <div className="row justify-content-center">
          {discounts.length > 0 ? (
            discounts.map(discount => (
              <div className="col-md-6 mb-4" key={discount.id}>
                <DiscountCard discount={discount} onSave={handleSave} />
              </div>
            ))
          ) : (
            <div className="alert alert-info text-center" role="alert">
              <h4 className="alert-heading">Không có Gemstone voucher nào để hiển thị</h4>
              <p>Hiện tại không có voucher nào khả dụng. Vui lòng quay lại sau để kiểm tra các ưu đãi mới nhất.</p>
              <p className="mb-0">Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiscountPage;