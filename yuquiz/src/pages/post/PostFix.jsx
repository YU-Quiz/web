import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/UI/Button';
import Dropdown from '../../components/UI/Dropdown';
import { editPost, showPost } from '../../services/post/postService';
import { getCategories } from '../../services/post/postMetaService';

const PostFix = () => {
  const { postId } = useParams();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await showPost(postId);
        const categoryName = postData.post.categoryName || '';
        switch (categoryName) {
          case '공지게시판':
            setCategory('1');
            break;
          case '자유게시판':
            setCategory('2');
            break;
          case '스터디':
            setCategory('3');
            break;
          case '문의게시판':
            setCategory('4');
            break;
          default:
            setCategory('');
        }
        setTitle(postData.post.title || '');
        setContent(postData.post.content || '');
        
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

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
      await editPost(postId, categoryId, title, content);
      alert("게시글 수정 성공!");
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormTitle>게시글 수정</FormTitle>

        {/* <Label>카테고리</Label>
        <Dropdown
          options={categories.map((cat) => ({ label: cat.categoryName, value: String(cat.id) }))}
          onSelect={handleCategoryChange}
          initLabel="카테고리 선택"
          defaultOption={categories.find((cat) => cat.id === categoryId)}
        /> */}

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
          <Button type="submit">게시글 수정</Button>
          <StyledLink to={`/posts/${postId}`}>취소</StyledLink>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default PostFix;

// Styled Components
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
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
