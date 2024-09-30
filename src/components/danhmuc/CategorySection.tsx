import React, { useRef } from "react";
import CategoryItem from "./CategoryItem";
import "./Category.css";
const categories = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b39f476b64ecc0f31643877703a64403b16cb8edfde7a4f845d344f274654111?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Nhẫn cưới",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/f16695b5417c7e756e040ce38e4c756e7e6528eb8f37cd9b83d1b0a43aeac0dd?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Vòng tay",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cec2f14d08d900c8d18179520086afd2d512fb4b9cfad15e7583a7346ea30998?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Hoa tai",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0a6e79b6208a59a760ac98450fa933e3f15c4fa9baf7f4f7b9390f90b7449f59?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Vòng cổ",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0a6e79b6208a59a760ac98450fa933e3f15c4fa9baf7f4f7b9390f90b7449f59?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Vòng cổ",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/0a6e79b6208a59a760ac98450fa933e3f15c4fa9baf7f4f7b9390f90b7449f59?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Vòng cổ",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cec2f14d08d900c8d18179520086afd2d512fb4b9cfad15e7583a7346ea30998?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Hoa tai",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cec2f14d08d900c8d18179520086afd2d512fb4b9cfad15e7583a7346ea30998?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Hoa tai",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cec2f14d08d900c8d18179520086afd2d512fb4b9cfad15e7583a7346ea30998?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a",
    title: "Hoa tai",
  },
];

const CategorySection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const scrollStyle: React.CSSProperties = {
    overflowX: "auto", // Cho phép cuộn ngang
    whiteSpace: "nowrap", // Không xuống dòng
  };

  const itemStyle = {
    flex: "0 0 auto", // Không co giãn
    width: "200px", // Đặt chiều rộng cho mỗi mục
  };

  return (
    <section className="d-flex flex-column align-items-start p-5 mt-5">
      <h2 className="h3 text-dark mb-4" style={{ fontSize: "2rem" }}>
        Mua sắm trang sức theo danh mục
      </h2>
      <div className="d-flex w-100 align-items-center">
        <button className="btn btn-outline me-3 " onClick={scrollLeft}>
          &#10096;
        </button>
        <div
          className="category-scroll mt-4 w-100"
          style={scrollStyle}
          ref={scrollRef}
        >
          <div className="d-flex flex-row gap-4">
            {categories.map((category, index) => (
              <div className="category-item" key={index} style={itemStyle}>
                <CategoryItem image={category.image} title={category.title} />
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-outline ms-3" onClick={scrollRight}>
          &#10097;
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
