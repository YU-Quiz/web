import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerOauth } from "../../services/auth/register/Register";
import { HttpStatusCode } from "axios";

const RegisterOauth = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    majorName: "",
    agreeEmail: false,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 서버로 데이터 전송
      const response = await registerOauth(formData);
      if (response.code === HttpStatusCode.Ok) {
        console.log("회원가입 성공:", response.data);
        navigate("/"); // 회원가입 성공 후 홈으로 이동
        return;
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      setError("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="register-oauth-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임:</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>전공 이름:</label>
          <input
            type="text"
            name="majorName"
            value={formData.majorName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="agreeEmail"
              checked={formData.agreeEmail}
              onChange={handleChange}
            />
            이메일 수신 동의
          </label>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterOauth;
