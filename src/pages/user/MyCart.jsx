import React from 'react';
import '../../assets/css/user/MyCart.css';
import noShopList from '../../assets/icons/noShopList.svg';
import { authStore } from '../../store/authStore';
import { useCart } from '../../hooks/useCart';
import { usePurchase } from '../../hooks/usePurchase';

function MyShop(props) {

    const { userId } = authStore();
    const { useGetCartList, deleteCartMutation, updateQuantityMutation } = useCart();
    const { purchaseFromCartMutation } = usePurchase();

    // 장바구니 조회
    const { data: response } = useGetCartList(userId);
    const cartList = response?.data || []; //실제 배열만 추출

    // 총 가격 계산
    const totalPrice = cartList.reduce(
        (acc, item) => acc + item.bookPrice * item.quantity,
        0
    );

    //상품 삭제
    const handleDelete = (cartId) => {
        if (window.confirm("선택한 상품을 장바구니에서 삭제하시겠습니까?")) {
            deleteCartMutation.mutate(cartId);
        }
    };

    //구매 수량 변경
    const handleQuantityChange = (cartId, quantity) => {
        if (quantity < 1) return;
        updateQuantityMutation.mutate({ cartId, quantity });
    };

    //장바구니에 구매
    const purchase = () => {
        if (!userId) return alert("로그인이 필요합니다.");
        purchaseFromCartMutation.mutate(userId);
    };

    return (
        <div className='myCart'>
            <div className="cart-box">
                {/* 🛒 장바구니가 비었을 때 */}
                {(!cartList || cartList.length === 0) ? (
                    <div className="no-cart-list">
                        <img src={noShopList} alt="장바구니 상품 없음" className='no-cart-icon'/>
                        <div className="no-msg-main">장바구니에 담긴 도서가 없습니다.</div>
                        <div className="no-msg-sub">마음에 드는 도서를 담아보세요.</div>
                    </div>
                ) : (
                    <>
                        {/* 🏷️ 장바구니 목록 */}
                        <div className="cart-list">
                            {cartList.map((item) => (
                                <div className="cart-item" key={item.cartId}>
                                    <img
                                        className='cart-item-img'
                                        src={item.filePath || '/default-book.jpg'}
                                        alt={item.bookName}
                                    />
                                    <div className='cart-item-info'>
                                        <div className="cart-item-title">{item.bookName}</div>
                                        <div className="cart-item-author">{item.author}</div>
                                        <div className="cart-item-price">{item.price.toLocaleString()}원</div>
                                    </div>
                                    <div className='cart-item-quantity'>
                                        <button onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}>-</button>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.cartId, Number(e.target.value))}
                                        />
                                        <button onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}>+</button>
                                    </div>
                                    <button
                                        className='cart-item-delete'
                                        onClick={() => handleDelete(item.cartId)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* 💰 결제 요약 박스 */}
                        <div className="cart-buy-box">
                            <div className="cart-buy-box-info">
                                <div className="cart-buy-box-title">가격</div>
                                <div className="cart-buy-box-content">{totalPrice.toLocaleString()}원</div>
                            </div>
                            <div className="cart-buy-box-info">
                                <div className="cart-buy-box-title">배송료</div>
                                <div className="cart-buy-box-content">무료</div>
                            </div>
                            <div className="cart-buy-box-line"></div>
                            <button type='button' className='cart-buy-btn' onClick={purchase}>
                                구매하기
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyShop;