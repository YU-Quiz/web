import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import "../../../styles/register/Register.scss"; // 스타일 파일 유지
import { doResetPW } from "../../../services/user/resetPW";

const ResResetPW = () => {
  const location = useLocation(); // 현재 URL 가져오기
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code"); // 쿼리 파라미터에서 code 추출

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "", // 비밀번호 재확인 필드 추가
  });
  const navigate = useNavigate();

  // 입력값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호와 비밀번호 재확인 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 재설정 API 호출
    const result = await doResetPW(formData.username, formData.password, code);
    if (result.success) {
      alert(result.message);
      navigate("/");
    } else {
      alert(result.message);
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
              name="username"
              className="form"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="form"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              className="form"
              placeholder="비밀번호 재확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="button-register-done">
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResResetPW;
