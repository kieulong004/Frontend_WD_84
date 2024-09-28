import React from "react";

const CheckoutPage = () => {
  return (
    <div className="container py-5">
      <div className="row">
        {/* Thông tin người dùng và các thông tin khác */}
        <div className="col-md-7">
          <h2 className="mb-4">Thông tin giao hàng</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Số điện thoại
              </label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="0901234567"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="123 Đường ABC, Quận X, TP.HCM"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Thành phố
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="TP.HCM"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Quốc gia
              </label>
              <input
                type="text"
                className="form-control"
                id="country"
                placeholder="Việt Nam"
                required
              />
            </div>
          </form>
        </div>

        {/* Tổng tiền */}
        <div className="col-md-5">
          <h2 className="mb-4">Tóm tắt đơn hàng</h2>
          <ul className="list-group mb-3">
            <li className="list-group-item d-flex justify-content-between">
              <span>Sản phẩm 1</span>
              <strong>500.000đ</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Sản phẩm 2</span>
              <strong>1.200.000đ</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Sản phẩm 3</span>
              <strong>800.000đ</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Phí vận chuyển</span>
              <strong>30.000đ</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tổng cộng</span>
              <strong>2.530.000đ</strong>
            </li>
          </ul>

          {/* Phương thức thanh toán */}
          <h4 className="mb-3">Phương thức thanh toán</h4>
          <form>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment1"
                value="cod"
                checked
              />
              <label className="form-check-label" htmlFor="payment1">
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="payment2"
                value="creditCard"
              />
              <label className="form-check-label" htmlFor="payment2">
                Thẻ tín dụng/Thẻ ghi nợ
              </label>
            </div>
          </form>

          <button className="btn btn-primary btn-lg w-100 mt-4">
            Xác nhận đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
