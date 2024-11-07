import React, { useEffect } from "react";
import "../../../styles/admin/UserItem.scss";

const PostItem = ({
  post,
  onDelete,
}) => {
  const { postId, postTitle, nickname, categoryName, createdAt, likeCount, viewCount } = post;

  const handleDeleteClick = () => {
    onDelete(postId);

  };

  return (
    <tr className="post-item">
      <td>{postId}</td>
      <td>{postTitle}</td>
      <td>{nickname}</td>
      <td>{categoryName}</td>
      <td>{new Date(createdAt).toLocaleString()}</td>
      <td>{likeCount}</td>
      <td>{viewCount}</td>
      <td className="dropdown-cell">
        <button>회원 정지</button>
      </td>
    </tr>
  );
};

export default PostItem;