import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthorizations } from "./authUtils";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!checkAuthorizations(navigate)) {
      // Nếu không có quyền, không render nội dung
      return;
    }
  }, [navigate]);

  return <>{children}</>;
};

export default PrivateRoute;
