import React from "react";
import "../../styles/mypage/DetailList.scss";
import { Link } from "react-router-dom";

const DetailList = ({ listData }) => {
  if (!listData || listData.content.length === 0) {
    return <p>표시할 리스트가 없습니다.</p>;
  }

  return (
    <div className="detail-list-container">
      <h2>리스트 더보기</h2>
      <ul>
        {listData.content.map((item) => (
          <li key={item.quizId}>
            <Link></Link>
            <Link to={`/quiz/play/${item.quizId}`}>
              {item.quizTitle}
            </Link>
            <p><strong>작성자:</strong> {item.nickname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailList;