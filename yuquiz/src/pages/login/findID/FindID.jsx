import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { findUsername } from "../../../services/user/userService";

export const FindID = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
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
    const result = await findUsername(formData.email);
    if (result.response) {
      alert("회원님의 ID: " + result.response);
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
            ID 찾기
          </button>
        </form>
      </div>
    </div>
  );
};
