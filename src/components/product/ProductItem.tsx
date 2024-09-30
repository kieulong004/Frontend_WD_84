import React from "react";

interface ProductItemProps {
  image: string;
  name: string;
  price: string;
}

const ProductItem: React.FC<ProductItemProps> = ({ image, name, price }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <img
        loading="lazy"
        src={image}
        alt={name}
        className="img-fluid rounded mb-3"
        style={{ width: "250px", height: "250px", objectFit: "contain" }}
      />
      <div className="mt-2 text-lg fw-semibold text-center">{name}</div>
      <div className="text-danger fw-bold fs-5">{price}</div>
      <button className="btn btn-warning d-flex align-items-center gap-2 px-4 py-2 mt-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/498499fffcbae56c71f0ed115451d65a1c63ef7893bfbe0262f70e5f48fb8aa8?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a"
          alt="Thêm vào giỏ hàng"
          className="img-fluid"
          style={{ width: "30px", height: "30px" }}
        />
        <span className="flex-grow-1">Thêm vào giỏ hàng</span>
      </button>
    </div>
  );
};

export default ProductItem;
