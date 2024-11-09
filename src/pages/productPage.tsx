import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductSection from "@/components/product/ProductSection";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
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

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // State lưu danh sách danh mục
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // State lưu danh mục được chọn
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // State lưu trang hiện tại
  const [searchTerm, setSearchTerm] = useState(""); // State lưu giá trị tìm kiếm

  useEffect(() => {
    // Lấy trạng thái trang hiện tại từ localStorage nếu có
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
    fetchProducts(); // Gọi hàm để lấy sản phẩm
    fetchCategories(); // Gọi hàm để lấy danh mục
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:8000/api/product/product-list")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.status && Array.isArray(data.data)) {
          // Sắp xếp sản phẩm theo thời gian giảm dần
          const sortedProducts = data.data.sort((a: Product, b: Product) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setProducts(sortedProducts); // Lưu trữ danh sách sản phẩm đã sắp xếp
        } else {
          throw new Error("Data is not an array");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/categories/list-category"
      );
      const category = data.data;
      setCategories(category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Số lượng sản phẩm mỗi trang
  const itemsPerPage = 8;

  // Lọc sản phẩm theo từ khóa tìm kiếm và danh mục được chọn
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "" || product.category_id === selectedCategory)
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
    localStorage.setItem("currentPage", pageNumber.toString()); // Lưu trang hiện tại vào localStorage
  };

  // Hàm cập nhật giá trị tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi tìm kiếm
  };

  // Hàm cập nhật danh mục được chọn
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi danh mục
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 filter-section p-3">
          <div className="container mb-4">
            <h5 className="px-4">Danh mục sản phẩm</h5>
            <ul className="list-group-item px-4 my-4">
              {categories.map((category) => (
                <li
                  key={category.id}
                  className="list-group-item my-1"
                  onClick={() => handleCategoryChange(category.id)}
                  style={{ cursor: "pointer" }}
                >
                  <span className={selectedCategory === category.id ? "text-danger fw-bold" : ""}>
                    {category.name}
                  </span>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-md-9 product-section p-3">
          <div className="mb-4 d-flex justify-content-between align-items-center">
            <label htmlFor="searchInput" className="form-label mb-0">
            </label>
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder="Nhập tên sản phẩm..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ maxWidth: "300px" }}
            />
          </div>

          {/* Hiển thị danh sách sản phẩm của trang hiện tại */}
          <ProductSection title="Danh sách sản phẩm" products={currentProducts} />

          {/* Hiển thị phân trang */}
          <div className="pagination justify-content-center mt-4">
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
      </div>
    </div>
  );
};

export default ProductPage;
