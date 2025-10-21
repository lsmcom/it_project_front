import api from '../api/axiosApi';

export const bookAdminAPI = {
  //전체 목록
  list: async () => {
    const response = await api.get('/api/book');
    return response.data.data;
  },

  //등록
  add: async (formData) => {
    const response = await api.post('/api/book', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  //수정
  update: async (bookId, formData) => {
    const response = await api.put(`/api/book/${bookId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  //삭제
  delete: async (bookId) => {
    const response = await api.delete(`/api/book/${bookId}`);
    return response.data;
  },
};
