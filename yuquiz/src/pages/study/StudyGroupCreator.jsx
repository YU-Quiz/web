import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { createStudy } from '../../services/study/studyService';

const StudyGroupCreator = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [registerDuration, setRegisterDuration] = useState('');
  const [maxUser, setMaxUser] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studyData = {
        name,
        description,
        registerDuration,
        maxUser: parseInt(maxUser, 10),
        state: 'ACTIVE',
      };
      console.log(studyData);
      await createStudy(studyData);
      alert('스터디 생성 성공!');
      navigate('/study');
    } catch (error) {
      console.error('스터디 생성 중 오류 발생:', error);
      alert('스터디 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <FormContainer>
      <FormTitle>스터디 그룹 생성</FormTitle>
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
              onChange={(e) => setRegisterDuration(e.target.value)}
              required
            />
          </FlexColumn>

          <FlexColumn>
            <Label>최대 인원</Label>
            <Input
              type="number"
              placeholder="최대 인원을 입력하세요"
              value={maxUser}
              onChange={(e) => setMaxUser(e.target.value)}
              required
            />
          </FlexColumn>
        </FlexRow>

        <ButtonContainer>
          <Button type="submit">스터디 생성</Button>
          <CancelButton onClick={() => navigate('/study')}>취소</CancelButton>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default StudyGroupCreator;

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  margin-top: 100px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  margin-bottom: 15px;
`;

const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 15px;
`;

const FlexColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;
