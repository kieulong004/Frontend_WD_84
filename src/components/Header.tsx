import React, { useState } from 'react';
import Logo from './logo';
import { search, shop, user } from './icons';

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
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
                <a
                  className="nav-link "
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  aria-expanded={isDropdownOpen}
                  style={{ paddingRight: "1rem", cursor: "pointer" }}
                >
                  Danh mục
                </a>
                <ul
                  className={`dropdown-menu border-0 shadow-lg p-2 ${isDropdownOpen ? 'show' : ''}`}
                  aria-labelledby="navbarDropdown"
                  style={{ borderRadius: '0.5rem', minWidth: '200px' }}
                >
                  <li>
                    <a className="dropdown-item" href="/gemstone/diamond">
                      Nhẫn
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/gemstone/ruby">
                      Vòng tay
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/gemstone/sapphire">
                      Vòng cổ
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <a href="/products" className="nav-link">
                  Cửa hàng
                </a>
              </li>
              <li className="nav-item">
                <a href="/about" className="nav-link">
                  Giới thiệu về chúng tôi
                </a>
              </li>
              <li className="nav-item">
                <a href="/stories" className="nav-link">
                  Những câu chuyện
                </a>
              </li>
              <li className="nav-item">
                <a href="/contact" className="nav-link">
                  Liên hệ với chúng tôi
                </a>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <a href="/order-list" className="btn btn-link p-0 mx-2">
              <img
                src={user}
                alt="User"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </a>
            <a href="/search" className="btn btn-link p-0 mx-2">
              <img
                src={search}
                alt="Search"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </a>
            <a href="/products/cart" className="btn btn-link p-0 mx-2">
              <img
                src={shop}
                alt="Cart"
                className="img-fluid"
                style={{ width: "24px" }}
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;