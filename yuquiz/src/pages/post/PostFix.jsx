import React, { useState, useEffect } from 'react';
import '../../styles/post/PostFix.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { editPost, getCategories, showPost } from '../../services/post/postService';

const PostFix = () => {
  const { postId } = useParams(); // URL에서 
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await showPost(postId); // 서버에서 게시글 데이터 불러오기
        console.log(postData);
        setCategory(postData.category || '');
        setTitle(postData.title || '');
        setContent(postData.content || '');

        const categoriesData = await getCategories();
        setCategories(categoriesData);
        console.log(categoriesData);
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error('게시글 데이터를 불러오는 중 오류 발생:', error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

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
    try {
      await editPost(postId, category, title, content ); // 게시글 수정 API 호출
      alert("게시글 수정 성공!");
      navigate(`/posts/view/${postId}`);
      
    } catch (error) {
      console.error('게시글 수정 중 오류 발생:', error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중일 때 표시
  }

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
          <button type="submit" className="submit-btn">게시글 수정</button>
          <Link to={`/posts/view/${postId}`} className='back-btn'>취소</Link>
        </div>
      </form>
    </div>
  );
};

export default PostFix;
