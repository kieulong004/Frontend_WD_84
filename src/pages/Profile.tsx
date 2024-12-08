import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { getToken } from "@/components/utils";

interface UserProfile {
  email: string;
  name: string;
  phone: string;
  address: string;
}

const Profile = () => {
  const tokenStorage = getToken();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserProfile>();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState<{ id: string; name: string }[]>(
    []
  );
  const [districts, setDistricts] = useState<{ id: string; name: string }[]>(
    []
  );
  const [wards, setWards] = useState<{ id: string; name: string }[]>([]);
  const [provinceId, setProvinceId] = useState<string>("");
  const [districtId, setDistrictId] = useState<string>("");
  const [wardId, setWardId] = useState<string>("");

  useEffect(() => {
    document.title = "Tài khoản";
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        });
        const userData = data.data;
        setValue("email", userData.email);
        setValue("name", userData.name);
        setValue("phone", userData.phone);
        setValue("address", userData.address);
        setProvinceId(userData.province_id || "");

        // Gọi fetchDistricts và fetchWards sau khi nhận được dữ liệu người dùng
        if (userData.province_id) {
          await fetchDistricts(userData.province_id);
          setDistrictId(userData.district_id || "");
        }
        if (userData.district_id) {
          await fetchWards(userData.district_id);
          setWardId(userData.ward_id || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Có lỗi xảy ra khi lấy thông tin người dùng.");
      }
    };

    fetchUserData();
  }, [setValue, tokenStorage]);
  const fetchProvinces = async () => {
    const response = await axios.get("http://localhost:8000/api/provinces");
    setProvinces(response.data.provinces);
  };

  const fetchDistricts = async (provinceId: string) => {
    const response = await axios.post(`http://localhost:8000/api/districts`, {
      province_id: provinceId,
    });
    setDistricts(response.data.districts);
    setWards([]); // Reset wards khi thay đổi tỉnh
  };

  const fetchWards = async (districtId: string) => {
    const response = await axios.post(`http://localhost:8000/api/wards`, {
      district_id: districtId,
    });
    setWards(response.data.wards);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (provinceId) {
      fetchDistricts(provinceId);
    }
  }, [provinceId]);

  useEffect(() => {
    if (districtId) {
      fetchWards(districtId);
    }
  }, [districtId]);

  const onSubmit: SubmitHandler<UserProfile> = async (data) => {
    setLoading(true);
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/user`,
        {
          ...data,
          province_id: provinceId,
          district_id: districtId,
          ward_id: wardId,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenStorage}`,
          },
        }
      );
      toast.success("Cập nhật thông tin cá nhân thành công!", {
        autoClose: 1000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
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
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", { required: true })}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Tên
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className="text-danger">Tên là bắt buộc</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Số điện thoại
          </label>
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
          {errors.phone && (
            <span className="text-danger">{errors.phone.message}</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="province" className="form-label">
            Tỉnh
          </label>
          <select
            className="form-control"
            id="province"
            value={provinceId}
            onChange={(e) => {
              setProvinceId(e.target.value);
              fetchDistricts(e.target.value); // Gọi hàm fetchDistricts với id của tỉnh
            }}
            required
          >
            <option value="">Chọn Tỉnh</option>
            {provinces.map((prov: { id: string; name: string }) => {
              return (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="district" className="form-label">
            Quận
          </label>
          <select
            className="form-control"
            id="district"
            value={districtId}
            onChange={(e) => {
              setDistrictId(e.target.value);
              fetchWards(e.target.value); // Gọi hàm fetchWards với id của quận
            }}
            required
          >
            <option value="">Chọn Quận</option>
            {districts.map((dist: { id: string; name: string }) => {
              return (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ward" className="form-label">
            Phường/Xã
          </label>
          <select
            className="form-control"
            id="ward"
            value={wardId}
            onChange={(e) => {
              setWardId(e.target.value);
            }}
            required
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((ward: { id: string; name: string }) => {
              return (
                <option key={ward.id} value={ward.id}>
                  {ward.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Địa chỉ cụ thể
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            {...register("address", { required: true })}
          />
        </div>
        {errors.address && (
          <span className="text-danger">{errors.address.message}</span>
        )}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
