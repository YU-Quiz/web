import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StudyPostItem = ({ post }) => {
  return (
    <TableRow>
      <TableCell>
        <StyledLink to={`/posts/${post.postId}`}>{post.postTitle}</StyledLink>
      </TableCell>
      <TableCell>{post.nickname}</TableCell>
      <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{post.likeCount}</TableCell>
      <TableCell>{post.viewCount}</TableCell>
    </TableRow>
  );
};

export default StudyPostItem;

// Styled-components
const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f8f8;
  }

  &:hover {
    background-color: #eaf4fc;
    cursor: pointer;
  }
`;

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
  color: #333;

  &:first-child {
    font-weight: bold;
    color: #0056b3;
    text-align: left;
  }
`;

const StyledLink = styled(Link)`
  color: #0056b3; /* 링크 기본 색상 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold;

  &:hover {
    color: #003d80; /* 호버 시 어두운 색상 */
    text-decoration: underline; /* 호버 시 밑줄 추가 */
  }
`;
