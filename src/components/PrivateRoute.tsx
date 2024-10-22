import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const verifyUserRole = async () => {
      if (!token) {
        // Nếu không có token, chuyển hướng đến trang đăng nhập
        navigate("/login");
        return;
      }
      console.log(token);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/checkRole",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userRole = response.data.role;
        console.log(userRole);
        if (!userRole && userRole !== 1) {
          // Nếu vai trò của người dùng không phải là 1, hiển thị thông báo lỗi
          toast.error("Bạn không có quyền truy cập vào trang này.");
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Lỗi khi xác minh vai trò người dùng:", error);
        toast.error("Có lỗi xảy ra khi xác minh vai trò người dùng.");
        setIsAuthorized(false);
      }
    };

    verifyUserRole();
  }, [token, navigate]);

  if (isAuthorized === null) {
    // Đang kiểm tra quyền truy cập, có thể hiển thị một spinner hoặc loading indicator
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    // Nếu không có quyền truy cập, không hiển thị gì cả
    return null;
  }

  // Nếu có token và vai trò của người dùng là 1, hiển thị component con
  return <>{children}</>;
};

export default PrivateRoute;
