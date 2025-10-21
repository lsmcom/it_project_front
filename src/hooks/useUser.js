import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userAPI } from "../service/UserService";
import { authStore } from '../store/authStore';

export const useUser = () => {
  const queryClient = useQueryClient();

  //아이디 중복확인
  const checkIdMutation = useMutation({
    mutationFn: (userId) => userAPI.checkId(userId),
    onSuccess: () => {
      
    },
    onError: (error) => {
      alert('중복확인중 오류가 발생하였습니다. 관리자에게 문의바랍니다.')
    },
  });

  //회원가입
  const signupMutation = useMutation({
    mutationFn: (formData) => userAPI.signup(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      alert('회원가입중 오류가 발생하였습니다. 관리자에게 문의바랍니다.')
    },
  });

  //로그인
  const loginMutation = useMutation({
      mutationFn: (formData) => userAPI.login(formData),
      onSuccess: (res) => {
        if (res.status === "200") {
          const content = res.content;
          // Zustand에 로그인 정보 저장
          authStore.getState().setLogin({
            token: content.token,
            userId: content.userId,
            userName: content.userName,
            userRole: content.userRole,
          });
        }
      },
      onError: (err) => {
        console.error('로그인 실패:', err);
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
      },
    });

    //아이디 찾기
    const findIdMutation = useMutation({
      mutationFn: (data) => userAPI.findId(data),
      onSuccess: (response) => {
        console.log('아이디 찾기 성공:', response);
      },
      onError: (error) => {
        console.error('아이디 찾기 실패:', error);
      },
    });

    //비밀번호 찾기 - 사용자 확인
    const findPwMutation = useMutation({
      mutationFn: (data) => userAPI.findPw(data),
      onSuccess: (res) => {
        console.log('🔍 사용자 확인 결과:', res);
      },
      onError: (error) => {
        console.error('❌ 비밀번호 찾기 중 오류:', error);
      },
    });

    //비밀번호 재설정
    const resetPwMutation = useMutation({
      mutationFn: (data) => userAPI.resetPw(data),
      onSuccess: (res) => {
        console.log('✅ 비밀번호 재설정 결과:', res);
      },
      onError: (error) => {
        console.error('❌ 비밀번호 변경 중 오류:', error);
      },
    });

    //회원정보 조회
    const useGetUserInfo = (userId) =>
      useQuery({
        queryKey: ['userInfo', userId],
        queryFn: () => userAPI.getUserInfo(userId),
        enabled: !!userId, 
    });

    //회원정보 수정
    const updateUserInfoMutation = useMutation({
      mutationFn: (formData) => userAPI.updateUserInfo(formData),
      onSuccess: (data) => {
        if (data.resultCode === 200) {
          alert('회원정보가 수정되었습니다.');
          queryClient.invalidateQueries(['userInfo']);
        } else {
          alert(data.msg || '회원정보 수정 실패');
        }
      },
      onError: () => {
        alert('회원정보 수정 중 오류가 발생했습니다.');
      },
    });

    //회원탈퇴
    const deleteUserMutation = useMutation({
      mutationFn: (formData) => userAPI.deleteUser(formData),
      onError: () => {
        alert('회원탈퇴 중 오류가 발생했습니다.');
      },
    });

  return { checkIdMutation, signupMutation, loginMutation, findIdMutation, 
    findPwMutation, resetPwMutation, useGetUserInfo, updateUserInfoMutation, deleteUserMutation
  };
};
