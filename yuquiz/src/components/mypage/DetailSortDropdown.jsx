import React from 'react';
import '../../styles/post_list_page/CategoryDropdown.scss';

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

const POST_SORT_OPTIONS = {
    LIKE_DESC: "좋아요 많은 순",
    LIKE_ASC: "좋아요 적은 순",
    VIEW_DESC: "조회수 많은 순",
    VIEW_ASC: "조회수 적은 순",
    DATE_DESC: "최신순",
    DATE_ASC: "오래된 순",
  };
const QUIZ_SORT_OPTIONS = {
    LIKE_DESC: "좋아요 많은 순",
    LIKE_ASC: "좋아요 적은 순",
    VIEW_DESC: "조회수 많은 순",
    VIEW_ASC: "조회수 적은 순",
    LIKED_DATE_DESC: "좋아요 최신 순",
    LIKED_DATE_ASC: "좋아요 오래된 순",
    QUIZ_DATE_DESC: "최신순",
    QUIZ_DATE_ASC: "오래된 순",
  };

const DetailSortDropdown = ({ onSelectSortOption, title }) => {
    let SORT_OPTIONS;
  
  // title에 따라 정렬 옵션을 선택하는 switch 문
  switch (title) {
    case PostListTitles.MY_POST_LIST:
    case PostListTitles.MY_LIKED_LIST:
      SORT_OPTIONS = POST_SORT_OPTIONS;
      break;
    case QuizListTitles.MY_QUIZ_LIST:
      SORT_OPTIONS = POST_SORT_OPTIONS;  // 작성한 퀴즈 목록
      break;
    case QuizListTitles.MY_PINNED_LIST:
    case QuizListTitles.MY_LIKED_LIST:
      SORT_OPTIONS = QUIZ_SORT_OPTIONS;  // 좋아요한 퀴즈 목록
      break;
    case QuizListTitles.MY_CORRECT_LIST:
    case QuizListTitles.MY_INCORRECT_LIST:
    default:
      SORT_OPTIONS = {};  // 기본값은 빈 객체
  }

  const handleChange = (e) => {
    onSelectSortOption(e.target.value);
  };

  return (
    <div className="category-dropdown-container">
      <select onChange={handleChange} className="category-dropdown">
        <option value="">정렬</option>
        {Object.keys(SORT_OPTIONS).map((key) => (
          <option key={key} value={key}>
            {SORT_OPTIONS[key]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DetailSortDropdown;
