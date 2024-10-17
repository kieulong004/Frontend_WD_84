import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type RegisterFormInputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormInputs>();
  const navigate = useNavigate();
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: RegisterFormInputs) => {
    console.log(data)
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", data);
      if (response.status === 201) {
        toast.success("Đăng ký thành công!");
        navigate("/login");
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
          <span>Register</span>
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
                minLength: { value: 8, message: "Password phải có ít nhất 8 ký tự" }
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
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className={`input_field ${errors.confirmPassword ? "is-invalid" : ""}`}
              {...register("confirmPassword", {
                required: "Confirm Password là trường hợp bắt buộc",
                validate: value => value === password || "Passwords không khớp"
              })}
              placeholder=" "
            />
            <label htmlFor="confirmPassword" className="label">
              Confirm Password
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
              Register
            </button>
          </div>
        </form>
        <div className="signup">
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default RegisterPage;