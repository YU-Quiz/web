import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  getMyCorrectQuizList,
  getMyIncorrectQuizList,
  getMyLikedPostList,
  getMyLikedQuizList,
  getMyPinnedQuizList,
  getMyPostList,
  getMyQuizList,
} from "../../services/mypage/myList";
import DetailSortDropdown from "./DetailSortDropdown";
import { PostListTitles, QuizListTitles } from "../../constants/mypage/LIstTitles";

const DetailList = ({ title }) => {
  const [listData, setListData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listType, setListType] = useState("post");
  const [sortOption, setSortOption] = useState("");

  const handleSelectSort = (sortOption) => {
    setSortOption(sortOption);
  };

  useEffect(() => {
    if (Object.values(QuizListTitles).includes(title)) {
      setListType("quiz");
    } else if (Object.values(PostListTitles).includes(title)) {
      setListType("post");
    }
    const fetchData = async () => {
      try {
        let data = null;

        if (title === PostListTitles.MY_POST_LIST) {
          data = await getMyPostList(sortOption, currentPage);
        } else if (title === PostListTitles.MY_LIKED_LIST) {
          data = await getMyLikedPostList(currentPage);
        } else if (title === QuizListTitles.MY_QUIZ_LIST) {
          data = await getMyQuizList(sortOption, currentPage);
        } else if (title === QuizListTitles.MY_PINNED_LIST) {
          data = await getMyPinnedQuizList(sortOption, currentPage);
        } else if (title === QuizListTitles.MY_LIKED_LIST) {
          data = await getMyLikedQuizList(sortOption, currentPage);
        } else if (title === QuizListTitles.MY_CORRECT_LIST) {
          data = await getMyCorrectQuizList(currentPage);
        } else if (title === QuizListTitles.MY_INCORRECT_LIST) {
          data = await getMyIncorrectQuizList(currentPage);
        }

        if (data) {
          setListData(data);
        }
      } catch (error) {
        console.error("목록을 불러오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchData();
  }, [currentPage, sortOption]);

  if (!listData || listData.content.length === 0) {
    return <NoDataMessage>표시할 리스트가 없습니다.</NoDataMessage>;
  }

  const handlePageChange = (page) => {
    if (page < 0 || page >= listData.totalPages) return;
    setCurrentPage(page);
  };

  return (
    <DetailListContainer>
      <Header>
        <Title>{title}</Title>
        <DetailSortDropdown onSelectSortOption={handleSelectSort} title={title} />
      </Header>
      <List>
        {listType === "quiz" ? (
          listData.content.map((item) => (
            <ListItem key={item.quizId}>
              <StyledLink to={`/quiz/play/${item.quizId}`}>{item.quizTitle}</StyledLink>
              <ItemDetail>
                <strong>작성자:</strong> {item.nickname || item.author}
              </ItemDetail>
            </ListItem>
          ))
        ) : (
          listData.content.map((item) => (
            <ListItem key={item.postId}>
              <StyledLink to={`/post/${item.postId}`}>{item.postTitle}</StyledLink>
              <ItemDetail>
                <strong>작성자:</strong> {item.nickname || item.author}
              </ItemDetail>
            </ListItem>
          ))
        )}
      </List>

      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={listData.first}
        >
          이전
        </PageButton>

        <PageIndicator>
          {currentPage + 1} / {listData.totalPages}
        </PageIndicator>

        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={listData.last}
        >
          다음
        </PageButton>
      </Pagination>
    </DetailListContainer>
  );
};

export default DetailList;

// Styled Components
const DetailListContainer = styled.div`
  width: 80%;
  padding: 20px;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  padding: 3px;
`;

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const ItemDetail = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 0.8rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  &:disabled {
    background-color: #ccc;
    cursor: default;
  }
`;

const PageIndicator = styled.span`
  font-size: 0.8rem;
  color: #333;
`;

const NoDataMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.8rem;
`;
