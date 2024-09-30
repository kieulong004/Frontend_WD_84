import React from "react";
import { Link } from "react-router-dom";

interface CategoryItemProps {
  image: string;
  title: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ image, title }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column text-center fs-5 text-dark mt-3">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="img-fluid rounded-circle"
          style={{
            objectFit: "contain",
            aspectRatio: "1",
            width: "200px",
            height: "200px",
          }}
        />
        <Link
          className="text-decoration-none"
          to={`/category/${title.toLowerCase()}`}
        >
          <div className="text-muted" style={{ fontSize: "1.5rem" }}>
            {title}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategoryItem;
