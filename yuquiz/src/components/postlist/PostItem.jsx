import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  const { postId, postTitle, nickname, categoryName, likeCount, viewCount } = post;

  return (
    <TableRow>
      <TableCell>[{categoryName}]</TableCell>
      <TableCell>
        <StyledLink to={`/posts/${postId}`}>{postTitle}</StyledLink>
      </TableCell>
      <TableCell>{nickname}</TableCell>
      <TableCell>{likeCount}</TableCell>
      <TableCell>{viewCount}</TableCell>
    </TableRow>
  );
};

export default PostItem;

// Styled-components
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
