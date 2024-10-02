
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
                            <strong> nguyenxuanhung@gmail.com</strong>. Đơn hàng của bạn tại Gemstone
                            check đã hoàn thành.
                        </p>
                        <p>Bạn đã chọn phương pháp thu tiền khi nhận hàng</p>
                        <p>
                            Đơn hàng của bạn sẽ được giao sớm. Đối với bất kỳ câu hỏi hay cho
                            biết thêm chi tiết, xin vui lòng liên hệ với chúng tôi.
                        </p>
                    </div>

                    {/* Order Details */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Đơn hàng sản phẩm</h5>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQzgnA0AyLdlmwJ2BJ7G8bijAcIzABk3nWwr99IXzTGedEZ1ymmhXQzp0F8oVUkZ8AbuM6xhnYHqKAP1ahZIt6MGCr0B-LYdo1jFUiHALZYZv7Va2TEZNvlPuI754E6MKRDmXHipaQ&usqp=CAchttps://example.com/ring-image.jpg"
                                            alt="Nhẫn nữ Moissanite"
                                            className="img-thumbnail mr-3"
                                            style={{ width: "100px" }}
                                        />
                                        <div>
                                            <p>Nhẫn nữ Moissanite đơn giản đá 6.5mm </p>
                                            <p>Size nữ: 6</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>Đơn giá: 499,000 đ</p>
                                    <p>Số lượng: 1</p>
                                    <p>Tổng cộng: 499,000 đ</p>
                                    <hr />
                                    <p>Giao hàng và xử lý: 30,000 đ</p>
                                    <h5 className="text-danger">Tổng cộng: 529,000 đ</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Chi Tiết Đơn Hàng</h5>
                                    <p>Mã đơn hàng: A01</p>
                                    <p>Phương thức thanh toán: Thanh toán khi nhận hàng (COD)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm