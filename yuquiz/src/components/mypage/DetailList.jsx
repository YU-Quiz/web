import React, { useEffect, useState } from "react";
import "../../styles/mypage/DetailList.scss";
import { Link } from "react-router-dom";
import { getMyCorrectQuizList, getMyIncorrectQuizList, getMyLikedPostList, getMyLikedQuizList, getMyPinnedQuizList, getMyPostList, getMyQuizList } from "../../services/mypage/myList";
import DetailSortDropdown from "./DetailSortDropdown";

// Post와 Quiz 타이틀
const PostListTitles = {
  MY_POST_LIST: "작성한 게시글 목록",
  MY_LIKED_LIST: "좋아요한 게시글 목록",
};

const QuizListTitles = {
  MY_QUIZ_LIST: "작성한 퀴즈 목록",
  MY_PINNED_LIST: "즐겨찾기 목록",
  MY_LIKED_LIST: "좋아요한 퀴즈 목록",
  MY_CORRECT_LIST: "푼 문제 목록",
  MY_INCORRECT_LIST: "틀린 문제 목록",
};

const DetailList = ({ title }) => {
  const [listData, setListData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [listType, setListType] = useState("post");
  const [sortOption, setSortOption] = useState("");

  const handleSelectSort = (sortOption) =>{
    setSortOption(sortOption);
  }

  // title을 기준으로 listType 결정
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
    return <p>표시할 리스트가 없습니다.</p>;
  }

  const handlePageChange = (page) => {
    if (page < 0 || page >= listData.totalPages) return;  // 페이지 범위 체크
    setCurrentPage(page);
  };

  return (
    <div className="detail-list-container">
      <h2>{title}</h2>
      <DetailSortDropdown onSelectSortOption={handleSelectSort} title={title}/>
      <ul>
        {listType === "quiz" ? (
          listData.content.map((item) => (
            <li key={item.quizId}>
              <Link to={`/quiz/play/${item.quizId}`}>{item.quizTitle}</Link>
              <p>
                <strong>작성자:</strong> {item.nickname || item.author}
              </p>
            </li>
          ))
        ) : (
          listData.content.map((item) => (
            <li key={item.postId}>
              <Link to={`/post/view/${item.postId}`}>{item.postTitle}</Link>
              <p>
                <strong>작성자:</strong> {item.nickname || item.author}
              </p>
            </li>
          ))
        )}
      </ul>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={listData.first}
        >
          이전
        </button>

        <span>
          {currentPage + 1} / {listData.totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={listData.last}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default DetailList;
