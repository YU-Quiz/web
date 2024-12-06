import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth/authStore";
import { submitEditMyInfo } from "../../services/mypage/mypage";
import Button from "../../components/UI/Button";
import { withdrawUser } from "../../services/user/userService";
import { toast } from "react-toastify";
import { getMajorList } from "../../services/auth/register/Register";

const EditProfile = () => {
  const { userInfo, setUserInfo } = useAuthStore((state) => ({
    userInfo: state.userInfo,
    setUserInfo: state.setUserInfo,
  }));

  const [nickname, setNickname] = useState(userInfo.nickname);
  const [email, setEmail] = useState(userInfo.email);
  const [major, setMajor] = useState(userInfo.majorName);
  const [majorList, setMajorList] = useState([]);
  const [agreeEmail, setAgreeEmail] = useState(userInfo.agreeEmail);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(userInfo.profilePicture || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const majorListData = await getMajorList();
        setMajorList(majorListData);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);
  console.log(majorList);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      nickname,
      email,
      majorName: major,
      agreeEmail,
    };

    if (profilePicture) {
      updatedData.profilePicture = profilePicture; // or upload separately if backend requires
    }

    const isSuccess = await submitEditMyInfo(updatedData);

    if (isSuccess) {
      setUserInfo({
        ...userInfo,
        ...updatedData,
      });
      toast.success("회원 정보가 수정되었습니다.");
      navigate("/my");
    } else {
      toast.error("회원 정보 수정 실패");
    }
  };

  const handleDeleteAccount = async (e) => {
    const confirmDelete = window.confirm(
      "회원 탈퇴를 하시겠습니까? 이후 계정은 복구할 수 없습니다."
    );

    if (confirmDelete) {
      try {
        const response = await withdrawUser();
        if (response.success) {
          // Adjust based on the actual response structure
          toast.info("회원 탈퇴가 완료되었습니다.");
          navigate("/"); // Redirect to the home page or another appropriate page
        } else {
          toast.error("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        toast.error("오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    setPreview(URL.createObjectURL(file)); // Preview the uploaded image
  };

  return (
    <EditProfileContainer>
      <Title>내 정보 수정</Title>
      <Description>소중한 내 정보를 최신으로 관리하세요.</Description>
      <Form>
        <Table>
          <tbody>
            <tr>
              <th>프로필 사진</th>
              <td>
                <ProfilePictureWrapper>
                  <ProfileImage src={preview} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                </ProfilePictureWrapper>
              </td>
            </tr>
            <tr>
              <th>닉네임</th>
              <td>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="닉네임을 입력하세요"
                />
                <Hint>- (최대 20자 등록 가능)</Hint>
              </td>
            </tr>
            <tr>
              <th>전공</th>
              <td>
                <select
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                >
                  {majorList.map((majorItem) => (
                    <option key={majorItem.id} value={majorItem.name}>
                      {majorItem.name}
                    </option>
                  ))}
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
                <Label>
                  <input
                    type="checkbox"
                    checked={agreeEmail}
                    onChange={(e) => setAgreeEmail(e.target.checked)}
                  />
                  이메일 수신에 동의합니다.
                </Label>
              </td>
            </tr>
          </tbody>
        </Table>
        <SubmitSection>
          <DeleteAccountButton onClick={handleDeleteAccount}>
            회원탈퇴
          </DeleteAccountButton>
          <Button onClick={handleSubmit}>저장</Button>
        </SubmitSection>
      </Form>
    </EditProfileContainer>
  );
};

export default EditProfile;

const EditProfileContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #777;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    vertical-align: top;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    width: 200px;
    font-weight: bold;
    background-color: #f0f0f0;
  }

  td {
    input[type="text"],
    input[type="email"],
    select {
      width: 100%;
      padding: 8px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
`;

const ProfilePictureWrapper = styled.div`
  display: flex;
  align-items: end;

  input[type="file"] {
    margin-left: 10px;
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

const Hint = styled.p`
  margin-top: 5px;
  font-size: 12px;
  color: #888;
`;

const Label = styled.label`
  font-size: 14px;

  input[type="checkbox"] {
    margin-right: 5px;
  }
`;

const SubmitSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const DeleteAccountButton = styled.button`
  padding: 10px;
  font-size: 14px;
  color: #aaa;
  border: none;
  text-decoration: none;
  cursor: pointer;
  background: none;
`;
