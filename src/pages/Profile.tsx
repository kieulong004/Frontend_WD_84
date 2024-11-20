import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import {  getToken } from "@/components/utils";

interface UserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const tokenStorage = getToken();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfile>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Tài khoản";
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {data} = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        });
        const userData = data.data;
        setValue("email", userData.email);
        setValue("name", userData.name);
        setValue("phone", userData.phone);
        setValue("address", userData.address);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Có lỗi xảy ra khi lấy thông tin người dùng.");
      }
    };

    fetchUserData();
  }, [setValue, tokenStorage]);

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    setLoading(true);
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
      toast.success("Cập nhật thông tin cá nhân thành công!", ({
        autoClose: 2000,
      }));
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error)
      toast.error("Có lỗi xảy ra khi cập nhật thông tin cá nhân.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Thông tin cá nhân</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className="text-danger">Email là bắt buộc</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên</label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-danger">Tên là bắt buộc</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Số điện thoại</label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            pattern="[0-9]{10}"
            placeholder="0901234567"
            required
            {...register("phone", {
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ",
              },
            })}
          />
          {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Địa chỉ</label>
          <input
            type="text"
            className="form-control"
            id="address"
            {...register("address")}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </button>
      </form>
    </div>
  );
};

export default Profile;