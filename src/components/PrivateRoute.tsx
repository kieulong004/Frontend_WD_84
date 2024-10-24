import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Bạn phải đăng nhập mới có thể mua hàng.");
      navigate("/login");
      return;
    }
    setIsAuthorized(true);
  }, [token, navigate]);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
