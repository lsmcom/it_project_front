import api from '../api/axiosApi';

export const categoryAPI = {
  // 대분류 조회
  getMainCategories: async () => {
    const response = await api.get('/api/category');
    return response.data.data;
  },

  // 서브카테고리 조회
  getSubCategories: async (parentId) => {
    const response = await api.get(`/api/category/${parentId}`);
    return response.data.data;
  },
};
