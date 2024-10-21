import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles: number[]; // Các vai trò được phép truy cập
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      // Nếu không có token hoặc thông tin người dùng, chuyển hướng đến trang đăng nhập
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(user);
    const userRole = parsedUser.role;

    if (!allowedRoles.includes(userRole)) {
      // Nếu vai trò của người dùng không được phép truy cập, hiển thị thông báo lỗi
      toast.error('Bạn không có quyền truy cập vào trang này.');
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [token, user, allowedRoles, navigate]);

  if (isAuthorized === null) {
    // Đang kiểm tra quyền truy cập, có thể hiển thị một spinner hoặc loading indicator
    return <div>Loading...</div>;
  }

  if (isAuthorized === false) {
    // Nếu không có quyền truy cập, không hiển thị gì cả
    return null;
  }

  // Nếu có token và vai trò của người dùng được phép truy cập, hiển thị component con
  return <>{children}</>;
};

export default PrivateRoute;