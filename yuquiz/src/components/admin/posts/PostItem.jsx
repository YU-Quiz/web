import React from 'react';
import styled from 'styled-components';

const PostItem = ({ post, onDelete }) => {
  const { postId, postTitle, nickname, categoryName, createdAt, likeCount, viewCount } = post;

  const handleDeleteClick = () => {
    onDelete(postId);
  };

  return (
    <StyledTableRow>
      <TableCell>{postId}</TableCell>
      <TableCell>{postTitle}</TableCell>
      <TableCell>{nickname}</TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
      <TableCell>{likeCount}</TableCell>
      <TableCell>{viewCount}</TableCell>
      <ActionCell>
        <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
      </ActionCell>
    </StyledTableRow>
  );
};

export default PostItem;

// Styled-components for PostItem
const StyledTableRow = styled.tr`
  td {
    padding: 5px 10px;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
    color: #333;
  }
`;

const TableCell = styled.td``;

const ActionCell = styled.td`
`;

const DeleteButton = styled.button`
  cursor: pointer;
  font-size: 1rem;
  border: none;
  background: none;
  color: #333;

  &:hover {
    color: #555;
  }
  
`;
