import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import banner1 from "../image/banner1.png";
import banner2 from "../image/banner1.png";
import banner3 from "../image/banner1.png";

const HeroSection: React.FC = () => {
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

  const slides = [
    { src: banner1, alt: "Slide 1" },
    { src: banner2, alt: "Slide 2" },
    { src: banner3, alt: "Slide 3" },
  ];

  return (
    <section className="hero">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              loading="lazy"
              src={slide.src}
              alt={slide.alt}
              className="img-fluid w-100 slide-image"
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;
