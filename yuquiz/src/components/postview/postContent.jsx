import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/post/postview/postContent.scss";

const PostContent = ({ post, postId, onLikeToggle, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="post-header">
      <div className="header-top">
        <h2 className="post-title">{post.title}</h2>
        <div className="right-actions">
          <button className="like-btn" onClick={onLikeToggle}>
            {post.isLiked ? "👍" : "✊"}
          </button>
          <div className="post-dropdown-container">
            <FaEllipsisV className="dropdown-icon" onClick={toggleDropdown} />
            {dropdownOpen && (
              <div className="dropdown-menu">
                {post.isWriter && (
                  <Link
                    to={`/posts/edit/${postId}`}
                    className="dropdown-menu-item"
                  >
                    게시글 수정
                  </Link>
                )}
                {post.isWriter && (
                  <button
                    className="dropdown-menu-item"
                    onClick={onDelete}
                  >
                    게시글 삭제
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="post-category">카테고리: {post.categoryName}</p>
      <p className="post-nickname">작성자: {post.nickname}</p>
      <p className="post-date">
        작성일: {new Date(post.createdAt).toLocaleString()}
      </p>
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
