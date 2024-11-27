import React from 'react';
import styled from 'styled-components';

const StudyPostItem = ({ post }) => {
  return (
    <TableRow>
      <TableCell>{post.postTitle}</TableCell>
      <TableCell>{post.nickname}</TableCell>
      <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{post.likeCount}</TableCell>
      <TableCell>{post.viewCount}</TableCell>
    </TableRow>
  );};

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
