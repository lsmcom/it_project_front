import api from '../api/axiosApi';

export const cartAPI = {
  // 장바구니 추가
  addCart: async (data) => {
    const response = await api.post('/api/cart/add', data);
    return response.data;
  },

  // 장바구니 목록 조회
  getCartList: async (userId) => {
    const response = await api.get('/api/cart/list', {
      params: { userId },
      withCredentials: true
    });
    return response.data;
  },

  // 장바구니 항목 삭제
  deleteCart: async (cartId) => {
    const response = await api.delete(`/api/cart/delete/${cartId}`);
    return response.data;
  },

  // 장바구니 수량 변경
  updateQuantity: async (cartId, quantity) => {
    const response = await api.put(`/api/cart/update/${cartId}`, null, { params: { quantity } });
    return response.data;
  },
};
