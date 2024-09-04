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
  //input 값들 state
  const [InputID, setInputID] = useState("");
  const [InputPW, setInputPW] = useState("");
  const [InputRePW, setInputRePW] = useState("");
  const [InputNickname, setNickname] = useState("");
  const [InputEmail, setEmail] = useState("");
  const [InputConfirm, setConfirm] = useState("");
  const [InputMajor, setMajor] = useState(null);
  const [emailAgree, setAgree] = useState(false);
  const [checkID, setCheckID] = useState("");
  const [checkNick, setCheckNick] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  //형식 정규식
  const idRegex = /^[a-zA-Z0-9]{4,20}$/;
  const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
  const pwRegex = /(?=.*[0-9])(?=.*[a-zA-Z]).{8,16}/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();
  const handleCheckDupID = async () => {
    if (!idRegex.test(InputID)) {
      alert("아이디는 4~20자의 영문 대소문자와 숫자만 사용할 수 있습니다.");
      setInputID("");
      return;
    }

    try {
      const response = await handlerCheckDupID(InputID);

      // response가 존재하는지 확인 후 처리
      if (response && response.status === 200) {
        alert("사용 가능한 아이디입니다.");
        setCheckID(InputID);
      } else if (response && response.status === 409) {
        alert(response.data.message || "이미 사용 중인 아이디입니다.");
      } else {
        alert(response?.data?.username || "아이디가 유효하지 않습니다.");
      }
    } catch (error) {
      console.error("Error in handleCheckDupID:", error);

      // 서버로부터의 400 응답 처리
      if (error.response && error.response.status === 400) {
        // 서버에서 400 응답으로 보내는 데이터 출력
        alert(
          error.response.data.message || "아이디 형식이 올바르지 않습니다."
        );
      } else {
        alert("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
      }
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
      setCheckNick(InputNickname);
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
      const EmailResponse = await handlerCheckEmailVerify({
        email: InputEmail,
        code: InputConfirm,
      });

      if (!EmailResponse) {
        throw new Error("서버 응답이 없습니다.");
      }

      // 서버 응답 로그 확인
      //console.log(EmailResponse);

      // 인증 성공
      if (EmailResponse.data.response || EmailResponse.status === 200) {
        alert("인증번호 확인 성공");
        setEmailVerified(true); // 이메일 인증 성공 시 상태 업데이트
      }
      // 인증번호 불일치 (400)
      else if (EmailResponse.data?.status === 400) {
        alert(EmailResponse.data.message || "인증번호가 일치하지 않습니다.");
      }
      // 이미 존재하는 이메일 (409)
      else if (EmailResponse.data?.status === 409) {
        alert(EmailResponse.data.message || "이미 존재하는 이메일입니다.");
      }
      // 유효시간 만료 (410)
      else if (EmailResponse.data?.status === 410) {
        alert(EmailResponse.data.message || "유효시간이 지났습니다.");
      }
      // 기타 디기당당
      else {
        alert(EmailResponse.data?.message || "알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error in handleCheckEmailVerify:", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  };

  const handleSubmit = async () => {
    if (checkID !== InputID) {
      alert("중복확인을 마친 아이디와 일치하지 않습니다.");
      return;
    } else if (!pwRegex.test(InputPW)) {
      alert("비밀번호는 8~16자의 영문 대소문자와 숫자를 포함해야 합니다.");
      setNickname("");
      return;
    } else if (InputPW !== InputRePW) {
      alert("비밀번호가 일치하지 않습니다.");
      setInputRePW("");
      return;
    } else if (InputNickname !== checkNick) {
      alert("중복확인을 마친 닉네임과 일치하지 않습니다.");
      return;
    } else if (!emailVerified) {
      alert("이메일 인증이 필요합니다.");
      return;
    } else if (InputMajor === "") {
      alert("전공을 선택해주세요.");
      return;
    }

    const registerData = {
      username: InputID,
      password: InputPW,
      nickname: InputNickname,
      email: InputEmail,
      majorName: InputMajor,
      agreeEmail: emailAgree,
    };

    try {
      // 회원가입 요청 API 호출
      const response = await handlerSubmit(registerData);

      // 성공 응답 처리
      if (response && response.status === 200) {
        alert("회원가입 성공!");
        navigate("/");
      } else if (response && response.status === 400) {
        alert(response.data.message || "회원가입에 실패했습니다.");
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      if (error.response && error.response.data) {
        // 서버에서 온 에러 메시지 처리
        alert(
          error.response.data.message || "회원가입 중 문제가 발생했습니다."
        );
      } else {
        alert("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
      }
    }
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
