import React from "react";
import { logo } from "./icons";

const Logo = () => {
  return (
    <div>
      <a href="/">
        <img
          src={logo}
          alt="Logo"
          width={135}
          height={65}
          className="img-fluid"
        />
      </a>
    </div>
  );
};

export default Logo;
