import React from "react";
import "../../styles/mypage/DetailList.scss";
import { Link } from "react-router-dom";

const DetailList = ({ listData, title, listType }) => {
  if (!listData || listData.content.length === 0) {
    return <p>표시할 리스트가 없습니다.</p>;
  }

  return (
    <div className="detail-list-container">
      <h2>{title}</h2>
      <ul>
        {listData.content.map((item) => (
          listType === 'quiz' ? (
            <li key={item.quizId}>
              <Link to={`/quiz/play/${item.quizId}`}>
                {item.quizTitle}
              </Link>
              <p><strong>작성자:</strong> {item.nickname || item.author}</p>
            </li>
          ) : (
            <li key={item.postId}>
              <Link to={`/post/view/${item.postId}`}>
                {item.postTitle}
              </Link>
              <p><strong>작성자:</strong> {item.nickname || item.author}</p>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default DetailList;