import "../../styles/login/Login.scss";
import { IoMdArrowBack } from "react-icons/io";

export const Login = () => {
  return (
    <div className="login-container">
      <button className="back-button">
        <IoMdArrowBack />
      </button>
      <div className="title-box">
        <p className="logo">YU Quiz</p>
      </div>
      <div className="login-container">
        <div>
          <p className="form-label">아이디</p>
          <input
            type="text"
            id="username"
            className="input-box"
            placeholder="아이디를 입력하세요"
          />
          <p className="form-label">비밀번호</p>
          <input
            type="password"
            id="password"
            className="input-box"
            placeholder="비밀번호를 입력하세요"
          />

          <button type="submit" className="button-login-done">
            로그인
          </button>
          <div>
            <button className="button-login-social">
              <img
                src={`${process.env.PUBLIC_URL}/images/kakao_login_img.png`}
                alt="Kakao Login"
              />
            </button>
            <button className="button-login-social">
              <img
                src={`${process.env.PUBLIC_URL}/images/naver_login_img.png`}
                alt="Naver Login"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="other-container">
        <button className="button-others">회원가입</button>/
        <button className="button-others">비밀번호 찾기</button>
      </div>
    </div>
  );
}
