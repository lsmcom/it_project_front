import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/user/withdraw.css';
import { useUser } from '../../hooks/useUser';
import { authStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

function Withdraw() {
  const { userId, clearAuth } = authStore();
  const { deleteUserMutation } = useUser();
  const navigate = useNavigate();

  const {register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema),
  });

  const deleteUser = (formData) => {
    if (window.confirm('정말 회원탈퇴 하시겠습니까?')) {
      deleteUserMutation.mutate(
        { userId, password: formData.password },
        {
          onSuccess: (res) => {
            if (res.resultCode === 200) {
              alert('회원탈퇴가 완료되었습니다.');
              clearAuth();
              navigate('/');
            } else {
              alert(res.msg || '회원탈퇴에 실패했습니다.');
            }
          },
        }
      );
    }
  };

  return (
    <div className="mydelete-container">
      <h2>회원탈퇴</h2>

      <form onSubmit={handleSubmit(deleteUser)} noValidate>
        <p className="warn-text">
          회원탈퇴 시 모든 정보가 삭제되며, 복구가 불가능합니다.
        </p>

        <div className="form-group">
          <label>비밀번호 확인</label>
          <input
            type="password"
            {...register('password')}
            placeholder="비밀번호 입력"
          />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="delete-btn">
          회원탈퇴
        </button>
      </form>
    </div>
  );
}

export default Withdraw;
