import api from '../api/axiosApi';

export const userAPI = {
  //아이디 중복 확인
  checkId: async (userId) => {
    const response = await api.get('/api/member/check-id', {
      params: { userId }
    });
    return response.data;
  },

  //회원가입
  signup: async (formData) => {
    const response = await api.post('/api/member/signup', formData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  },

  // 로그인
  login: async (formData) => {
    const response = await api.post('/api/member/login', formData, {
      withCredentials: true, headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    //LoginFilter가 JSON을 직접 반환함
    return response.data; 
  },

  //아이디 찾기
  findId: async (data) => {
    const response = await api.post('/api/member/find-id', data);
    return response.data;
  },

  //비밀번호 찾기 - 사용자 확인
  findPw: async (data) => {
    const response = await api.post('/api/member/find-pw', data);
    return response.data;
  },

  //비밀번호 재설정
  resetPw: async (data) => {
    const response = await api.post('/api/member/reset-pw', data);
    return response.data;
  },

  //회원정보 조회
  getUserInfo: async (userId) => {
    const response = await api.get(`/api/member/info/${userId}`);
    return response.data;
  },

  //회원정보 수정
  updateUserInfo: async (data) => {
    const response = await api.put(`/api/member/info/update`, data);
    return response.data;
  },

  //회원탈퇴
  deleteUser: async (formData) => {
    const response = await api.delete('/api/member/delete', { data: formData });
    return response.data;
  },
};
