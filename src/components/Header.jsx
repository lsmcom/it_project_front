import React, { useState } from 'react';
import '../assets/css/header.css';
import { useNavigate } from 'react-router';
import { authStore } from '../store/authStore';

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, clearAuth, userName, userRole } = authStore();
  const [keyword, setKeyword] = useState('')

  //로그아웃
  const logout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      clearAuth(); // Zustand 상태 & localStorage 초기화
      navigate('/');
    }
  };

  //마이페이지
  const goMyPage = () => {
    if (!isAuthenticated()) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return false;
    }
    navigate('/myPage');
  };

  //장바구니
  const goMyShop = () => {
    if (!isAuthenticated()) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
      return false;
    }
    navigate('/myCart');
  };

  //카테고리 페이지
  const goCategory = () => {
    if(!isAuthenticated()){
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
        return false;
    }
    navigate('/category');
  }

  //검색 이벤트
  const searchBook = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  const goAdmin = () => {
    if (userRole !== 'ROLE_ADMIN') {
      alert('관리자 권한이 없습니다.');
      return;
    }
    navigate('/admin');
  };

  return (
    <>
      <div className="header">
        {/* 상단 사용자 네비게이션 */}
        <nav className="user-nav">
          {isAuthenticated() ? (
            <>
              <span>{userName} 님</span>
              <span onClick={logout}>로그아웃</span>
              <span onClick={goMyPage}>마이페이지</span>
              <span onClick={goMyShop}>장바구니</span>
              {userRole === 'ROLE_ADMIN' && (
                <span onClick={goAdmin}>관리자 페이지</span>
              )}
            </>
          ) : (
            <>
              <span onClick={() => navigate('/login')}>로그인</span>
              <span onClick={() => navigate('/join')}>회원가입</span>
              <span onClick={goMyPage}>마이페이지</span>
              <span onClick={goMyShop}>장바구니</span>
            </>
          )}
        </nav>

        {/* 중앙 헤더 영역 */}
        <div className="header-section">
          <span className="title" onClick={() => navigate('/')}>
            온라인 서점
          </span>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchBook()}
            id="search"
            name="search"
            className="search-bar"
            placeholder="검색할 도서 제목 또는 저자를 입력해주세요"
          />
          <button type="button" className="search-btn" onClick={searchBook}>
            검색
          </button>
        </div>

        {/* 하단 네비게이션 */}
        <nav className="header-nav">
          <span onClick={goCategory}>목록보기</span>
          <span>베스트</span>
          <span>전자책</span>
          <span>중고도서</span>
        </nav>
      </div>
      <div className="header-line"></div>
    </>
  );
}

export default Header;
