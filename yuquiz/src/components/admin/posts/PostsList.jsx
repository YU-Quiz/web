import React from 'react';
import styled from 'styled-components';
import PostItem from './PostItem';

const PostsList = ({ posts, onDelete }) => {
  return (
    <ListContainer>
      <StyledTable>
        <thead>
          <HeaderRow>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Post Title</HeaderCell>
            <HeaderCell>Nickname</HeaderCell>
            <HeaderCell>Category Name</HeaderCell>
            <HeaderCell>Created At</HeaderCell>
            <HeaderCell>Like Count</HeaderCell>
            <HeaderCell>View Count</HeaderCell>
            <HeaderCell>Actions</HeaderCell>
          </HeaderRow>
        </thead>
        <tbody>
          {posts.map((post) => (
            <PostItem key={post.postId} post={post} onDelete={onDelete} />
          ))}
        </tbody>
      </StyledTable>
    </ListContainer>
  );
};

export default PostsList;

// Styled-components for PostsList
const ListContainer = styled.div`
  width: 100%;
`;

const StyledTable = styled.table`
  width: 100%;
  border: 1px solid #ccc;
  border-collapse: collapse;
  font-size: 0.9rem;
`;

const HeaderRow = styled.tr`
  background-color: #86c232;
  color: white;
`;

const HeaderCell = styled.th`
  padding: 10px;
  border-bottom: 2px solid #2e7d32;
  text-align: left;
  font-weight: bold;
`;
