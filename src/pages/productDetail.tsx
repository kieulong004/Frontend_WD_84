import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

type Product = {
  id: number;
  category_id: number;
  sku: string;
  name: string;
  image: string;
  description: string;
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  variants: {
    id: number;
    product_id: number;
    weight_id: number;
    listed_price: string;
    import_price: string;
    selling_price: string;
    quantity: number;
    created_at: string;
    updated_at: string;
  }[];
};

type Variant = {
  id: number;
  listed_price: number;
  product: {
    id: number;
    category_id: number;
    sku: string;
    name: string;
    image: string;
    description: string;
    created_at: string;
    updated_at: string;
    category: {
      id: number;
      name: string;
      created_at: string;
      updated_at: string;
    };
    variants: {
      id: number;
      product_id: number;
      weight_id: number;
      listed_price: string;
      import_price: string;
      selling_price: string;
      quantity: number;
      created_at: string;
      updated_at: string;
    }[];
  };
  quantity: number;
  selling_price: number;
  weight: {
    id: number;
    unit: string;
    weight: number;
  };
};

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/product-detail/${id}`
        );
        setProduct(data.data.product);
        setRelatedProducts(data.data.relatedProducts);
        setVariants(data.data.variants);
        setSelectedVariant(data.data.variants[0]); // Set the first variant as the default selected variant
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);
  return (
    <div>
      <section className="detail py-5 border-bottom">
        <div className="container">
          <div className="row mb-5 justify-content-center">
            <div className="col-md-6 text-center">
              <img
                src={`http://127.0.0.1:8000${product?.image}`}
                alt="Main product image"
                className="img-fluid mb-3 rounded"
                style={{ width: "80%" }}
              />
            </div>

            <div className="col-md-6">
              <h1 className="product-title display-4">{product?.name}</h1>
              <p className="text-muted product-sku">
                Mã sản phẩm {product?.sku}
              </p>
              <p className="product-description lead">{product?.description}</p>
              {selectedVariant && (
                <>
                  <p className="text-muted py-2">
                    <del className="me-5">
                      {selectedVariant.listed_price} VNĐ
                    </del>
                    <span className="text-danger ms-3 h6">
                      {selectedVariant.selling_price} VNĐ
                    </span>
                  </p>
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <h5 className="me-3 mb-0">Kích cỡ </h5>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Chọn kích cỡ viên kim cương"
                      >
                        {variants?.map((variant) => (
                          <button
                            key={variant.id}
                            type="button"
                            className={`btn btn-outline-secondary me-2 ${
                              selectedVariant.id === variant.id ? "active" : ""
                            }`}
                            onClick={() => setSelectedVariant(variant)}
                          >
                            {variant.weight.weight} {variant.weight.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex align-items-center mb-3">
                <span className="me-3">Số lượng</span>
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="input-group" style={{ maxWidth: "120px" }}>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      defaultValue="1"
                      min="1"
                      style={{
                        width: "50px",
                        border: "none",
                        borderTop: "1px solid #000",
                        borderBottom: "1px solid #000",
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex mb-3">
                <button className="btn btn-dark w-50 me-2 add-to-cart-btn">
                  <i className="bi bi-cart-plus me-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button className="btn btn-danger w-50 buy-now-btn">
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="Related py-5">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <h2 className="section-heading__title">Sản phẩm cùng danh mục</h2>
          </div>
          <div className="row">
            {relatedProducts?.slice(0, 5).map((relatedProduct) => (
              <div className="col-md-3 mb-4" key={relatedProduct.id}>
                <div className="card h-100">
                  <img
                    src={`http://127.0.0.1:8000${relatedProduct?.image}`}
                    alt="#"
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body text-center d-flex flex-column">
                    <p className="my-2">
                      <a href="#" className="text-decoration-none text-dark">
                        {relatedProduct.category.name}
                      </a>
                    </p>
                    <p className="product__category">
                      <Link
                        className="text-decoration-none text-dark fw-semibold"
                        to={`/products/${relatedProduct.id}`}
                      >
                        {relatedProduct.name}
                      </Link>
                    </p>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <del className="text-muted me-2">
                          {relatedProduct.variants[0].listed_price} VNĐ
                        </del>
                        <span className="text-danger font-weight-bold">
                          {relatedProduct.variants[0].selling_price} VNĐ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
