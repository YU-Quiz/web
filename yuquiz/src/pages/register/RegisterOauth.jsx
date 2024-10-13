import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  handlerCheckEmail,
  handlerCheckEmailVerify,
  handlerCheckDupNick,
  registerOauth,
} from "../../services/auth/register/Register";
import { IoMdArrowBack } from "react-icons/io";
import useAuthStore from "../../stores/auth/authStore";
import "../../styles/register/Register.scss"; // 스타일 파일 유지

const RegisterOauth = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    majorName: "",
    agreeEmail: false,
  });

  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { setUserInfo } = useAuthStore(); // 사용자 정보 저장 함수

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // 닉네임 변경 시 중복 체크 상태 초기화
    if (name === "nickname") {
      setNicknameChecked(false);
    }
  };

  // 닉네임 중복 체크
  const handleCheckDupNickname = async () => {
    const result = await handlerCheckDupNick(formData.nickname);
    setNicknameChecked(result);
  };

  // 이메일 인증 요청
  const handleCheckEmail = async () => {
    await handlerCheckEmail(formData.email);
  };

  // 이메일 인증번호 확인
  const handleCheckEmailVerify = async () => {
    const result = await handlerCheckEmailVerify(
      formData.email,
      verificationCode
    );
    setEmailVerified(result);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nicknameChecked) {
      setError("닉네임 중복 확인을 완료해주세요.");
      return;
    }
    if (!emailVerified) {
      setError("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      const response = await registerOauth(formData);
      if (response === true) {
        // 회원가입 성공 후 사용자 정보 저장
        setUserInfo({
          nickname: formData.nickname,
          email: formData.email,
          majorName: formData.majorName,
          agreeEmail: formData.agreeEmail,
        });
        navigate("/"); // 홈으로 이동
      }
    } catch (error) {
      setError("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <Link to="/login" className="back-button">
          <IoMdArrowBack />
        </Link>
        <div className="title-container">
          <p className="logo">YU Quiz</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="nickname"
              className="form"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="button"
              onClick={handleCheckDupNickname}
              disabled={nicknameChecked}
            >
              닉네임 중복 확인
            </button>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="form"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={emailVerified}
            />
            <button type="button" className="button" onClick={handleCheckEmail}>
              인증번호 요청
            </button>
          </div>
          <div>
            <input
              type="text"
              className="form"
              placeholder="인증번호"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              disabled={emailVerified}
            />
            <button
              type="button"
              className="button"
              onClick={handleCheckEmailVerify}
            >
              인증번호 확인
            </button>
          </div>
          <div>
            <input
              type="text"
              name="majorName"
              className="form"
              placeholder="전공 이름"
              value={formData.majorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="agreeEmail"
              id="agreeEmail"
              checked={formData.agreeEmail}
              onChange={handleChange}
            />
            <label htmlFor="agreeEmail" className="checkbox-label">
              이메일 수신 동의
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="button-register-done">
            회원 가입 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOauth;
