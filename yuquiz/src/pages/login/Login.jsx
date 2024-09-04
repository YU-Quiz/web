import { Link, useNavigate } from "react-router-dom";
import "../../styles/login/Login.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { login } from "../../services/auth/login/loginService";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작을 막음
    try {
      // 토큰을 사용할 데가 있는가?
      const { accessToken } = await login(username, password);

      // 로그인 성공 후 홈으로
      navigate('/');
      console.log('로그인 성공!');
    } catch (error) {
      console.log('로그인 실패!');
    }
  };

  return (
    <div className="login-container">
      <Link to='/' className="back-button"><IoMdArrowBack /></Link>
      <div className="title-box">
        <p className="logo">YU Quiz</p>
      </div>
      <form className="login-container" onSubmit={handleLogin}> {/* 폼 태그 추가 */}
        <div>
          <p className="form-label">아이디</p>
          <input
            type="text"
            id="username"
            className="input-box"
            placeholder="아이디를 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p className="form-label">비밀번호</p>
          <input
            type="password"
            id="password"
            className="input-box"
            placeholder="비밀번호를 입력하세요"
            value={password}  // 상태와 연결
            onChange={(e) => setPassword(e.target.value)} // 입력 값 업데이트
            required
          />
          <button type="submit" className="button-login-done"> {/* 버튼의 타입을 submit으로 변경 */}
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
      </form>
      <div className="other-container">
        <Link to='/register' className="button-others">회원가입</Link>
        <button className="button-others">비밀번호 찾기</button>
      </div>
    </div>
  );
};
