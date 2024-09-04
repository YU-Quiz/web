import React, { useState } from 'react';
import '../../styles/post/PostView.scss';
import { Link } from 'react-router-dom';

const PostView = ({ post }) => {
    const existingPost = {
        category: "자유게시판",
        title: "게시글 조회하겠습니다~",
        content: "게시글 조회 중~",
        comments: ["댓글1", "댓글2"],
    }
  const { category, title, content } = existingPost;
  const [comments, setComments] = useState(existingPost.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleEditClick = () => {
    // 게시글 수정 페이지로 이동하는 로직을 추가하세요 (예: 라우터를 사용하여 이동)
    console.log('게시글 수정 페이지로 이동');
  };

  const handleBackClick = () => {
    // 게시글 목록 페이지로 돌아가는 로직을 추가하세요 (예: 라우터를 사용하여 이동)
    console.log('목록으로 돌아가기');
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="postview-container">
      <div className='postview-box'>
        <h2 className="post-title">{title}</h2>
        <p className="post-category">카테고리: {category}</p>
        <div className="post-content">{content}</div>

        <div className="button-container">
          <Link to='/posts/edit' className='edit-btn' onClick={handleEditClick}>게시글 수정</Link>
          <Link to='/posts/list' className='back-btn' onClick={handleBackClick}>목록으로</Link>
        </div>

        <div className="comments-section">
          <h3>댓글</h3>
          <ul className="comments-list">
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  {comment}
                </li>
              ))
            ) : (
              <li>댓글이 없습니다.</li>
            )}
          </ul>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              className="comment-input"
              placeholder="댓글을 작성하세요..."
              value={newComment}
              onChange={handleCommentChange}
              required
            ></textarea>
            <button type="submit" className="submit-comment-btn">
              댓글 남기기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostView;
