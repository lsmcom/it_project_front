import api from '../api/axiosApi';

export const bookAPI = {
  // 카테고리별 도서 목록 조회
  listByCategory: async (categoryId) => {
    const response = await api.get(`/api/book/list/${categoryId}`);
    return response.data.data;
  },

  //이번주 특가 도서 조회
  getSaleBooks: async () => {
    const response = await api.get(`/api/book/sale`);
    return response.data.data;
  },

  //도서 상세 조회
  getBookDetail: async (bookId) => {
    const response = await api.get(`/api/book/detail/${bookId}`);
    return response.data.data;
  },

  //도서 검색
  searchBooks: async (keyword) => {
    const res = await api.get("/api/book/search", { params: { keyword } });
    return res.data;
  },

  //전체 베스트셀러 Top 10
  getBestSeller: async () => {
    const response = await api.get('/api/book/bestSeller');
    return response.data.data; // data 배열만 반환
  },

  //카테고리별 베스트셀러 Top 6
  getBestSellerByCategory: async (categoryId) => {
    const response = await api.get(`/api/book/bestSeller/category/${categoryId}`);
    return response.data.data; // data 배열만 반환
  },
};