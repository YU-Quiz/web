import React, { useState } from 'react';
import '../../styles/post/PostCreator.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../../services/post/postService';

const PostCreator = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 여기에 게시글 제출 로직을 추가하세요.
    try{
      await createPost(1, title,content);

      alert("게시글 생성 성공!");
      navigate("/posts/list");
    }catch(error){
      console.log("에러 발생!");
    }


    // console.log({ category, title, content });
  };

  return (
    <div className="new-post-form-container">
      <form className="new-post-form" onSubmit={handleSubmit}>
        <h2 className="form-title">새 게시글 작성</h2>

        <label htmlFor="category">카테고리</label>
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">카테고리 선택</option>
          <option value="공지게시판">공지게시판</option>
          <option value="자유게시판">자유게시판</option>
          <option value="풀이게시판">풀이게시판</option>
        </select>

        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={handleTitleChange}
          required
        />

        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          placeholder="내용을 입력하세요"
          value={content}
          onChange={handleContentChange}
          required
        ></textarea>

        <div className="button-container">
          <Link to='/posts/create' className='submit-btn' onClick={handleSubmit}>게시글 작성</Link>
          <Link to='/posts/list' className='back-btn'>목록으로</Link>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
