import React, { useEffect, useState } from "react";
import ProductSection from "@/components/product/ProductSection";
import HeroSection from "./../components/banner/HeroSection";
import ProposalSection from "./../components/banner/ProposalSection";
import BlogProduct from "@/components/blogProduct";

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

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
          // Sắp xếp sản phẩm theo thời gian giảm dần
          const sortedProducts = data.data.sort((a: Product, b: Product) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
          setProducts(sortedProducts.slice(0, 5)); // Chỉ lấy 5 sản phẩm mới nhất
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <HeroSection />
      <ProductSection
        title="Sản phẩm mới nhất"
        products={products} // Truyền sản phẩm đã sắp xếp và giới hạn
      />
      <ProposalSection />
      <BlogProduct />
    </div>
  );
};

export default HomePage;