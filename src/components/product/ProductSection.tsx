import React, { useState } from "react";
import ProductItem from "./ProductItem";

type Product = {
  id: number;
  image: string;
  name: string;
  price: string;
  category: {
    id: number;
    name: string;
  };
  categoryId: number;
};

type ProductSectionProps = {
  products: Product[];
};

const ProductSection: React.FC<ProductSectionProps> = ({products} ) => {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Trạng thái cho ô tìm kiếm
  // Kiểm tra xem products có phải là mảng không
  if (!Array.isArray(products)) {
    return <div>Dữ liệu sản phẩm không hợp lệ.</div>;
  }

  // Hàm xử lý thay đổi ô tìm kiếm
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Cập nhật trạng thái với giá trị tìm kiếm mới
  };


  // Lọc sản phẩm dựa trên tìm kiếm
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) // Tìm kiếm theo tên sản phẩm
  );
  return (
    <section className="mt-5">
      <h2 className="h2 text-black mb-4">sản phẩm mới nhất</h2>

      {/* Ô tìm kiếm */}
      <div className="mb-4 d-flex align-items-center">
        <label htmlFor="searchInput" className="form-label me-2 mb-0">
          Tìm kiếm sản phẩm:
        </label>
        <input
          type="text"
          id="searchInput"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control me-2" // Thêm margin-right cho khoảng cách
          placeholder="Nhập tên sản phẩm..."
          style={{ width: "200px" }} // Thiết lập chiều rộng cho ô input
        />
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
