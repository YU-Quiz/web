import React, { useState } from "react";
import "../../styles/mypage/EditProfile.scss";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import { submitEditMyInfo } from "../../services/mypage/mypage";

const EditProfile = () => {
  const { userInfo, setUserInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [email, setEmail] = useState(userInfo.email);
  const [major, setMajor] = useState(userInfo.majorName);
  const [agreeEmail, setAgreeEmail] = useState(userInfo.agreeEmail);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 동작 방지 (페이지 리로드 방지)

    // 서버로 보낼 데이터
    const updatedData = {
      nickname,
      email,
      majorName: major,
      agreeEmail,
    };

    // 사용자 정보 수정 요청
    const isSuccess = await submitEditMyInfo(updatedData);

    if (isSuccess) {
      // 서버는 응답으로 실제 데이터를 주지 않으므로, 우리가 가진 데이터로 상태 업데이트
      setUserInfo({
        ...userInfo, // 기존 role과 같은 필드는 유지
        ...updatedData, // 수정한 데이터로 업데이트
      });

      // 페이지 이동
      console.log("Navigating to /mypage");
      navigate("/my"); // 성공 시 마이페이지로 이동
    } else {
      console.error("Failed to update user info");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>내 정보 수정</h2>
      <p>소중한 내 정보를 최신으로 관리하세요.</p>
      <form className="edit-profile-form">
        <table>
          <tbody>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
                <p className="hint">- (최대 20자 등록 가능)</p>
              </td>
            </tr>
            <tr>
              <th>전공</th>
              <td>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                >
                  <option value="컴퓨터공학과">컴퓨터공학과</option>
                  <option value="경영학과">경영학과</option>
                  <option value="기계공학과">기계공학과</option>
                  <option value="예술학과">예술학과</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>이메일 주소</th>
              <td>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                />
              </td>
            </tr>
            <tr>
              <th>이메일 수신 동의</th>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={agreeEmail}
                    onChange={(e) => setAgreeEmail(e.target.checked)}
                  />
                  이메일 수신에 동의합니다.
                </label>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="submit-section">
          <Link to="/mypage" className="home-btn">
            마이페이지로
          </Link>
          <button type="button" onClick={handleSubmit}>
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
