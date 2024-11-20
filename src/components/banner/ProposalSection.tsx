import React from "react";
import { Link } from "react-router-dom";

const ProposalSection: React.FC = () => {
  return (
    <section className="d-flex position-relative flex-column align-items-start px-5 py-5 mt-5 text-dark min-vh-100">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c54a4acebb84dc043dfd85a41117497ee090c188c1b53bafa6094b6dd79a12e?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a"
        alt="Background image"
        className="img-fluid position-absolute"
        style={{ width: "100%", height: "80%", objectFit: "cover", inset: 0 }}
      />
      <h2 className="position-relative display-4 fw-medium">
        Một lời đề nghị không thể nào quên
      </h2>
      <p className="position-relative mt-3">
        Những chi tiết quyến rũ và những chiếc nhẫn phù hợp - chúng tôi <br />
        có những chiếc nhẫn hoàn hảo để khẳng định phong cách của bạn.
      </p>
      <Link to="/products">
      <button className="position-relative px-4 py-2 mt-3 mb-0 fw-bold btn btn-light">
        KHÁM PHÁ NGAY CÁC SẢN PHẨM
      </button>
      </Link>
    </section>
  );
};

export default ProposalSection;
