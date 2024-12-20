import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { getUser } from "@/components/utils";
import "bootstrap/dist/css/bootstrap.min.css";

// Định nghĩa type cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  image: string; // Đường dẫn ảnh của sản phẩm
};

// Định nghĩa type cho biến thể
type Variant = {
  id: number;
  weight: {
    weight: string;
    unit: string;
  };
  size?: string; // Nếu có kích thước
};

// Định nghĩa type cho sản phẩm trong giỏ hàng
type CartItem = {
  id: number;
  product: Product; // Thông tin sản phẩm chi tiết
  quantity: number;
  price: number;
  variant?: Variant; // Biến thể sản phẩm (nếu có)
};

// Định nghĩa type cho phản hồi từ API
type CartResponse = {
  status: boolean;
  message: string;
  cart_items: CartItem[];
};

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const userFromStorage = getUser();
  const userId = userFromStorage.id;

  useEffect(() => {
    document.title = "Giỏ hàng";
  }, []);
  useEffect(() => {
    const fetchCartItems = async () => {
        try {
          setLoading(true);
          const response = await axios.get<CartResponse>(
            `http://localhost:8000/api/carts/cart-list/${userId}`
          );
          if (response.data.status) {
            const validCartItems = response.data.cart_items.filter(
              (item) => item.product !== null
            );
            setCartItems(validCartItems);
            const total = validCartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            setTotalPrice(total);
          } else {
            console.error(response.data.message);
          }
        } catch (error) {
          console.error("Không có sản phẩm nào.");
        } finally {
          setLoading(false);
        }
      }

    fetchCartItems();
  }, [userId]);
console.log(cartItems);
  // Hàm xử lý khi thay đổi số lượng sản phẩm
  const handleQuantityChange = async (
    cartItemId: number,
    newQuantity: number
  ) => {
    try {
      await axios.post(`http://localhost:8000/api/carts/update-quantity`, {
        cart_id: cartItemId,
        quantity: newQuantity,
      });
      // Cập nhật số lượng sản phẩm trong trạng thái
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: newQuantity } : item
        )
      );
      // Cập nhật tổng tiền ngay lập tức
      const updatedTotal = cartItems.reduce(
        (acc, item) =>
          acc +
          item.price * (item.id === cartItemId ? newQuantity : item.quantity),
        0
      );
      setTotalPrice(updatedTotal);
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Đã vượt quá số lượng hàng còn lại.", {
        autoClose: 2000,
      });
    }
  };

  // Hàm xử lý khi xóa sản phẩm khỏi giỏ hàng
  const handleDeleteItem = async (cartId: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/carts/delete-cart/${cartId}`
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.id !== cartId)
        );
        setTotalPrice(
          (prevTotal) =>
            prevTotal -
            cartItems.find((item) => item.id === cartId)!.price *
            cartItems.find((item) => item.id === cartId)!.quantity
        );
      } else {
        toast.error("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.");
    }
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {cartItems.length > 0 && <h2 className="mb-4 text-center">Giỏ hàng của bạn</h2>}
      {cartItems.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-secondary p-5 border border-light">
            <h4 className="mb-3 text-primary">Giỏ hàng của bạn đang trống</h4>
            <p className="mb-4">Khám phá thêm những sản phẩm tuyệt vời và thêm vào giỏ hàng để nhận nhiều ưu đãi đặc biệt.</p>
            <Link to="/products" className="btn btn-success btn-lg">
              <i className="bi bi-cart-plus me-2"></i>Tiếp tục mua hàng
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded">
            <table className="table table-bordered text-center">
              <thead className="table-dark">
          <tr>
            <th scope="col">Sản phẩm</th>
            <th scope="col">Kích thước</th>
            <th scope="col">Số lượng</th>
            <th scope="col">Tổng</th>
            <th scope="col">Hành động</th>
          </tr>
              </thead>
              <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="align-middle">
              <td>
                <div className="d-flex align-items-center">
            <img
              src={`http://127.0.0.1:8000${item.product.image}`}
              alt={item.product.name}
              className="img-fluid rounded shadow-sm"
              style={{
                width: "80px",
                height: "80px",
                marginRight: "10px",
                objectFit: "cover",
              }}
            />
            <div className="text-left fw-bold">
              <p className="mb-1">{item.product.name}</p>
            </div>
                </div>
              </td>
              <td className="fw-bold">
                {item.variant && item.variant.weight
            ? `${item.variant.weight.weight} ${item.variant.weight.unit}`
            : "Không có trọng lượng"}
              </td>
              <td>
                <div
            className="input-group"
            style={{ maxWidth: "150px", margin: "0 auto" }}
                >
            <button
              className="btn btn-outline-secondary btn-sm fw"
              type="button"
              onClick={() =>
                handleQuantityChange(
                  item.id,
                  Math.max(1, item.quantity - 1)
                )
              }
            >
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="form-control text-center"
              value={item.quantity}
              min="1"
              readOnly
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              onClick={() =>
                handleQuantityChange(item.id, item.quantity + 1)
              }
            >
              <i className="bi bi-plus"></i>
            </button>
                </div>
              </td>
              <td className="fw-bold">
                {formatCurrency(Number(item.price * item.quantity))}
              </td>
              <td>
                <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteItem(item.id)}
                >
            <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 p-4 border rounded shadow-sm">
            <h4 className="mb-0">Tổng tiền:</h4>
            <h4 className="text-danger fw-bold mb-0">
              {formatCurrency(Number(totalPrice))}
            </h4>
          </div>
          <div className="mt-4 text-center">
            <Link to={`/products/pay`} className="btn btn-dark w-100 btn-lg shadow-sm">
              <i className="bi bi-credit-card-fill me-2"></i>Tiến hành thanh toán
            </Link>
          </div>
        </>
      )}
<ToastContainer/>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex align-items-center">
          <i
            className="bi bi-x-circle-fill text-danger me-2"
            style={{ fontSize: "24px" }}
          ></i>
          <p className="mb-0">Sản phẩm đã được xóa khỏi giỏ hàng!</p>
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
    </div>
  );
};

export default CartPage;
