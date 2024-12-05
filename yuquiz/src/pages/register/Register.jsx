import { Link, useNavigate } from "react-router-dom";
import "../../styles/register/Register.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  handlerCheckDupID,
  handlerCheckDupNick,
  handlerCheckEmail,
  handlerCheckEmailVerify,
  handlerSubmit,
} from "../../services/auth/register/Register";
import useAuthStore from "../../stores/auth/authStore"; // Zustand 상태 사용
import styled from "styled-components";
import ForAddMajorList from "../../components/register/ForAddMajorList";
import { toast } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 로그인 상태 가져오기

  // Input 값들 state
  const [InputID, setInputID] = useState("");
  const [InputPW, setInputPW] = useState("");
  const [InputRePW, setInputRePW] = useState("");
  const [InputNickname, setNickname] = useState("");
  const [InputEmail, setEmail] = useState("");
  const [InputConfirm, setConfirm] = useState("");
  const [InputMajor, setMajor] = useState("");
  const [InputMajorName, setMajorName] = useState("");
  const [emailAgree, setAgree] = useState(false);
  const [checkID, setCheckID] = useState("");
  const [checkNick, setCheckNick] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // 로그인된 상태면 홈 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // 이미 로그인 상태일 경우 홈으로 리디렉트
    }
  }, [isAuthenticated, navigate]);

  // 아이디 중복 확인
  const handleCheckDupID = async () => {
    const result = await handlerCheckDupID(InputID, setInputID, setCheckID);
    if (result) setCheckID(InputID);
  };

  // 닉네임 변경 시 중복 확인 상태 초기화
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setCheckNick("");
  };

  // 닉네임 중복 확인
  const handleCheckDupNickname = async () => {
    const result = await handlerCheckDupNick(
      InputNickname,
      setNickname,
      setCheckNick
    );
    if (result) {
      setCheckNick(InputNickname);
    }
  };

  // 이메일 인증 요청
  const handleCheckEmail = async () => {
    await handlerCheckEmail(InputEmail);
  };

  // 이메일 인증번호 확인
  const handleCheckEmailVerify = async () => {
    const result = await handlerCheckEmailVerify(
      InputEmail,
      InputConfirm,
      setEmailVerified
    );
    if (result) setEmailVerified(true);
  };
  const handleAddMajor = (majorID, majorName) => {
    setMajor(majorID);
    setMajorName(majorName);
    setIsModalOpen(false);
  };
  // 회원가입 처리
  const handleSubmit = async () => {
    const registerData = {
      username: InputID,
      password: InputPW,
      nickname: InputNickname,
      email: InputEmail,
      majorName: InputMajor,
      agreeEmail: emailAgree,
    };

    if (!checkNick || InputNickname !== checkNick) {
      toast.warn("닉네임 중복 확인을 완료해주세요.");
      return;
    }

    const result = await handlerSubmit(registerData, {
      checkID,
      InputID,
      InputPW,
      InputRePW,
      InputNickname,
      checkNick,
      emailVerified,
      InputMajor,
    });

    if (result) navigate("/");
  };

  return (
    <div className="register-container">
      <Link to="/login" className="back-button">
        <IoMdArrowBack />
      </Link>
      <div>
        <div className="title-container">
          <p className="logo">YU Quiz</p>
        </div>
        <div className="register-form-container">
          <p className="register-font">회원가입</p>

          {/* ID 입력 */}
          <div>
            <RegexForm
              type="text"
              id="username"
              placeholder="아이디"
              value={InputID}
              onChange={(e) => setInputID(e.target.value)}
            />
            <RegexButton type="button" onClick={handleCheckDupID}>
              중복 확인
            </RegexButton>
            <RegexHint>
              ※ 아이디는 6~20자의 영문 대소문자와 숫자를 포함해야 하며, 최소
              하나 이상의 영문자와 숫자가 있어야 합니다.
            </RegexHint>
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <RegexForm
              type="password"
              id="password"
              placeholder="비밀번호"
              value={InputPW}
              onChange={(e) => setInputPW(e.target.value)}
            />
          </div>
          <RegexHint>
            ※ 비밀번호는 8~16자의 영문 소문자, 숫자, 특수문자(!@#$%^&*)를
            포함해야 합니다.
          </RegexHint>
          {/* 비밀번호 재입력 */}
          <div>
            <input
              type="password"
              id="password-confirm"
              className="form"
              placeholder="비밀번호 재입력"
              value={InputRePW}
              onChange={(e) => setInputRePW(e.target.value)}
            />
          </div>

          {/* 닉네임 입력 */}
          <div>
            <input
              type="text"
              id="nickname"
              className="form"
              placeholder="닉네임"
              value={InputNickname}
              onChange={handleNicknameChange} // 닉네임 변경 시 중복 확인 초기화
            />
            <button
              type="button"
              className="button"
              onClick={handleCheckDupNickname}
            >
              중복 확인
            </button>
          </div>

          {/* 이메일 입력 */}
          <div>
            <input
              type="email"
              id="email"
              className="form"
              placeholder="이메일"
              value={InputEmail}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailVerified}
            />
            <button type="button" className="button" onClick={handleCheckEmail}>
              인증번호 요청
            </button>
          </div>

          {/* 인증번호 입력 */}
          <div>
            <input
              type="text"
              id="verification-code"
              className="form"
              placeholder="인증번호"
              value={InputConfirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="button"
              onClick={handleCheckEmailVerify}
            >
              확인
            </button>
          </div>
          <div>
            <input
              type="text"
              id="major-input"
              className="form"
              placeholder="전공"
              value={InputMajorName}
              title="전공 검색을 통해 본인의 전공을 선택해주세요."
            />
            <button className="button" onClick={() => setIsModalOpen(true)}>
              전공 검색
            </button>
          </div>
          {/* 전공 선택 */}
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

          {/* 이메일 알림 동의 */}
          <div>
            <input
              type="checkbox"
              id="newsletter-consent"
              checked={emailAgree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label htmlFor="newsletter-consent" className="checkbox-label">
              알림 메일 수신 동의(선택)
            </label>
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            className="button-register-done"
            onClick={handleSubmit}
          >
            회원 가입 하기
          </button>
        </div>
      </div>
    </div>
  );
};

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
const RegexForm = styled.input`
  width: 350px;
  height: 50px;
  border-radius: 8px;
  border: 1px solid silver;
  padding-left: 15px;

  margin-bottom: 2px;
  &::placeholder {
    opacity: 0.7;
  }
`;
const RegexHint = styled.p`
  color: #888;
  font-size: 12px;
  margin-bottom: 4px;
`;

const RegexButton = styled.button`
  width: 100px;
  height: 50px;
  margin-left: 10px;
  margin-top: 7px;
  border-radius: 8px;
  border: 1px solid silver;
  background-color: #00cbf7;
  font-size: 12px;
  font-weight: 750;
  margin-bottom: 2px;
  &:hover {
    background-color: $hover-color;
  }
`;
