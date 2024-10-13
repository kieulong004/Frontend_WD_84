import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


interface Product {
  id: number;
  image: string;
  name: string;
  price: string;
  categoryId:number
  category: {
    id: number;
    name: string;
  };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${id}?_expand=category`
        );
        console.log("Dữ liệu trả về từ API:", response.data);
        setProducts(response.data);
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
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  if (!products) {
    return <div className="text-center py-4">No product found</div>;
  }
console.log(products)
  return (
    <div>
      <section className="detail py-5 border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <img
                src={products?.image}
                alt={products?.name}
                className="img-fluid mb-3"
                style={{ width: "100%",border:"1px solid #000" }}
              />
            </div>

            <div className="col-md-5 px-4">
              <h1>{products.name}</h1>
              <p className="text-muted py-2">
                <del>{products.price}</del>
                <span className="text-dark ms-3">25.000.000đ</span>
              </p>
              <p>{products?.category?.name}</p>

              <div className="d-flex align-items-center mb-3 py-2">
                <label htmlFor="sizes" className="me-2 fw-bold">
                  Size:
                </label>
                <div className="d-flex">
                  {/* Size options */}
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
                <button className="btn btn-dark w-100">Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <RelatedProduct productId = {products.id} categoryId={products.categoryId} />
    </div>
  );
};

export default ProductDetail;
