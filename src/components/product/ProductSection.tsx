import React from "react";
import { Link } from "react-router-dom";

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

type ProductSectionProps = {
  title?: string;
  products: Product[];
  limit?: number; // Nhận giới hạn sản phẩm
};

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  limit,
}) => {
  // Lấy số lượng sản phẩm dựa trên limit
  const displayedProducts = limit ? products.slice(0, limit) : products;
  console.log(products);

  return (
    <section className="mx-5 mt-5">
      <h2 className="h2 mb-4 text-center">{title}</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-between">
        {displayedProducts.map((product) => {
          const firstVariant = product.variants[0]; // Lấy biến thể đầu tiên

          return (
            <div
              key={product.id}
              className="d-flex flex-column align-items-center border"
            >
              <img
                loading="lazy"
                src={`http://127.0.0.1:8000${product.image}`} // Thêm hình ảnh nếu có
                alt={product.name}
                className="img-fluid rounded mb-3"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "contain",
                  borderBottom: "1px solid #e0e0e0",
                  borderRadius: "none",
                }}
              />
              <div className="mt-2 text-md text-center text-muted">
                {product.category.name}
              </div>
              <div className="mt-2 text-lg fw-semibold text-center">
                <Link
                  to={"/products/" + product.id}
                  className="text-decoration-none text-dark"
                >
                  {product.name}
                </Link>
              </div>
              {firstVariant && (
                <div className="d-flex justify-content-between align-items-center w-100 px-3 my-2">
                  <del className="text-muted text-secondary">
                    {firstVariant.listed_price} đ
                  </del>
                  <span className="font-weight-bold text-danger">
                    {firstVariant.selling_price} đ
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;