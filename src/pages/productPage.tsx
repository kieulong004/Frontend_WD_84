import React, { useState, useEffect } from "react";
import ProductSection from "@/components/product/ProductSection";
import "../css/ProductPage.css";

type Product = {
  id: string;
  image?: string;
  name: string;
  price: string;
  category_id: string;
  category: Category;
  variants: Variant[];
  created_at: string; // Thêm trường created_at để sắp xếp theo thời gian
};

type Category = {
  name: string;
  id: string;
};
type Variant = {
  id: string;
  listed_price: number;
  selling_price: number;
  quantity: number;
};

const Productpage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1); // State lưu trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm

  useEffect(() => {
    fetch("http://localhost:8000/api/product/product-list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.status && Array.isArray(data.data)) {
          setProducts(data.data); // Lấy mảng sản phẩm từ thuộc tính data
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []); // Chỉ chạy một lần sau khi component mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Số lượng sản phẩm mỗi trang
  const itemsPerPage = 10;

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán số trang dựa trên tổng số sản phẩm đã lọc
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Lấy sản phẩm cho trang hiện tại
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm thay đổi trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Hàm cập nhật giá trị tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi tìm kiếm
  };

  return (
    <div className="flex overflow-hidden flex-col pb-2.5 bg-white mb-5">
      <div className="mx-5 mb-4 d-flex align-items-center">
        <label htmlFor="searchInput" className="form-label me-2 mb-0">
          Tìm kiếm sản phẩm:
        </label>
        <input
          type="text"
          id="searchInput"
          className="form-control me-2"
          placeholder="Nhập tên sản phẩm..."
          style={{ width: "300px" }}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Hiển thị danh sách sản phẩm của trang hiện tại */}
      <ProductSection title="Danh sách sản phẩm" products={currentProducts} />

      {/* Hiển thị phân trang */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Productpage;
