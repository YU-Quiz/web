import React, { useEffect, useState } from 'react';
import '../../styles/post/PostCreator.scss';
import { Link, useNavigate } from 'react-router-dom';
import { createPost, getCategories } from '../../services/post/postService';

const PostCreator = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        console.log(categoriesData);
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

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
      await createPost(category, title,content);

      alert("게시글 생성 성공!");
      navigate("/posts/list");
    }catch(error){
      console.log("에러 발생!");
    }

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
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
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
          <button type="submit" className='submit-btn'>게시글 작성</button>
          <Link to='/posts/list' className='back-btn'>목록으로</Link>
        </div>
      </form>
    </div>
  );
};

export default PostCreator;
