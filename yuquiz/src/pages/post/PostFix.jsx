import React, { useState, useEffect } from 'react';
import '../../styles/post/PostFix.scss';

const PostFix = ({ post }) => {
    const existingPost = {
        category: "자유게시판",
        title: "게시글 수정하겠습니다~",
        content: "게시글 수정 중~",
    }
  // 기존 게시글 데이터를 불러와 상태를 초기화합니다.
  const [category, setCategory] = useState(existingPost.category || '');
  const [title, setTitle] = useState(existingPost.title || '');
  const [content, setContent] = useState(existingPost.content || '');

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
    // 게시글 수정 로직을 추가하세요.
    console.log({ category, title, content });
    // 예를 들어, 서버에 수정된 데이터를 전송하는 API 호출을 추가할 수 있습니다.
  };

  return (
    <div className="postfix-container">
      <form className="postfix-form" onSubmit={handleSubmit}>
        <h2 className="form-title">게시글 수정</h2>

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
          <button type="submit" className="submit-btn">게시글 수정</button>
          <button type="button" className="back-btn">목록으로</button>
        </div>
      </form>
    </div>
  );
};

export default PostFix;
