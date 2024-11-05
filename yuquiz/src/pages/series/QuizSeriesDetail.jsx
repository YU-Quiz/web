import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getSeriesDetail } from "../../services/quizseries/seriesManage";
import "../../styles/quizseries/QuizSeriesDetail.scss";

const QuizSeriesDetail = () => {
  const { seriesId } = useParams();
  const [seriesDetail, setSeriesDetail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        const data = await getSeriesDetail(seriesId);
        setSeriesDetail(data);
      } catch (error) {
        setError("문제집 정보를 불러오지 못했습니다.");
      }
    };
    fetchSeriesDetail();
  }, [seriesId]);

  if (error) return <p>{error}</p>;
  if (!seriesDetail) return <p>로딩 중...</p>;

  return (
    <div className="quiz-series-detail">
      <Link to="/series">← 돌아가기</Link>
      <h2>{seriesDetail.name}</h2>
      <p>작성자: {seriesDetail.creator}</p>
      <p>스터디 이름: {seriesDetail.studyName || "없음"}</p>
    </div>
  );
};

export default QuizSeriesDetail;
