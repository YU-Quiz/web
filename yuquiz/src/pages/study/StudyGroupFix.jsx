import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button";
import { editStudy, showStudy } from "../../services/study/studyService";

const StudyGroupFix = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [registerDuration, setRegisterDuration] = useState("");
  const [maxUser, setMaxUser] = useState("");
  const [state, setState] = useState("ACTIVE"); // 활동 상태
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudyDetails = async () => {
      try {
        const studyDetails = await showStudy(studyId);
        setName(studyDetails.Name); // 수정: 'Name'을 'name'으로 변경
        setDescription(studyDetails.description);
        setRegisterDuration(studyDetails.registerDuration);
        setMaxUser(studyDetails.maxUser);
        setState(studyDetails.state); // 상태 데이터 추가
        setIsLoading(false);
      } catch (error) {
        console.error("스터디 정보를 불러오는 중 오류 발생:", error);
        alert("스터디 정보를 불러오지 못했습니다.");
        navigate("/study");
      }
    };

    fetchStudyDetails();
  }, [studyId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 클라이언트 유효성 검사
    if (!name.trim()) {
      alert("스터디 이름은 필수 입력입니다.");
      return;
    }

    if (!description.trim()) {
      alert("스터디 설명은 필수 입력입니다.");
      return;
    }

    if (!registerDuration) {
      alert("스터디 신청 기간은 필수 입력입니다.");
      return;
    }

    if (!maxUser || isNaN(maxUser) || maxUser < 2) {
      alert("최대 인원은 최소 2명 이상이어야 합니다.");
      return;
    }

    try {
      const studyData = {
        name,
        description,
        registerDuration,
        maxUser: parseInt(maxUser, 10),
        state,
      };
      await editStudy(studyId, studyData);

      alert("스터디 수정 성공!");
      navigate("/study");
    } catch (error) {
      console.error("스터디 수정 중 오류 발생:", error);
      alert("스터디 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  return (
    <FormContainer>
      <FormTitle>스터디 수정</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>스터디 이름</Label>
        <Input
          type="text"
          placeholder="스터디 이름을 입력하세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Label>스터디 설명</Label>
        <Textarea
          placeholder="스터디에 대한 설명을 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <FlexRow>
          <FlexColumn>
            <Label>등록 기간</Label>
            <Input
              type="datetime-local"
              value={registerDuration}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setRegisterDuration(e.target.value)}
              required
            />
          </FlexColumn>

          <FlexColumn>
            <Label>최대 인원</Label>
            <Input
              type="number"
              placeholder="최대 인원을 입력하세요 (최소 2명)"
              value={maxUser}
              onChange={(e) => setMaxUser(e.target.value)}
              required
            />
          </FlexColumn>

          <FlexColumn>
            <Label>활동 상태</Label>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="ACTIVE">활동 중</option>
              <option value="COMPLETED">활동 종료</option>
            </Select>
          </FlexColumn>
        </FlexRow>

        <ButtonContainer>
          <Button type="submit">스터디 수정</Button>
          <CancelButton to={`/study/${studyId}`}>취소</CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default StudyGroupFix;

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-top: 100px;
`;

const FormTitle = styled.h2`
  font-size: 26px;
  text-align: center;
  font-weight: bold;
  color: #343a40;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #495057;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  margin-bottom: 15px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #5e72e4;
    outline: none;
    box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.25);
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  resize: vertical;
  min-height: 120px;
  margin-bottom: 15px;
  transition: border-color 0.2s;

  &:focus {
    border-color: #5e72e4;
    outline: none;
    box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.25);
  }
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

const FlexColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 8px;
  margin-bottom: 15px;

  &:focus {
    border-color: #5e72e4;
    outline: none;
    box-shadow: 0 0 0 2px rgba(94, 114, 228, 0.25);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const CancelButton = styled(Link)`
  padding: 10px 20px;
  font-size: 14px;
  background-color: #f5365c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #d7284b;
  }
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #868e96;
  margin-top: 50px;
`;
