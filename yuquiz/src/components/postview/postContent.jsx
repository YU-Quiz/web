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
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
  margin: 0;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LikeButton = styled.button`
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #495057;

  &:hover {
    color: #007bff;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownIcon = styled(FaEllipsisV)`
  cursor: pointer;
  font-size: 18px;
  color: #495057;

  &:hover {
    color: #343a40;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  width: 120px;
  z-index: 10;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #495057;
  font-size: 14px;

  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

const DropdownItemButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #495057;

  &:hover {
    background-color: #f8f9fa;
    color: #e63946;
  }
`;

const Category = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #868e96;
  margin-bottom: 5px;
`;

const Nickname = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #868e96;
  margin-bottom: 5px;
`;

const DateContent = styled.p`
  font-size: 13px;
  color: #adb5bd;
  margin-bottom: 15px;
`;

const Content = styled.div`
  min-height: 50vh;
  font-size: 16px;
  line-height: 1.5;
  color: #495057;
  margin-top: 10px;
`;

const Info = styled.div`
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #868e96;
  margin-top: 20px;
`;

const Likes = styled.p`
  font-weight: 500;
  color: #495057;
`;

const Views = styled.p`
  font-weight: 500;
  color: #495057;
`;

const Modified = styled.p`
  font-size: 13px;
  font-style: italic;
  color: #adb5bd;
`;
