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
  created_at: string;
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
  const [currentPage, setCurrentPage] = useState<number>(
    () => Number(localStorage.getItem("currentPage")) || 1 // Lấy trang từ localStorage hoặc mặc định là 1
  );
  const [searchTerm, setSearchTerm] = useState("");

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
          setProducts(data.data);
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Lưu trang hiện tại vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("currentPage", String(currentPage));
  }, [currentPage]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const itemsPerPage = 10;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
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

      <ProductSection title="Danh sách sản phẩm" products={currentProducts} />

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
