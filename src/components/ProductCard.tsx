import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: number;
  name: string;
  discountAmount: number;
  minOrderValue: number;
  expiryDate: string;
}

interface ProductCardProps {
  product: Product;
  onSave: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSave }) => {
  return (
    <div className="card h-100 text-center">
      <div className="card-body d-flex flex-column">
        <p className="card-text">
          <strong>{product.name} - Giảm:</strong> {product.discountAmount} VNĐ
        </p>
        <p className="card-text">
          <strong>Đơn hàng tối thiểu:</strong> {product.minOrderValue} VNĐ
        </p>
        <p className="card-text">
          <strong>Hết hạn:</strong> {product.expiryDate}
        </p>
        <button 
          className="btn btn-primary mt-auto mx-auto" 
          onClick={() => onSave(product)}
        >
          Lưu
        </button>
      </div>
    </div>
  );
};

export default ProductCard;