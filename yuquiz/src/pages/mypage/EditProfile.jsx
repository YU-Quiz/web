/*
{
    "password": "비밀번호는 필수 입력 값입니다.",
    "nickname": "닉네임은 필수 입력 값입니다.",
    "majorName": "학과는 필수 선택 값입니다.",
    "email": "이메일은 필수 입력 값입니다."
}
*/

import React, { useState } from 'react';
import "../styles/EditProfile.scss";
import ProfileCard from '../components/mypage/ProfileCard';


const EditProfile = () => {
    const initialData = {
      nickname: '테스터',
      email: 'test@gmail.com',
      majorName: '컴퓨터공학과',
      agreeEmail: true,
    };
  
    const [nickname, setNickname] = useState(initialData.nickname);
    const [email, setEmail] = useState(initialData.email);
    const [major, setMajor] = useState(initialData.majorName);
    const [agreeEmail, setAgreeEmail] = useState(initialData.agreeEmail);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const updatedData = {
        nickname,
        email,
        majorName: major,
        agreeEmail,
      };
      console.log('Form submitted:', updatedData);
    };
  
    return (
        <div className='mypage-container'>
            <ProfileCard />
            <div className="edit-profile-container">
                <h2>내 정보 수정</h2>
                <p>소중한 내 정보를 최신으로 관리하세요.</p>
                <form onSubmit={handleSubmit} className="edit-profile-form">
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
                        <select value={major} onChange={(e) => setMajor(e.target.value)}>
                            <option value="컴퓨터공학과">컴퓨터공학과</option>
                            <option value="경영학과">경영학과</option>
                            <option value="기계공학과">기계공학과</option>
                            <option value="예술학과">예술학과</option>
                            {/* 필요한 경우 전공을 더 추가하세요 */}
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
                    <button type="button" className="home-btn">마이페이지로</button>
                    <button type="submit">저장</button>
                </div>
                </form>
            </div>
        </div>
    );
  }
  
  export default EditProfile;
