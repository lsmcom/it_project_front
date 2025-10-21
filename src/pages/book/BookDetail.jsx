import React, { useState } from "react";
import "../../assets/css/book/bookDetail.css";
import rightArrowIcon from "../../assets/icons/rightArrowIcon.svg";
import { useParams } from "react-router";
import { useBook } from "../../hooks/useBook";
import { authStore } from "../../store/authStore";
import { useCart } from "../../hooks/useCart";
import { usePurchase } from "../../hooks/usePurchase";

function BookDetail(props) {
  const { bookId } = useParams();
  const { userId } = authStore();
  const { useGetBookDetail } = useBook();
  const { addCartMutation } = useCart();
  const { directPurchaseMutation } = usePurchase();

  const { data: book, isLoading, isError } = useGetBookDetail(bookId);

  const [quantity, setQuantity] = useState(1);

  if (isLoading)
    return <div className="book-detail">도서 정보를 불러오는 중...</div>;
  if (isError || !book)
    return <div className="book-detail">도서 정보를 찾을 수 없습니다.</div>;

  const formattedContent = book.description ? (
    book.description
      .split(".")
      .map((sentence, index) =>
        sentence.trim() ? <p key={index}>{sentence.trim()}.</p> : null
      )
  ) : (
    <p>도서 소개가 없습니다.</p>
  );

  //장바구니 추가
  const addCart = () => {
    if (!userId) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    const cartData = {
      userId: userId,
      bookId: book.bookId,
      quantity: quantity
    };

    addCartMutation.mutate(cartData);
  };

  //구매하기
  const buyNow = () => {
    if (!userId) return alert("로그인이 필요합니다.");
    directPurchaseMutation.mutate({ userId, bookId: book.bookId, quantity });
  };

  return (
    <div className="book-detail">
      <div className="book-detail-title">{book.bookName}</div>
      <div className="book-detail-info">
        <div className="book-detail-writer">지은이 : {book.author}</div>
        <div className="book-detail-create">
          {new Date(book.regDate).toLocaleDateString()}
        </div>
      </div>
      <div className="book-buy-box">
        <img
          className="book-detail-img"
          src={
            encodeURI(book.filePath)
              ? encodeURI(book.filePath)
              : "/default-book.jpg"
          }
          alt={book.bookName}
        />
        <div className="book-buy-group">
          <div className="book-buy-info">
            <div className="book-buy-title">가격</div>
            <div className="book-buy-content">
              {book.price.toLocaleString()}원
            </div>
          </div>
          <div className="book-buy-info">
            <div className="book-buy-title">배송료</div>
            <div className="book-buy-content">무료</div>
          </div>
          <div className="book-buy-info">
            <div className="book-buy-title">수령 예상일</div>
            <div className="book-buy-content">구매일로부터 1~2일 소요 예정</div>
          </div>
          <div className="book-buy-info">
            <div className="book-buy-title">수량</div>
            <input
              type="number"
              className="book-buy-count"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="buy-btn-box">
            <button type="button" className="btn-shop" onClick={addCart}>
              장바구니
            </button>
            <button type="button" className="btn-buy" onClick={buyNow}>
              구매하기
            </button>
          </div>
        </div>
      </div>
      <div className="book-detail-cate-box">
        <div className="book-detail-cate-name">기본 정보</div>
        <div className="book-detail-cate">
          <div className="book-detail-cate-title">주제분류</div>
          <div className="book-detail-cate-content">
            <span>{book.mainCategory || "메인카테고리 없음"}</span>
            <img
              src={rightArrowIcon}
              alt="이동 화살표"
              className="cate-right-icon"
            />
            <span>{book.subCategory || "서브카테고리 없음"}</span>
          </div>
        </div>
      </div>
      <div className="book-detail-contents">
        <div className="book-detail-cate-name">책 소개</div>
        <div className="book-detail-cate">
          <div className="book-detail-input-content">
            <div className="book-content-text">{formattedContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
