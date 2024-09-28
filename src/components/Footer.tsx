const Footer = () => {
  return (
    <footer className="bg-light">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="footer-title mb-4">Chăm sóc khách hàng</h4>
            <ul className="list-unstyled footer-menu-list ">
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Liên hệ với chúng tôi
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Chính sách hoàn tiền
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Chính sách vận chuyển
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6  mb-4">
            <h4 className="footer-title mb-4">Giới thiệu về Gemstone</h4>
            <ul className="list-unstyled footer-menu-list">
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Chất lượng & giá trị
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Đánh giá
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Loại đá
                </a>
              </li>
              <li className="footer-menu-item pb-2">
                <a href="#" className="footer-menu-link text-muted pb-2">
                  Tạp chí Gemstone
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-12 mb-4">
            <div className="footer-item">
              <h4 className="footer-title mb-4">Bản tin</h4>
              <p className="text-muted pb-2">
                Đăng ký để nhận bản tin của chúng tôi và nhận các ưu đãi độc quyền.
              </p>
              <form action="" className="newsletter">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email Address"
                  />
                  <button className="btn btn-primary" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <p className="text-center text-muted pb-2 mt-4 copyright">
          2023 Furino. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
