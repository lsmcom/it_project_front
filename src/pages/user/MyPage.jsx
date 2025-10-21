import React from 'react';
import '../../assets/css/user/myPage.css';
import rightArrowIcon from '../../assets/icons/rightArrowIcon.svg';
import { useNavigate } from 'react-router';
import { authStore } from '../../store/authStore';
import { usePurchase } from '../../hooks/usePurchase';

function MyPage(props) {

    const navigate = useNavigate();
    const { userName, userId, clearAuth } = authStore();
    const { useGetPurchaseCount } = usePurchase();

    // 구매 횟수 조회
    const { data } = useGetPurchaseCount(userId);
    const purchaseCount = data?.data || 0;

    //로그아웃
    const logout = () => {
        if (window.confirm('로그아웃 하시겠습니까?')) {
            clearAuth();
            navigate('/');
        }
    };

    return (
        <div className='myPage'>
            <div className="user-info-name">
                {userName}님
            </div>
            <div className="user-info-buy">
                상품구매 {purchaseCount}회
            </div>
            <div className="user-navigate-box">
                <div className="user-navigate-title">
                    주문/배송목록
                </div>
                <img src={rightArrowIcon} alt="이동 화살표" 
                    className='user-navigate-icon'
                />
            </div>
            <div className="user-navigate-box" onClick={() => navigate('/myPage/myOrder')}>
                <div className="user-navigate-title">
                    구매목록
                </div>
                <img src={rightArrowIcon} alt="이동 화살표" 
                    className='user-navigate-icon'
                />
            </div>
            <div className="user-navigate-box">
                <div className="user-navigate-title"
                    onClick={logout}
                >
                    로그아웃
                </div>
                <img src={rightArrowIcon} alt="이동 화살표" 
                    className='user-navigate-icon'
                />
            </div>
            <div className="user-navigate-box"
                onClick={() => navigate('/myPage/edit')}
            >
                <div className="user-navigate-title">
                    회원정보 관리
                </div>
                <img src={rightArrowIcon} alt="이동 화살표" 
                    className='user-navigate-icon'
                />
            </div>
            <div className="user-navigate-box"
                onClick={() => navigate('/myPage/withdraw')}
            >
                <div className="user-navigate-title">
                    회원탈퇴
                </div>
                <img src={rightArrowIcon} alt="이동 화살표" 
                    className='user-navigate-icon'
                />
            </div>
        </div>
    );
}

export default MyPage;