import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Confirm = () => {
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
          {/* Thông báo xác nhận đơn hàng */}
          <div className="alert alert-success text-center">
            <h5>Đặt hàng thành công</h5>
            <p>Đơn hàng của bạn tại Gemstone check đã hoàn thành.</p>

            <p>
              Đơn hàng của bạn sẽ được giao sớm. Đối với bất kỳ câu hỏi hay cho
              biết thêm chi tiết, xin vui lòng liên hệ với chúng tôi.
            </p>
          </div>
        </div>

        {/* Chi tiết sản phẩm */}

        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/order-list")}
          >
            Xem lịch sử đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
