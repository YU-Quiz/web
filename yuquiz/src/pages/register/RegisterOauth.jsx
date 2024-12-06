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
import styled from "styled-components";
import ForAddMajorList from "../../components/register/ForAddMajorList";
import { toast } from "react-toastify";

const RegisterOauth = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    agreeEmail: false,
  });

  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [InputMajor, setMajor] = useState("");
  const [InputMajorName, setMajorName] = useState("");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setUserInfo } = useAuthStore(); // 사용자 정보 저장 함수

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // 전공 이름 업데이트
    if (name === "majorName") {
      setMajorName(value); // 전공 이름을 InputMajorName에 반영
    }
    // 닉네임 변경 시 중복 체크 상태 초기화
    if (name === "nickname") {
      setNicknameChecked(false);
    }
  };

  // 닉네임 중복 체크
  const handleCheckDupNickname = async () => {
    // 닉네임이 비어있지 않은지 확인
    if (formData.nickname.trim() === "") {
      toast.error("닉네임을 입력해주세요.");
      return;
    }
    const result = await handlerCheckDupNick(formData.nickname);
    setNicknameChecked(result);
  };

  // 이메일 인증 요청
  const handleCheckEmail = async () => {
    await handlerCheckEmail(formData.email);
  };

  // 이메일 인증번호 확인
  const handleCheckEmailVerify = async () => {
    if (verificationCode.trim() === "") {
      toast.error("인증번호를 입력해주세요.");
      return;
    }
    const result = await handlerCheckEmailVerify(
      formData.email,
      verificationCode
    );
    setEmailVerified(result);
  };
  const handleAddMajor = (majorID, majorName) => {
    setMajor(majorID);
    setMajorName(majorName);
    setIsModalOpen(false);
  };
  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nicknameChecked) {
      toast.warn("닉네임 중복 확인을 완료해주세요.");
      return;
    }
    if (!emailVerified) {
      toast.warn("이메일 인증을 완료해주세요.");
      return;
    }
    setFormData({
      ...formData,
      majorName: InputMajor, // 전공 ID 반영
    });
    const response = await registerOauth(formData);
    if (response === true) {
      // 회원가입 성공 후 사용자 정보 저장
      setUserInfo({
        nickname: formData.nickname,
        email: formData.email,
        majorName: InputMajorName,
        agreeEmail: formData.agreeEmail,
      });
      navigate("/"); // 홈으로 이동
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
              id="major-input"
              className="form"
              placeholder="전공"
              value={InputMajorName}
              onChange={handleChange}
              title="전공 검색을 통해 본인의 전공을 선택해주세요."
            />
            <button className="button" onClick={() => setIsModalOpen(true)}>
              전공 검색
            </button>
          </div>
          {isModalOpen && (
            <Modal>
              <ModalContent>
                <ModalCloseButton
                  className="close-button"
                  onClick={() => setIsModalOpen(false)}
                >
                  닫기
                </ModalCloseButton>
                <ForAddMajorList onAddMajor={handleAddMajor}></ForAddMajorList>
              </ModalContent>
            </Modal>
          )}
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
          <button type="submit" className="button-register-done">
            회원 가입 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOauth;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 600px;
  height: 80%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;
const ModalCloseButton = styled.button`
  font-size: 23px;
  padding: 15px;
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  &:hover {
    color: black;
  }
`;
