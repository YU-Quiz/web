import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ResetPW } from "../../../services/user/resetPW";
import { IoMdArrowBack } from "react-icons/io";
import "../../../styles/register/Register.scss"; // 스타일 파일 유지

const ReqResetPW = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    const result = await ResetPW(formData.username, formData.email);
    if (result.success) {
      alert(result.message);
      navigate(-1);
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
              type="email"
              name="email"
              className="form"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="button-register-done"
            onClick={handleSubmit}
          >
            비밀번호 재설정 메일 전송
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReqResetPW;
