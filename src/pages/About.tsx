import React from 'react';
import '../css/About.css'; // Đảm bảo bạn tạo và nhập file CSS

const About = () => {
  return (
    <div className="about-us-container">
        <hr className="horizontal-divider" aria-hidden="true" />
        <h2 className="about-us-heading">VỀ CHÚNG TÔI</h2>
        <hr className="horizontal-divider" aria-hidden="true" />
        <div ><p className='about-gemstone'>Đến với Gemstone, trang sức không chỉ là một phụ kiện – nó còn mang một ý nghĩa lớn lao hơn rất nhiều. Thông qua đồ trang sức, chúng ta có khả năng không chỉ cá nhân hóa vẻ ngoài mà còn khơi gợi cảm xúc và tạo ra những kỷ niệm đẹp đáng nhớ. Đây chính là lý do mà Gemstone được hình thành. Chúng tôi tạo ra đồ trang sức thủ công, cao cấp thể hiện cả con người bạn và những gì bạn đại diện. Trang sức là hiện thân của niềm đam mê, tình yêu của chúng tôi, và cuối cùng, là món quà của Gemstone dành cho bạn.</p>
        </div>
        <section className="handmade-section">
    <div className="handmade-content">
        <h2 className="handmade-title">Gemstone đồ trang sức đá quý</h2>
        <p className="handmade-description">
            Được thiết kế và làm bởi những nghệ nhân hàng đầu tại studio hiện đại của chúng tôi, mỗi tác phẩm tuyệt đẹp đều được làm theo yêu cầu để trở nên độc đáo và chân thực như <br/> chính bạn. Đó là lý do tại sao Gemstone luôn đặt chất lượng và quan trọng hơn là bạn – lên hàng đầu.
        </p>
    </div>
</section>
<section className="custom-jewelry-container">
  <div className="custom-jewelry-content">
    <div className="text-column">
      <div className="text-wrapper">
        <h2 className="section-heading">Bạn có thể tự tạo nét đẹp cho <br/> riêng mình</h2>
        <p className="section-description">
          Do phương pháp tiếp cận theo yêu cầu riêng của chúng tôi, mỗi <br/>
          thiết kế đều được mang một nét riêng để gợi lên sự kết nối cảm <br/>
          xúc đồng thời đảm bảo rằng đó là sự đại diện của bất kỳ ai đang <br/>
          đeo nó. Từ truyền thống đến hiện tại, chúng tôi cung cấp vô số <br/>
          lựa chọn trang sức với mức giá phù hợp để đáp ứng nhu cầu và <br/>
          thị hiếu của tất cả mọi người.
        </p>
      </div>
    </div>
    <div className="image-column">
      <div className="image-background">
        <div className="image-wrapper">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/32bf8bd31ac79ab85d0f0569ff4c0f5a522f9448d7a72599780b64530a120c2f?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" alt="Custom jewelry design showcase" className="jewelry-image" loading="lazy"/>
        </div>
      </div>
    </div>
  </div>
</section>
<section className="eco-friendly-section">
  <div className="content-wrapper">
    <div className="image-column">
      <div className="image-background">
        <div className="image-container">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/326305a85276757cb3ebaf6ec708e71ab8a8802ae29373efe07a058e5e60ea41?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" alt="Eco-friendly materials used in Gemstone products" className="eco-friendly-image" loading="lazy"/>
        </div>
      </div>
    </div>
    <div className="text-column">
      <div className="text-content">
        <h2 className="section-title">Vật liệu thân thiện với môi trường <br/> và chất lượng cao</h2>
        <p className="section-description">
          Hơn nữa, chúng tôi cực kỳ tự hào về nghề thủ công của mình và do đó, <br/>
          việc sử dụng các vật liệu có ý thức về môi trường cũng quan trọng như sản <br/>
          phẩm cuối cùng. Mỗi sản phẩm của Gemstone đều được phát triển chu đáo từ <br/>
          đầu đến cuối để bạn có thể cảm thấy thoải mái, tự tin khi mua hàng.
        </p>
      </div>
    </div>
  </div>
</section>
<section className="mission-container">
  <div className="mission-content">
    <div className="mission-text-column">
      <div className="mission-text-wrapper">
        <h2 className="mission-title">Nhiệm vụ của chúng tôi</h2>
        <p className="mission-description">
          Đội ngũ các nhà thiết kế và thợ thủ công tài năng của chúng tôi
          làm việc song song để mang từng sáng tạo trở nên sống động – từ
          trái tim của chúng tôi đến trái tim của bạn, chúng tôi hứa sẽ tiếp
          tục tạo ra những bộ sưu tập trang sức vượt trội hàng ngày đến
          những dịp đặc biệt để đem đến cho bạn những sản phẩm trang
          sức tốt nhất hiện nay.
        </p>
      </div>
    </div>
    <div className="mission-image-column">
      <div className="mission-image-background">
        <div className="mission-image-wrapper">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/576df1ae1009c5fd15ac9c21cbab8bee2590553c68a84fd4cccbb4dc053f5769?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" className="mission-image" alt="Mission illustration" />
        </div>
      </div>
    </div>
  </div>
</section>
<section className="features-container">
  <div className="features-grid">
    <article className="feature-item">
      <div className="feature-icon-wrapper">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/79a8937eb7a81864ffa3306eb855534f5831b1c5e0d550920ccc4b02e889a198?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" className="feature-icon" alt="Customer satisfaction icon" />
      </div>
      <h3 className="feature-title">KHÁCH HÀNG HÀI LÒNG</h3>
      <p className="feature-description">Đặt sự hài lòng của khách hàng là ưu tiên số 1 <br /> trong mọi suy nghĩ hành động</p>
    </article>

    <article className="feature-item">
      <div className="feature-icon-wrapper">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/7dae55f5657c34ab88f7a85b9a0b659f0b13e254c6c9763e3b2f72310f39bddb?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" className="feature-icon" alt="Premium quality icon" />
      </div>
      <h3 className="feature-title">CHẤT LƯỢNG CAO CẤP</h3>
      <p className="feature-description">Mọi sản phẩm đều được thiết kế và chế tác bởi các <br /> nghệ nhân hàng đầu</p>
    </article>

    <article className="feature-item">
      <div className="feature-icon-wrapper">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/e1a20d0f898550cf6c77389a6bcee92609fc2c38c7766803c1b6951340b08ff9?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" className="feature-icon" alt="Easy return icon" />
      </div>
      <h3 className="feature-title">ĐỔI TRẢ DỄ DÀNG</h3>
      <p className="feature-description">Đổi trả sản phẩm trong vòng 10 ngày. Hoàn tiền <br /> nếu không hài lòng</p>
    </article>

    <article className="feature-item">
      <div className="feature-icon-wrapper">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/389b58f7d258afc6c7a204c5f7b8117f16cdcd63940cb7c5050664db99c734ed?placeholderIfAbsent=true&apiKey=96b70dd57e0843dd84b538770e59ca4a" className="feature-icon" alt="Enthusiastic support icon" />
      </div>
      <h3 className="feature-title">HỖ TRỢ NHIỆT TÌNH</h3>
      <p className="feature-description">Tất cả câu hỏi đều được các chuyên viên của Gemstone tư <br /> vấn, giải đáp kỹ càng</p>
    </article>
  </div>
</section>
    </div>
  );
};

export default About;
