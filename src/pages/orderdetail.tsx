
const OrderDetail = () => {
    return (
        <div className="container mt-4 mb-5">
            <hr />
            <h3 className="text-center">Tài khoản của bạn</h3>
            <h4>Chi tiết đơn hàng</h4>

            <div className="mb-3">
                <p><strong>Mã đơn hàng:</strong> A01 - đặt vào 24/09/2024</p>
                <p><strong>Thanh toán:</strong> Thanh toán khi nhận hàng (COD)</p>
                <p><strong>Trạng thái:</strong> Chờ xác nhận thanh toán COD (COD)</p>
            </div>



            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Địa chỉ giao hàng</h5>
                    <p>Nguyễn Hùng</p>
                    <p>Mỹ Đình, Nam Từ Liêm, Hà Nội</p>
                    <p>0387732069</p>
                </div>

                <div className="col-md-6">
                    <h5>Địa chỉ gửi hóa đơn</h5>
                    <p>Nguyễn Hùng</p>
                    <p>Mỹ Đình, Nam Từ Liêm, Hà Nội</p>
                    <p>0387732069</p>
                </div>
            </div>

            <table className="table table-bordered mt-4">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ảnh sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Tổng giá</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Nhẫn Moissanite nam 8.0mm</td>
                        <td><img src="https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwE2KNlpuYB7ev1jWX5ibbMw1xWX-ETke8rpXHoZnBzJ9oIAD3EXt-3RwNnsuNlBI5stw9VihW7sZ2xCgp64LxV7831Pz2vKnJEhrsZcDpgkf2C-jI0xNg2q8gDP9KfeFY3fM6tdLdtFY&usqp=CAc" alt="" width={50} /></td>
                        <td>1</td>
                        <td>1.059.000 đ</td>
                        <td>1.059.000 đ</td>
                    </tr>
                    <tr>
                        <td>Nhẫn bạc nữ đơn giản NN0412 (Size nữ: 6)</td>
                        <td><img src="https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTvNEy4-14JM7tkPmpqgh4kkI1qaAB_k7N296AxChb3TJm4iLM55_xPe0xACk9tzLUf9YCQWt4if35QpXr441LQob-YIXNli1u8Icywp4t85hfpDtHv_wdyEsYn3apJ75rPYQFTJg&usqp=CAc" alt="" width={50} /></td>
                        <td>1</td>
                        <td>179.000 đ</td>
                        <td>179.000 đ</td>
                    </tr>
                    <tr>
                        <td>Nhẫn bạc nữ mặt thỏ NN0386 (Size nữ: 6)</td>
                        <td><img src="https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQzgnA0AyLdlmwJ2BJ7G8bijAcIzABk3nWwr99IXzTGedEZ1ymmhXQzp0F8oVUkZ8AbuM6xhnYHqKAP1ahZIt6MGCr0B-LYdo1jFUiHALZYZv7Va2TEZNvlPuI754E6MKRDmXHipaQ&usqp=CAc" alt="" width={50} /></td>
                        <td>1</td>
                        <td>249.000 đ</td>
                        <td>249.000 đ</td>
                    </tr>
                </tbody>
            </table>

            <div className="mt-4">
                <div className="d-flex justify-content-between">
                    <span> Tổng giá:</span>
                    <span className="fw-bold">1.487.000 đ</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Giao hàng và xử lý:</span>
                    <span className="fw-bold">30.000 đ</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                    <span className="fw-bold">Tổng cộng:</span>
                    <span className="fw-bold text-danger">1.517.000 đ</span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail