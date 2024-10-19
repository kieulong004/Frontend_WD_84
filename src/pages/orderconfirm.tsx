const OrderConfirm = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header bg-light">
          <h3 className="text-center">Xác nhận đặt hàng</h3>
        </div>
        <div className="card-body">
          {/* Order Confirmation Message */}
          <div className="alert alert-success text-center">
            <h5>Đặt hàng thành công</h5>
            <p>
              Chúng tôi đã gửi email đến địa chỉ email của bạn:
              <strong> nguyenxuanhung@gmail.com</strong>. Đơn hàng của bạn tại
              Gemstone check đã hoàn thành.
            </p>
            <p>Bạn đã chọn phương pháp thu tiền khi nhận hàng</p>
            <p>
              Đơn hàng của bạn sẽ được giao sớm. Đối với bất kỳ câu hỏi hay cho
              biết thêm chi tiết, xin vui lòng liên hệ với chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirm;
