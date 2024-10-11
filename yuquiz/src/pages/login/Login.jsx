import { Link, useNavigate } from "react-router-dom";
import "../../styles/login/Login.scss";
import { IoMdArrowBack } from "react-icons/io";
import { useState } from "react";
import { login } from "../../services/auth/login/authService"; // 로그인 서비스 함수
import Modal from "react-modal";
import SocialKakao from "../../components/login/SocialKakao";

// 모달의 루트 요소 설정
Modal.setAppElement("#root");

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // 아이디 입력 상태
  const [password, setPassword] = useState(""); // 비밀번호 입력 상태
  const [error, setError] = useState(null); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [isKakaoModalOpen, setIsKakaoModalOpen] = useState(false); // 카카오 모달 상태
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // 이전 에러 초기화
    setIsLoading(true); // 로딩 시작

    try {
      // 로그인 요청
      await login(username, password);
      navigate("/");
    } catch (error) {
      // 에러 처리: 상태 코드에 따라 다른 메시지 표시
      if (error.message.includes("404")) {
        setError("아이디 또는 비밀번호가 유효하지 않습니다.");
      } else if (error.message.includes("423")) {
        setError("정지된 계정입니다. 잠금 해제 시간을 확인해주세요.");
      } else {
        setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="login-container">
      <Link to="/" className="back-button">
        <IoMdArrowBack />
      </Link>
      <div className="title-box">
        <p className="logo">YU Quiz</p>
      </div>
      <form className="login-container" onSubmit={handleLogin}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="button-login-done"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </button>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* 에러 메시지 표시 */}
          <div>
            <button
              onClick={() => setIsKakaoModalOpen(true)}
              className="button-login-social"
            >
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
        <Link to="/register" className="button-others">
          회원가입
        </Link>
        <button className="button-others">비밀번호 찾기</button>
      </div>
      {/* 카카오 로그인 모달 */}
      <Modal
        isOpen={isKakaoModalOpen}
        onRequestClose={() => setIsKakaoModalOpen(false)}
        contentLabel="Kakao Login Modal"
        className="custom-modal-content"
        overlayClassName="custom-modal-overlay"
      >
        <SocialKakao
          isOpen={isKakaoModalOpen}
          onClose={() => setIsKakaoModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
