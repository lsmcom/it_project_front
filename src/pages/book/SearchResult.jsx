import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBook } from "../../hooks/useBook";
import "../../assets/css/book/searchResult.css";

function SearchResult() {
  const [params] = useSearchParams();
  const keyword = params.get("keyword");
  const { useSearchBooks } = useBook();
  const { data } = useSearchBooks(keyword);
  const navigate = useNavigate();

  const books = data?.data || [];

  const goBookDetail = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="search-result">
      <h2>
        "{keyword}" 검색 결과 ({books.length}건)
      </h2>
      {books.length === 0 ? (
        <p>검색 결과가 없습니다.</p>
      ) : (
        <div className="search-list">
          {books.map((book) => (
            <div
              className="search-item"
              key={book.bookId}
              onClick={() => goBookDetail(book.bookId)}
            >
              <img
                src={encodeURI(book.filePath) || "/default-book.jpg"}
                alt={book.bookName}
                className="search-img"
              />
              <div className="search-info">
                <h3>{book.bookName}</h3>
                <p>{book.author}</p>
                <p>{book.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResult;
