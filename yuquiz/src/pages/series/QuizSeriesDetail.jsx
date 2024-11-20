import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import QuizListItem from "../../components/quizlist/QuizListItem";
import {
  addQuizToSeries,
  getSeriesDetail,
} from "../../services/quizseries/seriesManage";
import QuizListPage from "../quiz/QuizListPage";
import ForAddQuizList from "../../components/quizSeries/ForAddQuizList";

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 24px;
    margin: 0;
  }

  button {
    padding: 8px 12px;
    font-size: 14px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #218838;
    }
  }
`;

const InfoText = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #333;
`;

const QuizList = styled.div`
  margin-top: 20px;

  p {
    font-size: 16px;
    color: #666;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 80%;
  max-width: 600px;
  height: 80%;
  overflow-y: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;
const QuizSeriesDetail = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [seriesDetail, setSeriesDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [quizList, setQuizList] = useState([]);
  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        const data = await getSeriesDetail(seriesId);
        setSeriesDetail(data);
        setQuizList(data.quizzes || []);
      } catch (error) {
        setError("문제집 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchSeriesDetail();
  }, [seriesId]);

  const handleAddQuizToSeries = async (quiz) => {
    try {
      await addQuizToSeries(seriesId, quiz.quizId); // 서버에 추가 요청
      setQuizList((prev) => [...prev, quiz]); // quizList 상태 업데이트
      alert("문제가 성공적으로 추가되었습니다!");
    } catch (error) {
      alert(error.message || "문제 추가에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!seriesDetail) return <p>문제집 정보를 찾을 수 없습니다.</p>;
  console.log(quizList);
  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← 돌아가기</BackButton>
      <TitleSection>
        <h2>{seriesDetail.name}</h2>
        <button onClick={() => setIsModalOpen(true)}>+ 문제 추가</button>
      </TitleSection>
      <InfoText>작성자: {seriesDetail.creator}</InfoText>
      <InfoText>스터디 이름: {seriesDetail.studyName || "없음"}</InfoText>
      {quizList.length > 0 ? (
        quizList.map((quiz) => <QuizListItem key={quiz.quizId} quiz={quiz} />)
      ) : (
        <p>등록된 문제가 없습니다.</p>
      )}
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <button
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <ForAddQuizList onAddQuiz={handleAddQuizToSeries}></ForAddQuizList>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default QuizSeriesDetail;
