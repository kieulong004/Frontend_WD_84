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

  const fetchProducts = async (searchTerm: string = "") => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/filterProducts?name=${searchTerm}`);
      const data = response.data;
      if (data && data.status && Array.isArray(data.data)) {
        setProducts(data.data); // Lưu trữ danh sách sản phẩm
        setError(null); // Xóa lỗi nếu có sản phẩm
      } else {
        throw new Error("Dữ liệu không phải là một mảng");
      }
    } catch (err) {
      setProducts([]); // Thiết lập products thành mảng rỗng khi có lỗi
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("Không tìm thấy sản phẩm nào phù hợp với tìm kiếm của bạn.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://127.0.0.1:8000/api/categories/list-category"
      );
      const category = data.data;
      setCategories(category);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/category/${categoryId}`);
      const data = response.data.data.products;
      setProducts(data);
      setError(null); // Xóa lỗi nếu có sản phẩm
    } catch (err) {
      setProducts([]); // Thiết lập products thành mảng rỗng khi có lỗi
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("Không tìm thấy sản phẩm nào trong danh mục này.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định");
      }
    }
  };

  // Hàm cập nhật danh mục được chọn
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi danh mục
    if (categoryId === "") {
      fetchProducts(searchTerm); // Lấy tất cả sản phẩm nếu không chọn danh mục
    } else {
      fetchProductsByCategory(categoryId); // Lấy sản phẩm theo danh mục
    }
  };

  // Hàm cập nhật giá trị tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi tìm kiếm
    fetchProducts(searchTerm); // Gọi hàm fetchProducts với giá trị tìm kiếm mới
  };

  // Số lượng sản phẩm mỗi trang
  const itemsPerPage = 10;

  // Tính toán số trang dựa trên tổng số sản phẩm
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Lấy sản phẩm cho trang hiện tại
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Hàm thay đổi trang
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString()); // Lưu trang hiện tại vào localStorage
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 product-section p-3">
          <div className="mx-5">
            <div className="d-flex align-items-center">
              <label htmlFor="searchInput" className="form-label mb-0 me-2 visually-hidden">
                Tìm kiếm sản phẩm:
              </label>
              <div className="input-group" style={{ maxWidth: "300px" }}>
                <input
                  type="text"
                  id="searchInput"
                  className="form-control"
                  placeholder="Nhập tên sản phẩm..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <label className="form-label mb-0 me-2 visually-hidden">Danh mục:</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Tất cả</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hiển thị danh sách sản phẩm của trang hiện tại */}
          {error ? (
            <div className="text-center text-danger">{error}</div>
          ) : (
            <ProductSection
              title="Danh sách sản phẩm"
              products={currentProducts}
            />
          )}

          {/* Hiển thị phân trang */}
          {totalPages > 1 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;