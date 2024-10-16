import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn trang về đầu trang
    }, [pathname]); // Chạy lại mỗi khi pathname thay đổi

    return null; // Component này không hiển thị gì trên giao diện
};

export default ScrollToTop;
