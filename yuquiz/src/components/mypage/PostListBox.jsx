import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostListBox = ({ title, items, handleModalOpen }) => {
  const openModal = () => {
    handleModalOpen(title);
  };

  return (
    <ListBoxContainer>
      <Title onClick={openModal}>
        {title} <MoreText>더보기</MoreText>
      </Title>
      <List>
        {items.content.slice(0, 10).map((item, index) => (
          <ListItem key={index}>
            <StyledLink to={`/posts/${item.postId}`}>
              {item.postTitle}
            </StyledLink>
          </ListItem>
        ))}
      </List>
    </ListBoxContainer>
  );
};

export default PostListBox;

// Styled Components
const ListBoxContainer = styled.div`
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  border: 1px solid #ddd;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  cursor: pointer;
  color: #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const MoreText = styled.span`
  font-size: 0.8rem;
  color: #666;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #333;

  &:hover {
    text-decoration: underline;
    color: #007bff;
  }
`;
