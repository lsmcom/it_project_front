import React from "react";
import "../../assets/css/main/main.css";
import { useNavigate } from "react-router";
import { useBook } from "../../hooks/useBook";
import { authStore } from "../../store/authStore";

function Main(props) {
  const navigate = useNavigate();
  const { isAuthenticated } = authStore();

  const { useGetSaleBooks, useBestSeller } = useBook();
  const { data: saleBooks, isLoading } = useGetSaleBooks();
  const { data: bestSeller } = useBestSeller();

  //도서 상세 페이지 이동
  const goBookDetail = (bookId) => {
    if (!isAuthenticated()) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return false;
    }
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="main">
      <div className="yesterday-best">
        <div className="yes-title-img">
          <span className="yesterday-title">어제의 베스트 셀러</span>
        </div>
        <div className="best-book-list">
          {bestSeller?.length > 0 ? (
            <>
              {/* 상위 2개는 큰 이미지 */}
              <div className="flex-list">
                {bestSeller.slice(0, 2).map((book, index) => (
                  <div
                    key={book.bookId}
                    className="top-book"
                    onClick={() => goBookDetail(book.bookId)}
                  >
                    <img
                      className="book-img"
                      src={encodeURI(book.filePath) || "/default-book.jpg"}
                      alt={book.bookName}
                    />
                    <span className="book-title">
                      {index + 1}. {book.bookName}
                    </span>
                  </div>
                ))}
              </div>

              {/* 나머지 8개는 grid로 */}
              <div className="grid-list">
                {bestSeller.slice(2, 10).map((book, index) => (
                  <span
                    key={book.bookId}
                    className="grid-title"
                    onClick={() => goBookDetail(book.bookId)}
                  >
                    {index + 3}. {book.bookName}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="no-book">베스트셀러 데이터가 없습니다.</div>
          )}
        </div>
      </div>
      <div className="sale-best">
        <span className="sale-title">이번주 특가 도서</span>
        {isLoading && <p>도서를 불러오는 중...</p>}
        <div className="sale-grid">
          {saleBooks && saleBooks.length > 0
            ? saleBooks.map((book) => (
                <div
                  key={book.bookId}
                  className="sale-list"
                  onClick={() => goBookDetail(book.bookId)}
                >
                  <div className="sale-book">
                    <img
                      src={
                        encodeURI(book.filePath)
                          ? encodeURI(book.filePath)
                          : "/default-book.jpg"
                      }
                      alt={book.bookName}
                      className="sale-img"
                    />
                    <div className="sale-title">{book.bookName}</div>
                    <div className="sale-price">
                      {book.price.toLocaleString()}원
                    </div>
                  </div>
                </div>
              ))
            : !isLoading && <p>특가 도서가 없습니다.</p>}
        </div>
      </div>
    </div>
  );
}

export default Main;
