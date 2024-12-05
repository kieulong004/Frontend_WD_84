import { useEffect } from "react";
import "../css/Contact.css"
const Contact = () => {
    useEffect(() => {
        document.title = "Liên hệ";
      }, []);
    return (
        <div className="contact-page">
            {/* Phần tiêu đề */}
            <div className="contact-header">
                <h1 className="contact-title">Gemstone</h1>
                <p className="contact-subtitle">
                    Nơi hội tụ vẻ đẹp tinh hoa của những món trang sức hoàn hảo
                </p>
            </div>

            {/* Nội dung chính */}
            <div className="contact-content">
                {/* Hình ảnh hoặc thông điệp thương hiệu */}
                <div className="contact-image">
                    <img
                        src="../../src/components/image/contact-avt.png "
                        alt="Luxury Jewelry"
                        className="image"
                    />
                    <p className="image-description">
                        "Khám phá bộ sưu tập trang sức lấp lánh, đẳng cấp dành riêng cho bạn"
                    </p>
                </div>

                {/* Form liên hệ */}
                <div className="contact-form">
                    <h2 className="form-title">Hỗ trợ khách hàng 24/7</h2>
                    <div className="contact-item">
                        <h3 className="contact-label">Số điện thoại:</h3>
                        <p className="contact-detail">
                            <a href="tel:+84387732069" className="contact-link">+84 38 773 2069</a>
                        </p>
                    </div>
                    <div className="contact-item">
                        <h3 className="contact-label">Email:</h3>
                        <p className="contact-detail">
                            <a href="mailto:support@gemstone.com" className="contact-link">gemstonetrangsuc@gmail.com</a>
                        </p>
                    </div>
                    <div className="contact-item">
                        <h3 className="contact-label">Facebook:</h3>
                        <p className="contact-detail">
                            <a href="https://www.facebook.com/gemstonetrangsuc" target="_blank" rel="noopener noreferrer" className="contact-link">Facebook của chúng tôi</a>
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Contact