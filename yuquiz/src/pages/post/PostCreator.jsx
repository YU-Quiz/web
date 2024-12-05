import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/UI/Button";
import Dropdown from "../../components/UI/Dropdown";
import { createPost } from "../../services/post/postService";
import { getCategories } from "../../services/post/postMetaService";
import { toast } from "react-toastify";

const PostCreator = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(categoryId, title, content);
      toast.success("게시글 생성 성공!");
      navigate("/posts");
    } catch (error) {
      toast.error("게시물 생성 실패");
    }
  };

  return (
    <FormContainer>
      <FormTitle>새 게시글 작성</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Label>카테고리</Label>
        <Dropdown
          options={categories.map((cat) => ({
            label: cat.categoryName,
            value: String(cat.id),
          }))}
          onSelect={handleCategoryChange}
          initLabel="카테고리 선택"
        />

        <Label>제목</Label>
        <Input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <Label>내용</Label>
        <Textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
          required
        />

        <ButtonContainer>
          <Button type="submit">게시글 작성</Button>
          <StyledLink to="/posts">목록으로</StyledLink>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
};

export default PostCreator;

// Styled Components
const FormContainer = styled.div`
  width: 100%;
  border-radius: 8px;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
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
  min-height: 150px;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;

  &:hover {
    background-color: #5a6268;
  }
`;
