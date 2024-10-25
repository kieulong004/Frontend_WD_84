import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { getUserFromLocalStorage } from "@/components/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const userFromStorage = getUserFromLocalStorage();
  const userId = userFromStorage?.id;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/product-detail/${id}`
        );
        setProduct(data.data.product);
        setRelatedProducts(data.data.relatedProducts);
        setVariants(data.data.variants);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  const handleAddToCart = async () => {
    // Kiểm tra xem biến thể đã được chọn chưa và còn hàng không
    if (!selectedVariant) {
      setShowWarning(true);
      return;
    }

    if (selectedVariant.quantity === 0) {
      toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/carts/addToCart",
        {
          user_id: userId,
          product_id: product?.id,
          variant_id: selectedVariant?.id,
          quantity: quantity,
          price: selectedVariant?.selling_price,
        }
      );
      console.log("Product added to cart successfully:", data);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  const handleBuyNow = async () => {
    // Kiểm tra xem biến thể đã được chọn chưa và còn hàng không
    if (!selectedVariant) {
      setShowWarning(true);
      return;
    }

    if (selectedVariant.quantity === 0) {
      toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.");
      return;
    }

    await handleAddToCart(); // Gọi hàm thêm vào giỏ hàng
    navigate("/products/cart"); // Chuyển hướng đến trang giỏ hàng
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div>
      <ToastContainer />
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
              <div className="d-flex align-items-center product-info-row mb-2">
                <p className="text-muted product-sku mb-0 me-4">
                  Mã sản phẩm: {product?.sku}
                </p>
                {selectedVariant && (
                  <span className="badge bg-info text-dark stock-badge">
                    Số lượng còn lại: {selectedVariant.quantity}
                  </span>
                )}
              </div>
              <p className="product-description lead">{product?.description}</p>
              {variants.length > 0 && (
                <>
                  <p className="text-muted py-2">
                    <del className="me-5">
                      {formatCurrency(
                        Number(
                          selectedVariant
                            ? selectedVariant.listed_price
                            : variants[0].listed_price
                        )
                      )}
                    </del>
                    <span className="text-danger ms-3 h6">
                      {formatCurrency(
                        Number(
                          selectedVariant
                            ? selectedVariant.selling_price
                            : variants[0].selling_price
                        )
                      )}
                    </span>
                  </p>
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <h5 className="me-3 mb-0">Kích cỡ</h5>
                      <div className="btn-group" role="group" aria-label="Chọn kích cỡ viên kim cương">
                        {variants?.map((variant) => (
                          <button
                            key={variant.id}
                            type="button"
                            className={`btn btn-outline-secondary me-2 ${selectedVariant?.id === variant.id ? "active" : ""
                              }`}
                            onClick={() => {
                              if (selectedVariant?.id === variant.id) {
                                setSelectedVariant(null);
                              } else {
                                setSelectedVariant(variant);
                                setShowWarning(false); // Ẩn cảnh báo khi chọn biến thể
                                if (variant.quantity === 0) {
                                  toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.");
                                }
                              }
                            }}
                          >
                            {variant.weight.weight} {variant.weight.unit}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="d-flex align-items-center mb-3 quantity-container">
                <span className="me-3">Số lượng</span>
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="input-group" style={{ maxWidth: "150px" }}>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      className="form-control text-center quantity-input"
                      value={quantity}
                      min="1"
                      max={selectedVariant ? selectedVariant.quantity : 1}
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        if (
                          newQuantity >= 1 &&
                          newQuantity <= (selectedVariant ? selectedVariant.quantity : 1)
                        ) {
                          setQuantity(newQuantity);
                        }
                      }}
                      style={{
                        width: "60px",
                        border: "none",
                        borderTop: "1px solid #000",
                        borderBottom: "1px solid #000",
                      }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(
                            prev + 1,
                            selectedVariant ? selectedVariant.quantity : prev
                          )
                        )
                      }
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="d-flex mb-3">
                <button
                  className="btn btn-dark w-50 me-2 add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  <i className="bi bi-cart-plus me-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className="btn btn-danger w-50 buy-now-btn"
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>

              {showWarning && (
                <div className="alert alert-warning" role="alert">
                  Vui lòng chọn kích cỡ khi mua sản phẩm.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center">
          <i
            className="bi bi-check-circle-fill text-success me-2"
            style={{ fontSize: "24px" }}
          ></i>
          <p className="mb-0">Sản phẩm đã được thêm vào giỏ hàng thành công!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <section className="Related py-5">
        <div className="container">
          <div className="section-heading text-center mb-4">
            <h2 className="section-heading__title">Sản phẩm cùng danh mục</h2>
          </div>

          {/* Hiển thị tối đa 5 sản phẩm */}
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {relatedProducts.slice(0, 5).map((relatedProduct) => {
              const firstVariant = relatedProduct.variants[0];
              return (
                <div
                  className="col d-flex align-items-stretch"
                  key={relatedProduct.id}
                >
                  <div className="product-card d-flex flex-column align-items-center border position-relative">
                    <div className="product-image-container position-relative">
                      <img
                        src={`http://127.0.0.1:8000${relatedProduct.image}`}
                        alt={relatedProduct.name}
                        className="img-fluid rounded mb-3"
                        style={{
                          width: "250px",
                          height: "250px",
                          objectFit: "cover",
                          borderBottom: "1px solid #e0e0e0",
                          borderRadius: "none",
                        }}
                      />
                      <Link
                        to={`/products/${relatedProduct.id}`}
                        className="btn btn-outline-secondary hover-button"
                        style={{ fontSize: "12px", borderRadius: "20px" }}
                      >
                        XEM CHI TIẾT
                      </Link>
                    </div>
                    <div className="text-center mt-3">
                      <div className="text-md text-muted">
                        {relatedProduct.category.name}
                      </div>
                      <Link
                        to={`/products/${relatedProduct.id}`}
                        className="text-decoration-none text-dark fw-semibold d-block mt-2"
                      >
                        {relatedProduct.name}
                      </Link>
                      {firstVariant && (
                        <div className="product-pricing">
                          <del className="listed-price">
                            {formatCurrency(Number(firstVariant.listed_price))}
                          </del>
                          <span className="selling-price">
                            {formatCurrency(Number(firstVariant.selling_price))}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nút xem thêm */}
          <div className="text-center mt-4">
            <Link
              to="/products"
              className="btn btn-outline-secondary btn-lg px-3 py-1 fw-bold"
              style={{ borderRadius: "30px" }}
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
