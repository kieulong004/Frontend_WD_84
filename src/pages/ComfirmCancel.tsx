import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ComfirmCancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Xác nhận";
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center">
        <div className="card-header bg-light">
          <h3 className="text-center">Xác nhận đặt hàng</h3>
        </div>
        <div className="card-body">
          {/* Thông báo xác nhận hủy đơn hàng */}
          <div className="alert alert-danger text-center">
            <h5>Đơn hàng đã bị hủy</h5>
            <p>Đơn hàng của bạn tại Gemstone đã bị hủy</p>
          </div>
        </div>

        {/* Chi tiết sản phẩm */}

        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/products")}
          >
            Tiếp tục mua hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComfirmCancel;
