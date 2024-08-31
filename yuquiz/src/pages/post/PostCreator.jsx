import React, { useState } from 'react';
import '../../styles/post/PostCreator.scss';

const PostCreator = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 게시글 제출 로직을 추가하세요.
    console.log({ category, title, content });
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
          <button type="submit" className="submit-btn">게시글 작성</button>
          <button type="button" className="back-btn">목록으로</button>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
