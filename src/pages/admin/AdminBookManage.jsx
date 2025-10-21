import React, { useState, useEffect } from "react";
import "../../assets/css/admin/adminBookManage.css";
import { useBookAdmin } from "../../hooks/useBookAdmin";
import { categoryAPI } from "../../service/categoryService";

function AdminBookManage() {
  const {
    useGetBookList,
    addBookMutation,
    updateBookMutation,
    deleteBookMutation
  } = useBookAdmin();
  const { data: books } = useGetBookList();

  const [selectedBook, setSelectedBook] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMain, setSelectedMain] = useState(null);

  //카테고리 로드
  useEffect(() => {
    const fetchMainCategories = async () => {
      const main = await categoryAPI.getMainCategories();
      setMainCategories(main);
    };
    fetchMainCategories();
  }, []);

  const handleMainChange = async (e) => {
    const mainId = e.target.value;
    setSelectedMain(mainId);
    const subs = await categoryAPI.getSubCategories(mainId);
    setSubCategories(subs);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreview(previewURL);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    const bookData = {
      categoryId: form.subCategory.value || selectedBook?.categoryId,
      bookName: form.bookName.value,
      author: form.author.value,
      description: form.description.value,
      price: form.price.value
    };

    formData.append(
      "book",
      new Blob([JSON.stringify(bookData)], { type: "application/json" })
    );
    if (form.file.files[0]) formData.append("file", form.file.files[0]);

    if (selectedBook) {
      updateBookMutation.mutate({ bookId: selectedBook.bookId, formData });
    } else {
      addBookMutation.mutate(formData);
    }

    form.reset();
    setSelectedBook(null);
    setPreview(null);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setPreview(encodeURI(encodeURI(book.filePath)));
  };

  return (
    <div className="admin-book-manage">
      <h2>도서 관리</h2>

      {/* 도서 등록/수정 폼 */}
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-row">
          <select onChange={handleMainChange} required>
            <option value="">대분류 선택</option>
            {mainCategories.map((main) => (
              <option key={main.categoryId} value={main.categoryId}>
                {main.categoryName}
              </option>
            ))}
          </select>

          <select name="subCategory" required>
            <option value="">소분류 선택</option>
            {subCategories.map((sub) => (
              <option key={sub.categoryId} value={sub.categoryId}>
                {sub.categoryName}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          name="bookName"
          placeholder="도서명"
          defaultValue={selectedBook?.bookName || ""}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="저자"
          defaultValue={selectedBook?.author || ""}
          required
        />
        <textarea
          name="description"
          placeholder="도서 설명"
          defaultValue={selectedBook?.description || ""}
        />
        <input
          type="number"
          name="price"
          placeholder="가격"
          defaultValue={selectedBook?.price || ""}
          required
        />

        <div className="file-preview">
          <input type="file" name="file" onChange={handleFileChange} />
          {preview && (
            <img
              src={preview}
              alt="미리보기"
              className="preview-img"
              onError={(e) => (e.target.src = "/default-book.jpg")}
            />
          )}
        </div>

        <button type="submit" className="submit-btn">
          {selectedBook ? "도서 수정" : "도서 등록"}
        </button>
      </form>

      {/* 도서 목록 */}
      <div className="book-list">
        {books?.map((book) => (
          <div key={book.bookId} className="book-item">
            <img
              src={encodeURI(encodeURI(book.filePath)) || "/default-book.jpg"}
              alt={book.bookName}
            />
            <div className="book-info">
              <strong>{book.bookName}</strong> <br />
              {book.author} / {book.price.toLocaleString()}원
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(book)}>수정</button>
              <button onClick={() => deleteBookMutation.mutate(book.bookId)}>
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminBookManage;
