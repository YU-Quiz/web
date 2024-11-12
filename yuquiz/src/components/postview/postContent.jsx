import React from "react";
import styled from "styled-components";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostContent = ({ post, postId, onLikeToggle, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <PostHeader>
      <HeaderTop>
        <Title>{post.title}</Title>
        <RightActions>
          <LikeButton onClick={onLikeToggle}>
            {post.isLiked ? "👍" : "✊"}
          </LikeButton>
          <DropdownContainer>
            <DropdownIcon onClick={toggleDropdown} />
            {dropdownOpen && (
              <DropdownMenu>
                {post.isWriter && (
                  <StyledLink to={`/posts/${postId}/edit`}>
                    게시글 수정
                  </StyledLink>
                )}
                {post.isWriter && (
                  <DropdownItemButton onClick={onDelete}>
                    게시글 삭제
                  </DropdownItemButton>
                )}
              </DropdownMenu>
            )}
          </DropdownContainer>
        </RightActions>
      </HeaderTop>
      <Category>카테고리: {post.categoryName}</Category>
      <Nickname>작성자: {post.nickname}</Nickname>
      <DateContent>작성일: {new Date(post.createdAt).toLocaleString()}</DateContent>
      <Content>{post.content}</Content>

      <Info>
        <Likes>좋아요: {post.likeCount}</Likes>
        <Views>조회수: {post.viewCount}</Views>
        {post.modified && <Modified>(수정됨)</Modified>}
      </Info>
    </PostHeader>
  );
};

export default PostContent;

// Styled Components
const PostHeader = styled.div`
  width: 100%;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-left: 10px;
`;

const DropdownIcon = styled(FaEllipsisV)`
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 10;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const DropdownItemButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: black;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Category = styled.p`
  font-weight: bold;
`;

const Nickname = styled.p`
  font-weight: bold;
`;

const DateContent = styled.p`
  color: #666;
  font-size: 0.875rem;
`;

const Content = styled.div`
  margin-top: 15px;
  font-size: 1rem;
  line-height: 1.5;
`;

const Info = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Likes = styled.p`
  font-weight: bold;
`;

const Views = styled.p`
  font-weight: bold;
`;

const Modified = styled.p`
  font-style: italic;
  color: #888;
`;
