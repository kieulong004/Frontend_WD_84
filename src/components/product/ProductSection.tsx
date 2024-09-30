import React, { useState } from "react";
import ProductItem from "./ProductItem";

type Product = {
  image: string;
  name: string;
  price: string;
  category: string; // Thêm thuộc tính danh mục
};

type ProductSectionProps = {
  title: string;
  products: Product[];
};

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // Trạng thái cho bộ lọc danh mục

  // Danh sách các danh mục
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  ); // Lấy danh sách danh mục duy nhất

  // Hàm xử lý thay đổi danh mục
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value); // Cập nhật danh mục đã chọn
  };

  // Lọc sản phẩm theo danh mục đã chọn
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section className="mt-5">
      <h2 className="h2 text-black mb-4">{title}</h2>

      {/* Bộ lọc theo danh mục */}
      <div className="mb-4">
        <label htmlFor="categoryFilter" className="form-label me-2">
          Lọc theo danh mục:
        </label>
        <select
          id="categoryFilter"
          onChange={handleCategoryChange}
          className="form-select"
        >
          <option value="all">Tất cả</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Hiển thị các sản phẩm đã lọc */}
      <div className="d-flex flex-wrap gap-4 justify-content-between">
        {filteredProducts.map((product, index) => (
          <ProductItem key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
