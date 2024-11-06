import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../../styles/quizseries/QuizSeriesDetail.scss";
import QuizListItem from "../../components/quizlist/QuizListItem";

// 임시 데이터 생성
const tempQuizData = [
  {
    quizId: 1,
    quizTitle: "알고리즘 문제",
    nickname: "QuizMaster",
    likeCount: 10,
    viewCount: 200,
    createdAt: "2024-11-05T10:00:00Z",
    isSolved: null,
    quizType: "MULTIPLE_CHOICE",
    subject: "컴퓨터 과학",
  },
  {
    quizId: 2,
    quizTitle: "자료 구조 문제",
    nickname: "DataGuru",
    likeCount: 5,
    viewCount: 150,
    createdAt: "2024-11-04T12:30:00Z",
    isSolved: true,
    quizType: "MULTIPLE_CHOICE",
    subject: "컴퓨터 과학",
  },
];

const QuizSeriesDetail = () => {
  const { seriesId } = useParams();
  const [seriesDetail, setSeriesDetail] = useState({
    name: "알고리즘 문제집",
    creator: "Admin",
    studyName: "코딩 스터디",
    quizzes: tempQuizData, // 임시 데이터로 quizzes 설정
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        // API 호출을 생략하고 임시 데이터 사용
        // const data = await getSeriesDetail(seriesId);
        // setSeriesDetail(data);
      } catch (error) {
        setError("문제집 정보를 불러오지 못했습니다.");
      }
    };
    fetchSeriesDetail();
  }, [seriesId]);

  if (error) return <p>{error}</p>;

  return (
    <div className="quiz-series-detail">
      <Link to="/series">← 돌아가기</Link>
      <div>
        <h2>{seriesDetail.name}</h2>
        <button>+ 문제 추가</button>
      </div>
      <p>작성자: {seriesDetail.creator}</p>
      <p>스터디 이름: {seriesDetail.studyName || "없음"}</p>

      <div className="quiz-list">
        {seriesDetail.quizzes && seriesDetail.quizzes.length > 0 ? (
          seriesDetail.quizzes.map((quiz) => (
            <QuizListItem key={quiz.quizId} quiz={quiz} />
          ))
        ) : (
          <p>등록된 문제가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default QuizSeriesDetail;
