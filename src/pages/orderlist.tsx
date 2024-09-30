import { Link } from "react-router-dom"

const OrderList = () => {
    return (
        <div className="container mt-5 mb-5">
            <hr />
            <h3 className="text-center">Tài khoản của bạn</h3>
            <div className="row mt-5">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className="list-group">
                        <button className="list-group-item list-group-item-action ">
                            Thông tin
                        </button>
                        <button className="list-group-item list-group-item-action active">
                            Lịch sử và chi tiết đơn hàng
                        </button>
                        <button className="list-group-item list-group-item-action">
                            Đăng xuất
                        </button>
                    </div>
                </div>

                {/* Order History Table */}
                <div className="col-md-9">
                    <h4>Lịch sử đơn hàng</h4>
                    <p>Đây là các đơn đặt hàng bạn có kể từ khi tạo tài khoản này</p>
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Mã đặt hàng</th>
                                <th scope="col">Ngày</th>
                                <th scope="col">Tổng giá</th>
                                <th scope="col">Thanh toán</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Row 1 */}
                            <tr>
                                <td>A01</td>
                                <td>24/09/2024</td>
                                <td>1.517.000 đ</td>
                                <td>Thanh toán khi nhận hàng (COD)</td>
                                <td>Chờ xác nhận thanh toán COD</td>
                                <td>3</td>
                                <td className="text-center align-middle">
                                    <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                                        <Link to="/order-detail">
                                            <button className="btn btn-outline-info btn-sm px-3 d-flex justify-content-center align-items-center">
                                                <i className="bi bi-exclamation-circle-fill"></i>
                                            </button>
                                        </Link>
                                        <button className="btn btn-outline-danger btn-sm px-3 d-flex justify-content-center align-items-center">
                                            <i className="bi bi-cart-plus-fill"></i>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                            {/* Row 2 */}
                            <tr>
                                <td>A02</td>
                                <td>23/09/2024</td>
                                <td>1.517.000 đ</td>
                                <td>Thanh toán khi nhận hàng (COD)</td>
                                <td>Chờ xác nhận thanh toán COD</td>
                                <td>1</td>
                                <td className="text-center align-middle">
                                    <div className="d-flex flex-column justify-content-center align-items-center h-100 gap-2">
                                        <Link to="/order-detail">
                                            <button className="btn btn-outline-info btn-sm px-3 d-flex justify-content-center align-items-center">
                                                <i className="bi bi-exclamation-circle-fill"></i>
                                            </button>
                                        </Link >
                                        <button className="btn btn-outline-danger btn-sm px-3 d-flex justify-content-center align-items-center">
                                            <i className="bi bi-cart-plus-fill"></i>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default OrderList