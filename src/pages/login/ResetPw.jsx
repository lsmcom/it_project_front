import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/login/findPw.css';
import { useUser } from '../../hooks/useUser';

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('새 비밀번호를 입력해주세요.')
    .min(8, '비밀번호는 8자 이상이어야 합니다.'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
});

function ResetPw() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPwMutation } = useUser();

  const userId = location.state?.userId || '';

  const {register, handleSubmit, formState: { errors }} = useForm(
    { resolver: yupResolver(schema) }
  );

  const resetPw = (data) => {
    const payload = {
      userId,
      newPassword: data.newPassword,
    };

    resetPwMutation.mutate(payload, {
      onSuccess: (res) => {
        if (res.resultCode === 200) {
          alert(res.msg || '비밀번호가 변경되었습니다.');
          navigate('/login');
        } else {
          alert(res.msg || '비밀번호 변경 실패');
        }
      },
      onError: () => alert('비밀번호 변경 중 오류가 발생했습니다.'),
    });
  };

  return (
    <div className="findpw-container">
      <h2>비밀번호 재설정</h2>
      <form onSubmit={handleSubmit(resetPw)} noValidate>
        <div className="form-group">
          <label>새 비밀번호</label>
          <input
            type="password"
            {...register('newPassword')}
            placeholder="새 비밀번호 입력"
          />
          {errors.newPassword && <p className="error">{errors.newPassword.message}</p>}
        </div>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="비밀번호 확인"
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="find-btn">
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}

export default ResetPw;
