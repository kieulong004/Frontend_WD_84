import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", data);
      const { message, user, token, status_code } = response.data;

      if (status_code === 200) {
        toast.success(message);
        // Lưu thông tin người dùng và token vào localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);



        if (user) {
          if (user.role === 0) {
            window.location.href = "http://localhost/DATN/public/admin";
          } else if (user.role === 1) {
            navigate("/");
            window.location.reload(); 
          } else {
            toast.error("Vai trò không hợp lệ!");
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          toast.error("Email không tồn tại");
        } else if (status === 401) {
          toast.error("Mật khẩu không đúng");
        } else if (status === 422 && data.errors) {
          if (data.errors.email) {
            toast.error(data.errors.email[0]);
          }
          if (data.errors.password) {
            toast.error(data.errors.password[0]);
          }
        } else {
          toast.error("Đăng nhập thất bại!");
        }
      } else {
        console.error("Login failed:", error);
        toast.error("Đăng nhập thất bại!");
      }
    }
  };

  return (
    <main className="container">
      <div className="login_container">
        <div className="login_title">
          <span>Login</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_wrapper">
            <input
              type="email"
              id="email"
              className={`input_field ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email là trường hợp bắt buộc" })}
              placeholder=" "
            />
            <label htmlFor="email" className="label">
              Email
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
                validate: {
                  startsWithUpperCase: value =>
                    /^[A-Z]/.test(value) || "Password phải bắt đầu bằng chữ cái viết hoa",
                  minLength: value =>
                    value.length >= 8 || "Password phải có ít nhất 8 ký tự",
                  hasLowerCase: value =>
                    /[a-z]/.test(value) || "Password phải chứa ít nhất một chữ cái viết thường",
                  hasNumber: value =>
                    /\d/.test(value) || "Password phải chứa ít nhất một chữ số",
                  hasSpecialChar: value =>
                    /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password phải chứa ít nhất một ký tự đặc biệt"
                }
              })}
              placeholder=" "
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} icon`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <div className="input_wrapper">
            <button type="submit" className="input_submit">
              Login
            </button>
          </div>
        </form>
        <div className="signup">
          <span>
            Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default LoginPage;