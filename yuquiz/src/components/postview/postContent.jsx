import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/post/postview/postContent.scss";

const PostContent = ({ post, postId , onLikeToggle, onDelete }) => {
    console.log(post);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="post-header">
      <h2 className="post-title">{post.title}</h2>
      <div className="dropdown-container">
        <FaEllipsisV className="dropdown-icon" onClick={toggleDropdown} />
        {dropdownOpen && (
          <div className="dropdown-menu">
            {/* {quizData.isWriter && (
                <Link to={`/quiz/edit/${quizId}`} className="dropdown-link">
                📝수정하기
                </Link>
            )} */}
            {post.nickname && (
                <Link to={`/posts/edit/${postId}`} className="edit-btn">게시글 수정</Link>
            )}
            
            <button onClick={onDelete}>게시글 삭제</button>
            <button onClick={onLikeToggle}>
              {post.isLiked ? "좋아요 취소" : "좋아요"}
            </button>
          </div>
        )}
      </div>
      <p className="post-category">카테고리: {post.categoryName}</p>
      <p className="post-nickname">작성자: {post.nickname}</p>
      <p className="post-date">작성일: {new Date(post.createdAt).toLocaleString()}</p>
      <div className="post-content">{post.content}</div>

      <div className="post-info">
        <p className="post-likes">좋아요: {post.likeCount}</p>
        <p className="post-views">조회수: {post.viewCount}</p>
        {post.modified && <p className="post-modified">(수정됨)</p>}
      </div>
    </div>
  );
};

export default PostContent;
