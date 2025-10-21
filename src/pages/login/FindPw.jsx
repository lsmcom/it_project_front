import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/login/findPw.css';
import { useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';

const schema = yup.object().shape({
  userId: yup.string().required('아이디를 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup
    .string()
    .email('이메일 형식이 올바르지 않습니다.')
    .required('이메일을 입력해주세요.'),
});

function FindPw() {
  const navigate = useNavigate();
  const { findPwMutation } = useUser();

  const {register, handleSubmit, formState: { errors }} = useForm(
    { resolver: yupResolver(schema) }
  );

  //비밀번호 찾기
  const findPw = (data) => {
    findPwMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.resultCode === 200) {
          alert('사용자 확인 완료. 비밀번호 재설정 페이지로 이동합니다.');
          navigate('/resetPw', { state: { userId: data.userId } });
        } else {
          alert(res.msg || '등록된 회원 정보를 찾을 수 없습니다.');
        }
      },
      onError: () => {
        alert('비밀번호 찾기 중 오류가 발생했습니다.');
      },
    });
  };

  return (
    <div className="findpw-container">
      <h2>비밀번호 찾기</h2>

      <form onSubmit={handleSubmit(findPw)} noValidate>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" {...register('userId')} placeholder="아이디 입력" />
          {errors.userId && <p className="error">{errors.userId.message}</p>}
        </div>

        <div className="form-group">
          <label>이름</label>
          <input type="text" {...register('name')} placeholder="이름 입력" />
          {errors.userName && <p className="error">{errors.userName.message}</p>}
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input
            type="email"
            {...register('email')}
            placeholder="가입 시 등록한 이메일을 입력해주세요"
          />
          {errors.userEmail && <p className="error">{errors.userEmail.message}</p>}
        </div>

        <button type="submit" className="find-btn">
          비밀번호 재설정
        </button>
      </form>
    </div>
  );
}

export default FindPw;
