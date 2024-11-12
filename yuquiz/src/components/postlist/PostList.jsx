import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <TableHeader>카테고리</TableHeader>
            <TableHeader>제목</TableHeader>
            <TableHeader>작성자</TableHeader>
            <TableHeader>좋아요</TableHeader>
            <TableHeader>조회수</TableHeader>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.postId} post={post} />
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default PostList;

// Styled-components
const TableContainer = styled.div`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 12px;
  background-color: #f8f8f8;
  border-bottom: 2px solid #ddd;
  font-weight: bold;
`;
