import HeroSection from "@/components/banner/HeroSection";
import ProposalSection from "@/components/banner/ProposalSection";
import CategorySection from "@/components/danhmuc/CategorySection";
import ProductSection from "@/components/product/ProductSection";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface Product {
  image: string;
  name: string;
  price: string;
  category: string;
}
const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products?categories=categoryId");
        console.log("Dữ liệu trả về từ API:", response.data);

        // Kiểm tra xem response.data có phải là một mảng không
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          throw new Error("Dữ liệu không phải là mảng");
        }
      } catch (error) {
        setError(
          "Lỗi khi tải sản phẩm: " +
            (error instanceof Error ? error.message : "Có lỗi xảy ra")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Hiển thị trạng thái đang tải
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Hiển thị trạng thái lỗi
  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }
  return (
    <div className="flex overflow-hidden flex-col pb-2.5 bg-white">
      <HeroSection />
      <CategorySection />
      <ProductSection
        title="Sản phẩm mới nhất"
        products={products.slice(0, 5)}
      />
      <ProductSection
        title="Sản phẩm mới nhất"
        products={products.slice(0, 5)}
      />
      <ProposalSection />
    </div>
  );
};

export default HomePage;
