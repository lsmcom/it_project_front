import React, { useEffect, useState } from "react";
import "../../assets/css/category/category.css";
import { categoryAPI } from "../../service/categoryService";
import { useBook } from "../../hooks/useBook";
import { useNavigate, useParams } from "react-router-dom";

function Category() {
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [hoveredMain, setHoveredMain] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { categoryId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMain = async () => {
      try {
        const data = await categoryAPI.getMainCategories();
        setMainCategories(data);
      } catch (err) {
        console.error("대분류 불러오기 실패:", err);
      }
    };
    fetchMain();
  }, []);

  const handleMouseEnter = async (event, mainCateId) => {
    const rect = event.currentTarget.offsetTop;
    setHoverPosition(rect);
    setHoveredMain(mainCateId);

    try {
      const subs = await categoryAPI.getSubCategories(mainCateId);
      setSubCategories(subs);
    } catch (err) {
      console.error("서브카테고리 불러오기 실패:", err);
    }
  };

  const handleWrapperLeave = () => {
    setHoveredMain(null);
    setSubCategories([]);
  };

  const { useGetBooksByCategory, useBestSellerByCategory } = useBook();
  const {
    data: books,
    isLoading,
    isError
  } = useGetBooksByCategory(selectedCategory);
  const { data: bestSellerCategory } =
    useBestSellerByCategory(selectedCategory);

  const categoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const goBookDetail = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="category">
      {/* nav + sub 패널을 함께 감싼 wrapper */}
      <div className="cate-wrapper" onMouseLeave={handleWrapperLeave}>
        <nav className="cate-nav">
          {mainCategories.map((cate) => (
            <div
              key={cate.categoryId}
              className={`cate-name ${
                hoveredMain === cate.categoryId ? "active" : ""
              }`}
              onMouseEnter={(e) => handleMouseEnter(e, cate.categoryId)}
              onClick={() => categoryClick(cate.categoryId)}
            >
              {cate.categoryName}
            </div>
          ))}
        </nav>

        {/* nav 밖에 있지만 같은 wrapper 안 → hover 유지됨 */}
        {hoveredMain && subCategories.length > 0 && (
          <div className="sub-cate-panel" style={{ top: hoverPosition }}>
            {subCategories.map((sub) => (
              <div
                key={sub.categoryId}
                className="sub-cate-item"
                onClick={() => categoryClick(sub.categoryId)}
              >
                {sub.categoryName}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 오른쪽 도서 목록 */}
      <div className="cate-flex-show">
        <div className="cate-best">
          <div className="cate-title-img">
            <span className="cate-title">어제의 베스트 셀러</span>
          </div>
          {bestSellerCategory && bestSellerCategory.length > 0 ? (
            <div className="cate-best-list">
              {/* 상위 2개 - 큰 카드 */}
              <div className="cate-flex-list">
                {bestSellerCategory.slice(0, 2).map((book, index) => (
                  <div
                    key={book.bookId}
                    className="cate-top-book"
                    onClick={() => goBookDetail(book.bookId)}
                  >
                    <img
                      className="cate-book-img"
                      src={encodeURI(book.filePath) || "/default-book.jpg"}
                      alt={book.bookName}
                    />
                    <span className="cate-book-title">
                      {index + 1}. {book.bookName}
                    </span>
                  </div>
                ))}
              </div>

              {/* 나머지 4개 - grid */}
              <div className="cate-grid-list">
                {bestSellerCategory.slice(2, 6).map((book, index) => (
                  <span
                    key={book.bookId}
                    className="cate-grid-title"
                    onClick={() => goBookDetail(book.bookId)}
                  >
                    {index + 3}. {book.bookName}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-book">
              해당 카테고리의 베스트셀러가 없습니다.
            </div>
          )}
        </div>

        <div className="cate-book">
          <div className="cate-flex">
            {books && books.length > 0
              ? books.map((book) => (
                  <div
                    key={book.bookId}
                    className="cate-list"
                    onClick={() => goBookDetail(book.bookId)}
                  >
                    <div>
                      <img
                        src={
                          encodeURI(book.filePath)
                            ? encodeURI(book.filePath)
                            : "/default-book.jpg"
                        }
                        alt={book.bookName}
                        className="cate-show-img"
                      />
                      <div className="cate-show-title">{book.bookName}</div>
                      <div className="cate-show-price">
                        {book.price.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                ))
              : !isLoading && <p>해당 카테고리에 도서가 없습니다.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
