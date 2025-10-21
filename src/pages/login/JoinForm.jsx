import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import '../../assets/css/login/joinForm.css';
import { useUser } from '../../hooks/useUser';
import { useNavigate } from 'react-router';

const schema = yup.object().shape({
  userId: yup.string().required('아이디를 입력해주세요.').min(4, '아이디는 4자 이상이어야 합니다.'),
  password: yup.string().required('비밀번호를 입력해주세요.').min(8, '비밀번호는 8자 이상이어야 합니다.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인을 입력해주세요.'),
  name: yup.string().required('이름을 입력해주세요.'),
  email: yup
    .string()
    .email('이메일 형식이 올바르지 않습니다.')
    .required('이메일을 입력해주세요.'),
  birth: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, '생년월일 형식은 YYYY-MM-DD 입니다.')
    .required('생년월일을 입력해주세요.'),
  address: yup.string().required('주소를 입력해주세요.'),
  detailAddress: yup.string().required('상세주소를 입력해주세요.'),
});

function JoinForm() {
  const navigate = useNavigate();
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [address, setAddress] = useState('');

  const {register, handleSubmit, formState: { errors }, getValues, setValue} = useForm({
    resolver: yupResolver(schema),
  });

  const { signupMutation, checkIdMutation } = useUser();

  //아이디 중복확인
  const handleIdCheck = () => {
    const userId = getValues('userId');
    if (!userId) {
      alert('아이디를 입력해주세요.');
      return false;
    }

    checkIdMutation.mutate(userId, {
      onSuccess: (res) => {
        if (res === true) {
          alert('이미 사용 중인 아이디입니다.');
          setIsIdChecked(false);
        } else {
          alert('사용 가능한 아이디입니다.');
          setIsIdChecked(true);
        }
      },
    });
  };

  //Daum 주소 API 열기
  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const addr = data.userSelectedType === 'R' ? data.roadAddress : data.jibunAddress;
        setAddress(addr);
        setValue('address', addr);
      },
    }).open();
  };

  //회원가입
  const joinUser = (data) => {

    if (!isIdChecked) {
      alert('아이디 중복확인을 해주세요.');
      return false;
    }

    signupMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.resultCode === 200) {
          alert(res.msg);
          navigate('/login');
        } else {
          alert(res.msg || '회원가입 처리 중 오류가 발생했습니다.');
        }
      },
    });
  };

  return (
    <div className="join">
      <h2>회원가입</h2>

      <form onSubmit={handleSubmit(joinUser)} noValidate>
        {/* 아이디 */}
        <div className="form-group">
          <label>아이디</label>
          <div className="id-row">
            <input type="text" {...register('userId')} placeholder="아이디 입력" />
            <button type="button" className="id-check-btn" onClick={handleIdCheck}>
              중복확인
            </button>
          </div>
          {errors.userId && <p className="error">{errors.userId.message}</p>}
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label>비밀번호</label>
          <input type="password" {...register('password')} placeholder="비밀번호 입력" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label>비밀번호 확인</label>
          <input type="password" {...register('passwordConfirm')} placeholder="비밀번호 확인" />
          {errors.passwordConfirm && <p className="error">{errors.passwordConfirm.message}</p>}
        </div>

        {/* 이름 */}
        <div className="form-group">
          <label>이름</label>
          <input type="text" {...register('name')} placeholder="이름 입력" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        {/* 이메일 */}
        <div className="form-group">
          <label>이메일</label>
          <input type="email" {...register('email')} placeholder="이메일 입력" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        {/* 생년월일 */}
        <div className="form-group">
          <label>생년월일</label>
          <input type="date" {...register('birth')} />
          {errors.birth && <p className="error">{errors.birth.message}</p>}
        </div>

        {/* 주소 */}
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

        {/* 상세주소 */}
        <div className="form-group">
          <label>상세주소</label>
          <input type="text" {...register('detailAddress')} placeholder="상세주소 입력" />
          {errors.detailAddress && <p className="error">{errors.detailAddress.message}</p>}
        </div>

        <button type="submit" className="submit-btn">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
