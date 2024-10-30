// authUtils.ts
import { toast } from "react-toastify";

export const checkAuthorization = (navigate: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    setTimeout(() => {
      navigate('/login');
      toast.error("Bạn cần đăng nhập để truy cập trang này  ");
    }, 2000);
    return false;
  }
  return true;
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};



export const checkAuthorizations = (navigate: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Bạn phải đăng nhập.");
    setTimeout(() => {
        navigate("/login");
    },6000);
    return false;
  }
  return true;
};