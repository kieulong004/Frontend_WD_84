import { useState } from "react";
import {  search, shop, user } from "./icons";
import Logo from "./logo";

const Header = () => {

  return (
    <header className="header py-3">
      <div className="container ">
        <nav className="navbar navbar-expand-lg navbar-light">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            aria-label="Toggle navigation"
          >
              <span className="navbar-toggler-icon"></span> 
          </button>
          <div className="navbar-brand mx-auto">
            <Logo />
          </div>

          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav flex-row me-auto">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  Cửa hàng
                </a>
              </li>
              <li className="nav-item">
                <a href="/shop" className="nav-link">
                  Gemstone
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
            <a href="/user" className="btn btn-link p-0 mx-2">
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
            <a href="/cart" className="btn btn-link p-0 mx-2">
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
