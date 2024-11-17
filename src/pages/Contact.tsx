import "../css/Contact.css"
const Contact = () => {
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
                    <h2 className="form-title">Gửi tin nhắn cho chúng tôi</h2>
                    <form>
                        <input type="text" placeholder="Họ và Tên" className="form-input" />
                        <input type="email" placeholder="Email" className="form-input" />
                        <input type="tel" placeholder="Số điện thoại" className="form-input" />
                        <textarea
                            placeholder="Nội dung tin nhắn"
                            className="form-textarea"
                        ></textarea>
                        <button type="submit" className="form-button">
                            Gửi ngay
                        </button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Contact