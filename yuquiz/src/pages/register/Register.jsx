import "../../styles/register/Register.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import {
  handlerCheckDupID,
  handlerCheckDupNick,
  handlerCheckEmail,
  handlerCheckEmailVerify,
} from "../../services/auth/register/Register";

export const Register = () => {
  const [InputID, setInputID] = useState("");
  const [InputPW, setInputPW] = useState("");
  const [InputRePW, setInputRePW] = useState("");
  const [InputNickname, setNickname] = useState("");
  const [InputEmail, setEmail] = useState("");
  const [InputConfirm, setConfirm] = useState("");
  const [InputMajor, setMajor] = useState(null);
  const [emailAgree, setAgree] = useState(false);
  const idRegex = /^[a-zA-Z0-9]{4,20}$/;
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [checkID, setCheckID] = useState("");
  const handleCheckDupID = async () => {
    if (!idRegex.test(InputID)) {
      alert("아이디는 4~20자의 영문 대소문자와 숫자만 사용할 수 있습니다.");
      setInputID("");
      return;
    }
    const response = await handlerCheckDupID(InputID);
    if (response.status === 200) {
      alert("사용 가능한 아이디입니다.");
      setCheckID(InputID);
    } else if (response.status === 409) {
      alert(response.data.message || "이미 사용 중인 아이디입니다.");
    } else {
      alert(response.data.message || "문제 발생.🚨");
    }
  };

  const handleCheckDupNickname = async () => {
    if (!nicknameRegex.test(InputNickname)) {
      alert("닉네임은 2~10자의 영문, 숫자, 한글만 사용할 수 있습니다.");
      setNickname("");
      return;
    }
    const response = await handlerCheckDupNick(InputNickname);
    if (response.status === 200) {
      alert("사용 가능한 닉네임입니다.");
    } else if (response.status === 409) {
      alert(response.data.message || "이미 사용 중인 닉네임입니다.");
    } else {
      alert(response.data.message || "문제 발생.🚨");
    }
  };

  const handleCheckEmail = async () => {
    if (!emailRegex.test(InputEmail)) {
      alert("유효한 이메일 주소를 입력하세요.");
      return;
    }
    try {
      const EmailResponse = await handlerCheckEmail(InputEmail);
      console.log(EmailResponse);
      if (EmailResponse && EmailResponse.status === 200) {
        alert(EmailResponse.data.response || "인증번호를 발송했습니다.");
      } else if (EmailResponse.status === 429) {
        alert(EmailResponse.data.message || "조금있다 다시 시도해 주세요.");
      } else {
        alert(EmailResponse?.data?.message || "문제 발생.🚨");
      }
    } catch (error) {
      console.error("Error in handleCheckEmail:", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };
  const handleCheckEmailVerify = async () => {
    try {
      const EmailResponse = await handlerCheckEmailVerify(InputConfirm);
      console.log(EmailResponse);
      if (EmailResponse && EmailResponse.status === 200) {
        alert(EmailResponse.data.response || "인증번호를 발송했습니다.");
      } else if (EmailResponse.status === 429) {
        alert(EmailResponse.data.message || "조금있다 다시 시도해 주세요.");
      } else {
        alert(EmailResponse?.data?.message || "문제 발생.🚨");
      }
    } catch (error) {
      console.error("Error in handleCheckEmail:", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };
  const handleSubmit = async () => {
    // 마지막에 제출할 때 id 중복 확인 한번 더 수행
    if (checkID !== InputID) {
      alert("아이디를 다시 확인하세요.");
      return;
    } else if (InputPW !== InputRePW) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 회원가입 처리 로직 추가
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <button className="back-button">
          <IoMdArrowBack />
        </button>
        <div>
          <div className="title-container">
            <p className="logo">YU Quiz</p>
          </div>
          <div>
            <p className="register-font">회원가입</p>
            <div>
              <div>
                <input
                  type="text"
                  id="username"
                  className="form"
                  placeholder="아이디"
                  value={InputID}
                  onChange={(e) => {
                    setInputID(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="button"
                  onClick={handleCheckDupID}
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <input
                type="password"
                id="password"
                className="form"
                placeholder="비밀번호"
                value={InputPW}
                onChange={(e) => {
                  setInputPW(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                id="password-confirm"
                className="form"
                placeholder="비밀번호 재입력"
                value={InputRePW}
                onChange={(e) => {
                  setInputRePW(e.target.value);
                }}
              />
            </div>
            <div>
              <div>
                <input
                  type="text"
                  id="nickname"
                  className="form"
                  placeholder="닉네임"
                  value={InputNickname}
                  onChange={(e) => {
                    setNickname(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="button"
                  onClick={handleCheckDupNickname}
                >
                  중복 확인
                </button>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="email"
                  id="email"
                  className="form"
                  placeholder="이메일"
                  value={InputEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="button"
                  onClick={handleCheckEmail}
                >
                  인증번호 요청
                </button>
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  id="verification-code"
                  className="form"
                  placeholder="인증번호"
                  value={InputConfirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="button"
                  onClick={handleCheckEmailVerify}
                >
                  확인
                </button>
              </div>
            </div>
            <div>
              <select
                id="department"
                className="form"
                value={InputMajor}
                onChange={(e) => {
                  setMajor(e.target.value);
                }}
              >
                <option value="">학과선택</option>
                <option value="computer-science">컴퓨터공학과</option>
                <option value="business-administration">경영학과</option>
                <option value="economics">경제학과</option>
              </select>
            </div>
            <div>
              <input
                type="checkbox"
                id="newsletter-consent"
                checked={emailAgree}
                onChange={(e) => {
                  setAgree(e.target.checked);
                }}
              />
              <label htmlFor="newsletter-consent" className="checkbox-label">
                알림 메일 수신 동의(선택)
              </label>
            </div>
            <div>
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
    </div>
  );
};
