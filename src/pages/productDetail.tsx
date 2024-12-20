import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { getUser } from "@/components/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkAuthorizations } from "@/components/authUtils";
import { IoStar } from "react-icons/io5";
// @ts-ignore
import he from "he";

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
type Comment = {
  id: number;
  content: string;
  rating: number;
  created_at: string;
  user: {
    id: number;
    name: string;
  };
  variant: {
    id: number;
    name: string | null;
    weight: {
      weight: number;
      unit: string;
    }
  };
};


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const userFromStorage = getUser();
  const userId = userFromStorage?.id;

  useEffect(() => {
    document.title = "Chi tiết sản phẩm";
  }, []);
  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/product/product-detail/${id}`
        );
        console.log(data)
        if (data.data.product) {
          setProduct(data.data.product);
          setRelatedProducts(data.data.relatedProducts);
          setVariants(data.data.variants);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
          // Sản phẩm không tồn tại, tạo sản phẩm mẫu
          setProduct({
            id: 0,
            category_id: 0,
            sku: "N/A",
            name: "Sản phẩm không tồn tại",
            image: "https://via.placeholder.com/250",
            description: "Sản phẩm không tồn tại.",
            created_at: "",
            updated_at: "",
            category: {
              id: 0,
              name: "N/A",
              created_at: "",
              updated_at: "",
            },
            variants: [],
          });
          setVariants([]);
          setRelatedProducts([]);
      }
    };
    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  useEffect(() => {
    const fetchCommentProductDetail = async () => {
      try {
        const { data } = await axios.post(
          `http://localhost:8000/api/comments/getAllCommentsForProduct`,
          { product_id: id }
        );
        const sortedComments = (data.data as any[])
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3); // Chỉ lấy 3 đánh giá mới nhất
        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching product comments:", error);
      }
    };

    if (id) {
      fetchCommentProductDetail();
    }
  }, [id]);

  const handleAddToCart = async () => {
    if (!checkAuthorizations(navigate)) return;
    if (!selectedVariant) {
      setShowWarning(true);
      return;
    }

    if (selectedVariant.quantity === 0) {
      toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.", {
        autoClose: 1000,
      });
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
      toast.error("Đã vượt quá số lượng hàng còn lại.");
    }
  };

  const handleBuyNow = async () => {
    if (!checkAuthorizations(navigate)) return;
    if (!selectedVariant) {
      setShowWarning(true);
      return;
    }

    if (selectedVariant.quantity === 0) {
      toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.", {
        autoClose: 1000,
      });
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
  const prouctsDescription = he.decode(product?.description || "");
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
              <p
                className="product-description lead mb-2 text-muted"
                style={{
                  lineHeight: "1.6",
                  textAlign: "justify",
                  textJustify: "inter-word",
                }}
              >
                {prouctsDescription}
              </p>

              {variants.length > 0 && (
                <>
                  <p className="text-muted py-2">
                    <del className="me-5 fw-bold">
                      {formatCurrency(
                        Number(
                          selectedVariant
                            ? selectedVariant.listed_price
                            : variants[0].listed_price
                        )
                      )}
                    </del>
                    <span className="text-danger ms-3 h6 fw-bold">
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
                                  toast.error("Sản phẩm này hiện đã hết hàng và không thể mua được.", {
                                    autoClose: 1000,
                                  });
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

      {/* Hiển thị đánh giá */}
      <div className="existing-comments mt-4 container" style={{ maxWidth: "800px", textAlign: "left", marginLeft: "20px" }}>
        <h4 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>Đánh giá của khách hàng về sản phẩm</h4>
        <div className="comments-list" style={{ marginLeft: "20px" }}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="product-comments mb-4 p-3">
                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                  <img
                    src="../../src/components/image/user.png"
                    alt="Avatar"
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{comment.user?.name || "Không xác định"}</p>
                    <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>{new Date(comment.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <p style={{ marginBottom: "8px" }}>
                  {[...Array(5)].map((_, i) => (
                    <IoStar
                      key={i}
                      size={20}
                      color={i < comment.rating ? "#ffc107" : "#e4e5e9"}
                      style={{ marginRight: "2px" }}
                    />
                  ))}
                </p>
                <p style={{ marginBottom: "10px", fontSize: "1rem" }}>
                  <strong>Nội dung:</strong> {comment.content}
                </p>
                <p style={{ marginBottom: "10px", fontSize: "0.9rem", color: "#555" }}>
                  <strong>Kích thước:</strong> {comment.variant?.weight ? `${comment.variant.weight.weight} ${comment.variant.weight.unit}` : "Không xác định"}
                </p>
                <div className="separator" style={{ borderBottom: '1px solid #e0e0e0', width: '100%', margin: '0 auto' }}></div>
              </div>
            ))
          ) : (
            <p style={{ color: "#555", fontSize: "1rem" }}>Chưa có đánh giá nào</p>
          )}
        </div>
      </div>


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
        <div className="p-4">
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
