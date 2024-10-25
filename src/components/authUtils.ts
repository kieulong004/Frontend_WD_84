// authUtils.ts
import { toast } from "react-toastify";

export const checkAuthorization = (navigate: any) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Bạn phải đăng nhập.");
    setTimeout(() => {
        navigate("/login");
    }, 2000);
    return false;
  }
  return true;
};