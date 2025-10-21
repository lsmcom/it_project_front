import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import '../../assets/css/login/loginForm.css';

const schema = yup.object({
  userId: yup.string().required('아이디를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function LoginForm() {
  const navigate = useNavigate();
  const { loginMutation } = useUser();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  //로그인
  const login = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status === "200") {
          alert(`${res.content.userName}님 환영합니다!`);
          navigate('/');
        } else {
          alert(res.resultMsg || '로그인 실패');
        }
      },
    });
  };

  return (
    <div className="login">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit(login)} noValidate>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" {...register('userId')} placeholder="아이디 입력" />
          {errors.userId && <p className="error">{errors.userId.message}</p>}
        </div>

        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" {...register('password')} placeholder="비밀번호 입력" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="login-btn" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? '로그인 중...' : '로그인'}
        </button>
      </form>
      {/* 하단 링크 영역 */}
      <div className="login-links">
        <span onClick={() => navigate('/findId')}>아이디 찾기</span>
        <span>|</span>
        <span onClick={() => navigate('/findPw')}>비밀번호 찾기</span>
        <span>|</span>
        <span onClick={() => navigate('/join')}>회원가입</span>
      </div>
    </div>
  );
}

export default LoginForm;
