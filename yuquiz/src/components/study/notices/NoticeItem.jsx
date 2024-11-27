import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoticeItem = ({ notice }) => {
  return (
    <TableRow>
      <TableCell>
        <StyledLink to={`/posts/${notice.postId}`}>{notice.postTitle}</StyledLink>
      </TableCell>
      <TableCell>{notice.nickname}</TableCell>
      <TableCell>{new Date(notice.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>{notice.likeCount}</TableCell>
      <TableCell>{notice.viewCount}</TableCell>
    </TableRow>
  );
};

export default NoticeItem;

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
