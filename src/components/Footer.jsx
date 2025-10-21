import React from 'react';
import '../assets/css/footer.css';

function Footer(props) {
    return (
        <>
            <div className="footer-line"></div>
            <div className='footer'>
                <div className="footer-title">
                    온라인 서점
                </div>
                <nav className="footer-nav1">
                    <span>대표이사 : 홍길동</span>
                    <span>서울특별시 종로구 종로1</span>
                    <span>사업자 등록번호 : 102-11-11111</span>
                </nav>
                <nav className="footer-nav1">
                    <span>대표전화 : 1544-1111</span>
                    <span>FAX : 0502-987-1111</span>
                    <span>서울특별시 통신판매업신고번호 : 제 111호</span>
                </nav>
            </div>
        </>
    );
}

export default Footer;