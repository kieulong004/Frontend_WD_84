import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { blogImage } from './icons';

const BlogProduct: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <img className="img-fluid rounded" src={blogImage} alt="Blog" />
        </div>
        <div className="col-md-6">
          <h1 className="blog-title">Khám phá vẻ đẹp của trang sức Gemstones đính kim cương</h1>
          <p className="blog-content">
            Mỗi sản phẩm chúng tôi gửi đi đều được đóng gói trong bao bì Gemstones đặc trưng của chúng tôi. Nhẫn đính hôn được đựng trong hộp nhẫn sang trọng bên trong hộp trình bày thanh lịch, sẵn sàng cho lời cầu hôn của bạn. Hộp trình bày cũng bảo vệ giấy chứng nhận thẩm định và báo cáo phân loại kim cương của bạn. Kim cương rời được đựng trong hộp kim cương lót nhung, giữ chặt viên đá.
          </p>
          <h2 className="blog-subtitle mb-2 text-muted">Tại sao nên chọn trang sức Gemstones?</h2>
          <p className="blog-content">
            Sự quyến rũ của trang sức Gemstones đính kim cương nằm ở độ sáng chói vô song và sức hấp dẫn vượt thời gian của chúng. Cho dù bạn đang tìm kiếm nhẫn đính hôn, vòng cổ statement hay một đôi bông tai thanh lịch, những loại đá quý này đều mang đến nét tinh tế và quyến rũ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogProduct;