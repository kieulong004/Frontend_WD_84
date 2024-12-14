import { Link } from "react-router-dom";

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
                Theo dõi thông tin và các ưu đãi mới nhất qua trang Facebook của chúng tôi.
              </p>
              <Link
                to="https://www.facebook.com/gemstonetrangsuc"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-facebook"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  borderRadius: "50px", // Làm nút tròn hơn
                  padding: "12px 25px", // Tăng kích thước padding để nút lớn hơn
                  fontWeight: "bold",
                  backgroundColor: "#4267B2", // Màu nền giống Facebook
                  color: "white", // Màu chữ trắng
                  fontSize: "16px", // Tăng kích thước chữ
                  transition: "all 0.3s ease-in-out", // Hiệu ứng chuyển động mượt mà
                }}
              >
                <i
                  className="bi bi-facebook"
                  style={{ marginRight: "12px", fontSize: "20px" }} // Thêm khoảng cách giữa icon và text
                ></i>
                Truy cập trang Facebook
              </Link>
            </div>
          </div>
        </div>
        <p className="text-center text-muted pb-2 mt-4 copyright">
          2024 @Gemstone
        </p>
      </div>
    </footer>
  );
};

export default Footer;
