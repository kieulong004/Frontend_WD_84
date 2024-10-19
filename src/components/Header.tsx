import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { search, shop, user } from "./icons";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Chuyển đổi token thành boolean để xác định trạng thái đăng nhập

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/categories/list-category"
        );
        const category = data.data;
        setCategories(category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false); // Kết thúc tải dữ liệu
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    let token = localStorage.getItem("token");
    console.log(token);
    try {
      if (token) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          window.location.reload(); // Tải lại trang sau khi đăng xuất
        } else {
          console.error("Logout failed:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  console.log(categories);
  return (
    <header className="header py-3">
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light row-lg">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-brand">
            <Logo />
          </div>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav me-auto">
              <li
                className="nav-item dropdown position-relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  className="nav-link"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded={isDropdownOpen}
                  style={{ paddingRight: "1rem", cursor: "pointer" }}
                >
                  Danh mục
                </Link>
                <ul
                  className={`dropdown-menu border-0 shadow-lg p-2 ${
                    isDropdownOpen ? "show" : ""
                  }`}
                  aria-labelledby="navbarDropdown"
                  style={{ borderRadius: "0.5rem", minWidth: "200px" }}
                >
                  {isLoading ? (
                    <li className="dropdown-item">Đang tải...</li>
                  ) : (
                    categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          className="dropdown-item"
                          to={`/category/${category.id}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Cửa hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  Giới thiệu về chúng tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stories" className="nav-link">
                  Những câu chuyện
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Liên hệ với chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="nav-item dropdown">
                <Link
                  to="#"
                  className="btn btn-link p-0 mx-2 dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={user}
                    alt="User"
                    className="img-fluid"
                    style={{ width: "24px" }}
                  />
                </Link>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item" to="/account">
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/order-list">
                      Đơn hàng
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-link p-0 mx-2 text-decoration-none"
                  style={{ color: "#6c757d" }}
                >
                  Đăng nhập
                </Link>

                <Link
                  to="/register"
                  className="btn btn-link p-0 mx-2 text-decoration-none"
                  style={{ color: "#6c757d" }}
                >
                  Đăng ký
                </Link>
              </>
            )}
            <Link to="/search" className="btn btn-link p-0 mx-2">
              <img
                src={search}
                alt="Search"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </Link>
            <Link to="/products/cart" className="btn btn-link p-0 mx-2">
              <img
                src={shop}
                alt="Cart"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;