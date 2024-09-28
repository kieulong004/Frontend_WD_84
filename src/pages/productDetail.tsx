import {
    Icon21,
    Icon22,
    Icon23,
    Icon24,
    ImageDescriptionA,
    ImageDescriptionB,
    ImageDescriptionC,
    ImageDescriptionD,
    ImageDetailIcon,
  } from "@/components/icons";
  
  const ProductDetail = () => {
    return (
      <div>
        <section className="detail py-5 border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-md-7">
                <img
                  src={ImageDetailIcon}
                  alt="Main product image"
                  className="img-fluid mb-3"
                  style={{width:"100%"}}
                />
                <div className="d-flex">
                  <div className="me-2">
                    <img
                      src={ImageDescriptionA}
                      alt="Thumbnail A"
                      className="img-fluid"
                    />
                  </div>
                  <div className="me-2">
                    <img
                      src={ImageDescriptionB}
                      alt="Thumbnail B"
                      className="img-fluid"
                    />
                  </div>
                  <div className="me-2">
                    <img
                      src={ImageDescriptionC}
                      alt="Thumbnail C"
                      className="img-fluid"
                    />
                  </div>
                  <div>
                    <img
                      src={ImageDescriptionD}
                      alt="Thumbnail D"
                      className="img-fluid"
                    />
                  </div>
                </div>
              </div>
  
              <div className="col-md-5 px-4">
                <h1>Asgaard sofa</h1>
                <p className="text-muted py-2">
                  <del>30.000.000đ</del>
                  <span className="text-dark ms-3">25.000.000đ</span>
                </p>
                <p>Description of the product here.</p>
  
                <div className="d-flex align-items-center mb-3 py-2">
                  <label htmlFor="sizes" className="me-2 fw-bold">
                    Size:
                  </label>
                  <div className="d-flex">
                    <div className="size-item detail-item-color detail-item-blue text-white d-flex align-items-center justify-content-center me-2">
                      S
                    </div>
                    <div className="size-item detail-item-color detail-item-black text-white d-flex align-items-center justify-content-center me-2">
                      M
                    </div>
                    <div className="size-item detail-item-color detail-item-brown text-white d-flex align-items-center justify-content-center">
                      L
                    </div>
                  </div>
                </div>
  
                <div className="input-group mb-3" style={{ width: "150px" }}>
                  <button className="btn btn-outline-secondary" type="button">
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    defaultValue={1}
                    min={1}
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    +
                  </button>
                </div>
  
                <div className="d-flex mb-3">
                  <button className="btn btn-dark w-100">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
  
        <section className="Related py-5">
          <div className="container">
            <div className="section-heading text-center mb-4">
              <h2 className="section-heading__title">Related Products</h2>
            </div>
            <div className="section-body">
              <div className="row">
                {[
                  { src: Icon21, name: "Syltherine", category: "Stylish cafe chair", price: "2.500.000đ", oldPrice: "3.500.000đ" },
                  { src: Icon22, name: "Syltherine", category: "Stylish cafe chair", price: "2.500.000đ", oldPrice: "3.500.000đ" },
                  { src: Icon23, name: "Syltherine", category: "Stylish cafe chair", price: "2.500.000đ", oldPrice: "3.500.000đ" },
                  { src: Icon24, name: "Syltherine", category: "Stylish cafe chair", price: "2.500.000đ", oldPrice: "3.500.000đ" },
                ].map((product, index) => (
                  <div className="col-md-3 mb-4" key={index}>
                    <div className="card">
                      <img src={product.src} alt="#" className="card-img-top" />
                      <div className="card-body">
                        <h5 className="my-2">
                          <a href="#" className=" text-decoration-none text-dark">{product.name}</a>
                        </h5>
                        <p className="product__category">{product.category}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <del className="text-muted">{product.oldPrice}</del>
                          <span className="text-dark font-weight-bold">{product.price}</span>
                        </div>
                        <div className="text-center mt-2 w-100">
                        <button className="btn btn-outline-dark  w-100 mt-4">
                          <i className="bi bi-cart fill"></i> Thêm vào giỏ hàng
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* End .product-item */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default ProductDetail;
  