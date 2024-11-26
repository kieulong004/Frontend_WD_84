import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.title = "Đăng ký";
  }, []);

  const onSubmit = async (data: RegisterFormInputs) => {
    toast.info("Đang xử lý đăng ký...");
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", data);
      if (response.status === 201) {
        toast.success("Đăng ký thành công!");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Chờ 2 giây trước khi chuyển hướng
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error("Đăng ký thất bại!");
        } else if (status === 422 && data.errors) {
          if (data.errors.email) {
            toast.error(data.errors.email[0]);
          }
          if (data.errors.password) {
            toast.error(data.errors.password[0]);
          }
          if (data.errors.name) {
            toast.error(data.errors.name[0]);
          }
        } else {
          toast.error("Đăng ký thất bại!");
        }
      } else {
        console.error("Registration failed:", error);
        toast.error("Đăng ký thất bại!");
      }
    }
  };

  return (
    <main className="container">
      <div className="login_container">
        <div className="login_title">
          <span>Đăng kí</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_wrapper">
            <input
              type="text"
              id="name"
              className={`input_field ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Name là trường hợp bắt buộc" })}
              placeholder=" "
            />
            <label htmlFor="name" className="label">
              Họ và tên
            </label>
            <i className="fa-regular fa-user icon" />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="input_wrapper">
            <input
              type="email"
              id="email"
              className={`input_field ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email là trường hợp bắt buộc" })}
              placeholder=" "
              autoComplete="email"

            />
            <label htmlFor="email" className="label">
              Email của bạn
            </label>
            <i className="fa-regular fa-envelope icon" />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="input_wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className={`input_field ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Password là trường hợp bắt buộc",
                minLength: { value: 8, message: "Password phải có ít nhất 8 ký tự" }
              })}
              placeholder=" "
              autoComplete="new-password"
            />
            <label htmlFor="password" className="label">
              Mật khẩu
            </label>
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} icon`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <div className="input_wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`input_field ${errors.confirmPassword ? "is-invalid" : ""}`}
              {...register("confirmPassword", {
                required: "Confirm Password là trường hợp bắt buộc",
                validate: value =>
                  value === watch("password") || "Confirm Password không khớp với Password"
              })}

              placeholder=" "
              autoComplete="new-password"
              
            />
            <label htmlFor="confirmPassword" className="label">
              Nhập lại mật khẩu
            </label>
            <i
              className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} icon`}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ cursor: "pointer" }}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
          </div>
          <div className="input_wrapper">
            <button type="submit" className="input_submit">
              Đăng kí
            </button>
          </div>
        </form>
        <div className="signup">
          <span>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default RegisterPage;