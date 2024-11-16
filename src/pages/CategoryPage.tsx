import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductSection from "@/components/product/ProductSection";

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

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductsByCategory(id);
    }
  }, [id]);

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/product/category/${categoryId}`);
      const data = response.data.data.products;
      setProducts(data);
      setCategoryName(response.data.data.category.name); // Lấy tên danh mục từ API
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center">
        {/* Hiển thị danh sách sản phẩm của danh mục hiện tại */}
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <ProductSection title={`Danh mục: ${categoryName}`} products={products} />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;