import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login/SocialKakao.scss";

const SocialKakao = ({ isOpen, onClose }) => {
  const kakaoClientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const kakaoRedirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoClientId}&redirect_uri=${encodeURIComponent(
    kakaoRedirectUri
  )}&state=random_state_value`;

  if (!isOpen) return null; // 모달이 열려 있지 않으면 렌더링하지 않음

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          ×
        </button>
        <Link to={kakaoLoginUrl}>hi </Link>
      </div>
    </div>
  );
};

export default SocialKakao;
