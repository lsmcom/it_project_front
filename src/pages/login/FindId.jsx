import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/login/findId.css';
import { useNavigate } from 'react-router';
import { useUser } from '../../hooks/useUser';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup
    .string()
    .email('이메일 형식이 올바르지 않습니다.')
    .required('이메일을 입력해주세요.'),
});

function FindId() {
  const navigate = useNavigate();
  const [foundId, setFoundId] = useState(''); //찾은 아이디 저장
  const { findIdMutation } = useUser();

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  //아이디 찾기 요청
  const findId = (data) => {
    findIdMutation.mutate(data, {
      onSuccess: (response) => {
        if (response.resultCode === 200) {
          setFoundId(response.userId);
        } else {
          alert(response.msg);
          setFoundId('');
        }
      },
      onError: () => {
        alert('아이디 찾기 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
      },
    });
  };

  return (
    <div className="findid-container">
      <h2>아이디 찾기</h2>

      {/* 아이디 찾기 폼 */}
      <form onSubmit={handleSubmit(findId)} noValidate>
        <div className="form-group">
          <label>이름</label>
          <input
            type="text"
            {...register('name')}
            placeholder="이름을 입력해주세요"
          />
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
          아이디 찾기
        </button>
      </form>

      {/* 결과 표시 영역 */}
      {foundId && (
        <div className="result-box">
          <p>
            회원님의 아이디는{' '}
            <span className="highlight">{foundId}</span> 입니다.
          </p>
          <button
            className="login-move-btn"
            onClick={() => navigate('/login')}
          >
            로그인 하러가기
          </button>
        </div>
      )}
    </div>
  );
}

export default FindId;
