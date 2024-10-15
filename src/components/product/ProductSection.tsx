import React from "react";
import { Link } from "react-router-dom";
import "../../css/ProductSection.css";

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

type ProductSectionProps = {
  title?: string;
  products: Product[];
  limit?: number;
};

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  products,
  limit,
}) => {
  // Limit the number of displayed products
  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="mx-5 mt-5">
      <h2 className="h2 mb-4 text-center">{title}</h2>
      <div className="d-flex flex-wrap gap-4 justify-content-between">
        {displayedProducts.map((product) => {
          const firstVariant = product.variants[0]; // Check for the first variant
          const productImage = product.image
            ? `http://127.0.0.1:8000${product.image}`
            : "/path/to/placeholder-image.png"; // Use a placeholder if image is missing

          return (
            <div
              key={product.id}
              className="product-card d-flex flex-column align-items-center border position-relative"
            >
              <div className="product-image-container position-relative">
                <img
                  loading="lazy"
                  src={productImage} // Safely use the image
                  alt={product.name || "No Name Available"} // Fallback for missing name
                  className="img-fluid rounded mb-3"
                  style={{
                    width: "250px",
                    height: "250px",
                    objectFit: "contain",
                    borderBottom: "1px solid #e0e0e0",
                    borderRadius: "none",
                  }}
                />
                <Link
                  to={`/products/${product.id}`}
                  className="btn btn-outline-secondary hover-button"
                  style={{ fontSize: "12px", borderRadius: "20px" }}
                >
                  XEM CHI TIẾT
                </Link>
              </div>

              <div className="text-center mt-3">
                {/* Handle missing category gracefully */}
                <div className="text-md text-muted">
                  {product.category?.name || "Uncategorized"}
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="text-decoration-none text-dark fw-semibold d-block mt-2"
                >
                  {product.name || "Unnamed Product"} {/* Fallback for name */}
                </Link>

                {/* Pricing Information */}
                {firstVariant ? (
                  <div className="product-pricing">
                    <del className="listed-price">
                      {firstVariant.listed_price.toLocaleString()} đ
                    </del>
                    <span className="selling-price">
                      {firstVariant.selling_price.toLocaleString()} đ
                    </span>
                  </div>
                ) : (
                  <div className="product-pricing">Price not available</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;
