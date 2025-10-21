import api from '../api/axiosApi';

export const purchaseAPI = {
  //장바구니 구매
  purchaseFromCart: async (userId) => {
    const res = await api.post(`/api/purchase/cart`, null, {
      params: { userId },
      withCredentials: true,
    });
    return res.data;
  },

  //바로 구매
  directPurchase: async (userId, bookId, quantity) => {
    const res = await api.post(`/api/purchase/direct`, null, {
      params: { userId, bookId, quantity },
      withCredentials: true,
    });
    return res.data;
  },

  //구매 내역 조회
  getPurchaseList: async (userId) => {
    const res = await api.get(`/api/purchase/list`, {
      params: { userId },
      withCredentials: true,
    });
    return res.data;
  },

  //사용자별 구매횟수 조회
  getPurchaseCount: async (userId) => {
    const res = await api.get("/api/purchase/count", { params: { userId } });
    return res.data;
  },
};
