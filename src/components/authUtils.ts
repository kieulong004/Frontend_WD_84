import { toast } from "react-toastify";

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const checkAuthorizations = (navigate: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Bạn phải đăng nhập.", {
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000); 
    return false;
  }
  return true;
};