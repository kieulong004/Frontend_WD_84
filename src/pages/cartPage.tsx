const CartPage = () => {
  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center ">Giỏ hàng của bạn</h2>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="table-responsive">
            <table className="table table-borderless text-center">
              <thead className="border-bottom">
                <tr>
                  <th scope="col">Sản phẩm</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Tổng</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-bottom mb-4">
                  <td style={{ maxWidth: "150px" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Sản phẩm 1"
                        className="img-fluid w-50 h-50 me-3"
                      />
                      <div className="text-left px-4">
                        <p className="mb-1 font-weight-bold">Sản phẩm 1</p>
                        <p className="mb-1 text-muted">2.500.000đ</p>
                        <p className="mb-0 text-muted">Đá quý A</p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle" style={{ height: "100px" }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div
                        className="input-group"
                        style={{ maxWidth: "120px" }}
                      >
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value="1"
                          min="1"
                          style={{
                            width: "50px",
                            border: "none",
                            borderTop: "1px solid #000",
                            borderBottom: "1px solid #000",
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">2.500.000đ</td>
                  <td className="align-middle">
                    <button className="btn btn-danger btn-sm">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr className="border-bottom mb-4">
                  <td style={{ maxWidth: "120px" }}>
                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Sản phẩm 1"
                        className="img-fluid w-50 h-50 me-3"
                      />
                      <div className="text-left px-4">
                        <p className="mb-1 font-weight-bold">Sản phẩm 1</p>
                        <p className="mb-1 text-muted">2.500.000đ</p>
                        <p className="mb-0 text-muted">Đá quý A</p>
                      </div>
                    </div>
                  </td>
                  <td className="align-middle" style={{ height: "100px" }}>
                    <div className="d-flex justify-content-center align-items-center h-100">
                      <div
                        className="input-group"
                        style={{ maxWidth: "120px" }}
                      >
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                        >
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          className="form-control text-center"
                          value="1"
                          min="1"
                          style={{
                            width: "50px",
                            border: "none",
                            borderTop: "1px solid #000",
                            borderBottom: "1px solid #000",
                          }}
                        />
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          type="button"
                        >
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="text-center align-middle">2.500.000đ</td>
                  <td className="align-middle">
                    <button className="btn btn-danger btn-sm">
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 ">
            <h4>Tổng tiền:</h4>
            <h4>7.900.000đ</h4>
          </div>
          <div className="mt-4">
            <button className="btn btn-dark w-100">Tiến hành thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
