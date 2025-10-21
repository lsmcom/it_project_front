import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/user/myInfoEdit.css';
import { useUser } from '../../hooks/useUser';
import { authStore } from '../../store/authStore';

const schema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup.string().email('이메일 형식이 올바르지 않습니다.').required('이메일을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  detailAddress: yup.string().required('상세주소를 입력해주세요.'),
  password: yup
    .string()
    .nullable()
    .transform((value) => (value === '' ? null : value))
    .test(
      'password-length',
      '비밀번호는 8자 이상이어야 합니다.',
      (value) => !value || value.length >= 8
    ),
});

function MyInfoEdit() {
  const { userId } = authStore();
  const { useGetUserInfo, updateUserInfoMutation } = useUser();
  const [address, setAddress] = useState('');

  const {register, handleSubmit, setValue, formState: { errors }} = useForm(
    { resolver: yupResolver(schema) }
  );

  //회원정보 조회
  const { data, isLoading, error } = useGetUserInfo(userId);

  //조회된 데이터 → form에 세팅
  useEffect(() => {
    if (data?.resultCode === 200) {
      const user = data.user;
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('address', user.address);
      setValue('detailAddress', user.detailAddress);
      setAddress(user.address);
    }
  }, [data, setValue]);

  //Daum 주소 API
  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        setAddress(addr);
        setValue('address', addr);
      },
    }).open();
  };

  //회원정보 수정
  const updateUser = (formData) => {
    formData.userId = userId;

    //비밀번호 입력 안 했으면 필드 자체 삭제
    if (!formData.password) {
      delete formData.password;
    }

    updateUserInfoMutation.mutate(formData);
  };

  return (
    <div className="myinfo-container">
      <h2>회원정보 관리</h2>
      <form onSubmit={handleSubmit(updateUser)} noValidate>
        <div className="form-group">
          <label>아이디</label>
          <input type="text" value={userId} disabled />
        </div>

        <div className="form-group">
          <label>이름</label>
          <input type="text" {...register('name')} placeholder="이름 입력" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label>이메일</label>
          <input type="email" {...register('email')} placeholder="이메일 입력" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* 주소 입력 + 버튼 */}
        <div className="form-group">
          <label>주소</label>
          <div className="address-row">
            <input
              type="text"
              {...register('address')}
              value={address}
              placeholder="주소"
              readOnly
            />
            <button type="button" className="address-btn" onClick={openDaumPostcode}>
              주소찾기
            </button>
          </div>
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-group">
          <label>상세주소</label>
          <input type="text" {...register('detailAddress')} placeholder="상세주소 입력" />
          {errors.detailAddress && <p className="error">{errors.detailAddress.message}</p>}
        </div>

        <div className="form-group">
          <label>비밀번호 변경</label>
          <input type="password" {...register('password')} placeholder="새 비밀번호 입력" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="save-btn">저장</button>
      </form>
    </div>
  );
}

export default MyInfoEdit;
