import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./logo";
import { search, shop, user } from "./icons";
import axios from "axios";
import { getToken } from "./utils";
import { toast } from "react-toastify";

interface Category {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Trạng thái tải dữ liệu
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCartClick = () => {
    if (!isLoggedIn) {
      toast.error("Bạn phải đăng nhập.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      navigate("/products/cart");
    }
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token); // Chuyển đổi token thành boolean để xác định trạng thái đăng nhập

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = data.data;
        setUserName(userData.name);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Có lỗi xảy ra khi lấy thông tin người dùng.");
      }
    };

    if (token) {
      fetchUserData();
    }

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
    const token = getToken();
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
          localStorage.removeItem("user");
          setIsLoggedIn(false);
          setUserName(null);
          window.location.reload(); // Tải lại trang sau khi đăng xuất
        } else {
          console.error("Logout failed:", response.data.message);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Xử lý lỗi 401 (Unauthorized)
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUserName(null);
        window.location.reload(); // Tải lại trang sau khi đăng xuất
      } else {
        console.error("Error logging out:", error);
      }
    }
  };

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      navigate("/order-list/profile");
    } else {
      navigate("/login");
    }
  };

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
                  className="nav-link text-decoration-none"
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
                          className="dropdown-item text-decoration-none"
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
                <Link to="/products" className="nav-link text-decoration-none">
                  Cửa hàng
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link text-decoration-none">
                  Giới thiệu về chúng tôi
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/stories" className="nav-link text-decoration-none">
                  Những câu chuyện
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link text-decoration-none">
                  Liên hệ với chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <div className="nav-item dropdown d-flex align-items-center">
                <Link
                  to="#"
                  className="btn btn-link p-0 mx-2 dropdown-toggle text-decoration-none d-flex align-items-center"
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
                  <span className="ms-2 fw-bold text-dark">{userName}</span>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <Link className="dropdown-item text-decoration-none" to="/order-list/profile">
                      Tài khoản của tôi
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-decoration-none" to="/order-list">
                      Đơn hàng
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item text-decoration-none" onClick={handleLogout}>
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="btn btn-link p-0 mx-2 text-decoration-none d-flex align-items-center"
                style={{ color: "#6c757d" }}
                onClick={handleUserIconClick}
              >
                <img
                  src={user}
                  alt="User"
                  className="img-fluid"
                  style={{ width: "24px" }}
                />
              </button>
            )}
            <Link to="/search" className="btn btn-link p-0 mx-2 text-decoration-none">
              <img
                src={search}
                alt="Search"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </Link>
            <button onClick={handleCartClick} className="btn btn-link p-0 mx-2 text-decoration-none">
              <img
                src={shop}
                alt="Cart"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;