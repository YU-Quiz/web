import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { createStudyNotice } from '../../services/study/studyNoticeService';
import Button from "../../components/UI/Button";
import { createStudyPost } from "../../services/study/studyPostService";
import { toast } from "react-toastify";

const StudyPostCreator = () => {
  const { studyId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = {
        categoryId: 3,
        title: title,
        content: content,
      };
      await createStudyPost(studyId, request);
      navigate(`/study/${studyId}/posts`);
    } catch (error) {
      toast.error("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <PageContainer>
      <Card>
        <FormTitle>새 게시글 작성</FormTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
            required
          />
          <Textarea
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
            required
          />
          <Button type="submit">게시글 작성</Button>
          <StyledLink to={`/study/${studyId}/posts`}>목록으로</StyledLink>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default StudyPostCreator;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: "Euclid Circular A", "Poppins", sans-serif;
  color: #333;
`;

const Card = styled.div`
  padding: 40px;
  width: 50%;
  border-radius: 16px;
  background: #ffffff; /* 하얀색 카드 배경 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #0079ea; /* 하늘색 텍스트 */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  outline: none;
  width: 100%;
  height: 48px;
  padding: 10px 14px;
  background: #f7fcff; /* 밝은 하늘색 톤 */
  border: 1px solid #dce8f0; /* 연한 파란색 테두리 */
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;

  &::placeholder {
    color: #a0b3c1; /* 연한 파란색 */
  }

  &:focus {
    border-color: #0079ea; /* 하늘색 포커스 */
    background: #ffffff; /* 포커스 시 하얀색 배경 */
    outline: none;
  }
`;

const Textarea = styled.textarea`
  outline: none;
  width: 100%;
  height: 120px;
  padding: 12px 14px;
  background: #f7fcff; /* 밝은 하늘색 톤 */
  border: 1px solid #dce8f0; /* 연한 파란색 테두리 */
  border-radius: 8px;
  font-size: 16px;
  transition: 0.3s;
  resize: vertical;

  &::placeholder {
    color: #a0b3c1; /* 연한 파란색 */
  }

  &:focus {
    border-color: #0079ea; /* 하늘색 포커스 */
    background: #ffffff; /* 포커스 시 하얀색 배경 */
    outline: none;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  height: 48px;
  line-height: 48px;
  background: #e7eff6; /* 밝은 회색-파란색 배경 */
  color: #0079ea; /* 하늘색 텍스트 */
  text-decoration: none;
  text-align: center;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: 0.3s;

  &:hover {
    background: #dce8f0; /* 포커스 시 연한 파란색 */
  }
`;
