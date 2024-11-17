import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import "../../css/HeroSection.css";

interface Slide {
  image: string;
  link?: string; // Định nghĩa `link` là tùy chọn
}

const HeroSection: React.FC = () => {
const [slides, setSlides] = useState<Slide[]>([]); // Trạng thái để lưu trữ ảnh từ API
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái tải dữ liệu

  const settings = {
    dots: true, // Hiển thị các dấu chấm điều hướng dưới cùng
    infinite: true, // Vòng lặp vô hạn
    speed: 500, // Tốc độ chuyển slide
    slidesToShow: 1, // Hiển thị 1 slide mỗi lần
    slidesToScroll: 1, // Trượt qua 1 slide mỗi lần
    autoplay: true, // Tự động chuyển slide
    autoplaySpeed: 1500, // Tốc độ chuyển tự động
    arrows: true, // Hiển thị mũi tên điều hướng
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/slider");
        console.log(data.data.data);
        setSlides(data.data.data); // Lưu slides vào state
        setLoading(false); // Dữ liệu đã được tải xong
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        setLoading(false); // Nếu có lỗi, cũng tắt trạng thái loading
      }
    };

    fetchSlides(); // Gọi hàm fetchSlides khi component mount
  }, []); // Chỉ gọi một lần khi component mount

  if (loading) {
    return (
      <div className="text-center mb-5 ">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <section className="hero">
      {loading ? (
        <p>Loading...</p>
      ) : slides.length > 0 ? (
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              {slide.link ? (
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    loading="lazy"
                    src={`http://127.0.0.1:8000/storage/${slide.image}`}
                    className="img-fluid w-100 slide-image"
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  />
                </a>
              ) : (
                <img
                  loading="lazy"
                  src={`http://127.0.0.1:8000/storage/${slide.image}`}
                  className="img-fluid w-100 slide-image"
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                />
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <p>Không có slide để hiển thị.</p> // Hiển thị thông báo nếu không có slides
      )}
    </section>
  );
};

export default HeroSection;