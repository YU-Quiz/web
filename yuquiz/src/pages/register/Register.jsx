import { Link } from "react-router-dom";
import "../../styles/register/Register.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  handlerCheckDupID,
  handlerCheckDupNick,
  handlerCheckEmail,
  handlerCheckEmailVerify,
  handlerSubmit,
} from "../../services/auth/register/Register";

export const Register = () => {
  // Input 값들 state
  const [InputID, setInputID] = useState("");
  const [InputPW, setInputPW] = useState("");
  const [InputRePW, setInputRePW] = useState("");
  const [InputNickname, setNickname] = useState(""); // InputNickname 선언
  const [InputEmail, setEmail] = useState("");
  const [InputConfirm, setConfirm] = useState("");
  const [InputMajor, setMajor] = useState(null);
  const [emailAgree, setAgree] = useState(false);
  const [checkID, setCheckID] = useState("");
  const [checkNick, setCheckNick] = useState(""); // 중복 확인된 닉네임 상태
  const [emailVerified, setEmailVerified] = useState(false);

  const navigate = useNavigate();

  // 아이디 중복 확인
  const handleCheckDupID = async () => {
    const result = await handlerCheckDupID(InputID, setInputID, setCheckID);
    if (result) setCheckID(InputID);
  };

  // 닉네임이 변경될 때 중복 확인 상태 초기화
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setCheckNick(""); // 닉네임이 변경되면 중복 확인 상태 초기화
  };

  // 닉네임 중복 확인
  const handleCheckDupNickname = async () => {
    const result = await handlerCheckDupNick(
      InputNickname,
      setNickname,
      setCheckNick
    );
    if (result) {
      setCheckNick(InputNickname); // 중복 확인된 닉네임을 저장
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

  // 회원가입
  const handleSubmit = async () => {
    const registerData = {
      username: InputID,
      password: InputPW,
      nickname: InputNickname,
      email: InputEmail,
      majorName: InputMajor,
      agreeEmail: emailAgree,
    };

    // checkNick이 비어 있거나 현재 입력된 닉네임과 중복 확인된 닉네임이 다르면 경고
    if (!checkNick || InputNickname !== checkNick) {
      alert("닉네임 중복 확인을 완료해주세요.");
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
    <div className="register-body">
      <div className="register-container">
        <Link to="/" className="back-button">
          <IoMdArrowBack />
        </Link>
        <div>
          <div className="title-container">
            <p className="logo">YU Quiz</p>
          </div>
          <div>
            <p className="register-font">회원가입</p>

            {/* ID 입력 */}
            <div>
              <input
                type="text"
                id="username"
                className="form"
                placeholder="아이디"
                value={InputID}
                onChange={(e) => setInputID(e.target.value)}
              />
              <button
                type="button"
                className="button"
                onClick={handleCheckDupID}
              >
                중복 확인
              </button>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <input
                type="password"
                id="password"
                className="form"
                placeholder="비밀번호"
                value={InputPW}
                onChange={(e) => setInputPW(e.target.value)}
              />
            </div>

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
              <button
                type="button"
                className="button"
                onClick={handleCheckEmail}
              >
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

            {/* 전공 선택 */}
            <select
              id="department"
              className="form"
              value={InputMajor}
              onChange={(e) => setMajor(e.target.value)}
            >
              <option value="">학과선택</option>
              <option value="computer-science">컴퓨터공학과</option>
              <option value="business-administration">경영학과</option>
              <option value="economics">경제학과</option>
            </select>

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
    </div>
  );
};
