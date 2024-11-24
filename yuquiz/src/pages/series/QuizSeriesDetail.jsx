import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addQuizToSeries,
  deleteQuizFromSeries,
  getQuizListInSeries,
  getSeriesDetail,
} from "../../services/quizseries/seriesManage";
import ForAddQuizList from "../../components/quizSeries/ForAddQuizList";
import { QuizCard } from "../../components/quizlist/QuizCard";
import useAuthStore from "../../stores/auth/authStore";

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, 200px);
  padding: 20px;
  width: 100%;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  justify-content: center;
  position: relative;
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

const QuizAddButton = styled.button`
  border-radius: 8px;
  background: white;
  font-weight: bold;
  font-size: 30px;
  color: gray;
  border: 1px solid gray;

  &:hover {
    background: silver;
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

const ContextMenu = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 10px;

  button {
    display: block;
    width: 100%;
    background: none;
    border: none;
    text-align: left;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }
`;

const QuizSeriesDetail = () => {
  const { seriesId } = useParams();
  const navigate = useNavigate();
  const [seriesDetail, setSeriesDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizList, setQuizList] = useState([]);
  const [contextMenu, setContextMenu] = useState(null); // 우클릭 메뉴 상태
  const [selectedQuiz, setSelectedQuiz] = useState(null); // 선택된 퀴즈
  const { userInfo } = useAuthStore();
  useEffect(() => {
    const fetchSeriesDetail = async () => {
      try {
        const data = await getSeriesDetail(seriesId);
        const quizList = await getQuizListInSeries(seriesId);
        setSeriesDetail(data);
        setQuizList(quizList.content || []);
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
      await addQuizToSeries(seriesId, quiz.quizId);
      setQuizList((prev) => [...prev, quiz]);
      alert("문제가 성공적으로 추가되었습니다!");
    } catch (error) {
      alert(error.message || "문제 추가에 실패했습니다.");
    }
  };

  const handleContextMenu = (e, quiz) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY });
    setSelectedQuiz(quiz);
  };

  const handleDeleteQuiz = async () => {
    if (!selectedQuiz) return;
    try {
      await deleteQuizFromSeries(seriesId, selectedQuiz.quizId); // 삭제 API 호출
      setQuizList((prev) =>
        prev.filter((quiz) => quiz.quizId !== selectedQuiz.quizId)
      );
      setContextMenu(null); // 메뉴 닫기
      alert("퀴즈가 삭제되었습니다.");
    } catch (error) {
      alert("퀴즈 삭제에 실패했습니다.");
    }
  };

  const handleCloseContextMenu = () => setContextMenu(null);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (!seriesDetail) return <p>문제집 정보를 찾을 수 없습니다.</p>;

  return (
    <Container onClick={handleCloseContextMenu}>
      <BackButton onClick={() => navigate(-1)}>⬅️ 돌아가기</BackButton>
      <TitleSection>
        <h2>{seriesDetail.name}</h2>
      </TitleSection>
      <InfoText>작성자: {seriesDetail.creator}</InfoText>
      <InfoText>
        {seriesDetail.studyName ? `스터디 이름:${seriesDetail.studyName}` : ""}
      </InfoText>
      <QuizAddButton onClick={() => setIsModalOpen(true)}>
        + 문제 추가
      </QuizAddButton>
      {quizList.length > 0 ? (
        quizList.map((quiz) => (
          <div
            key={quiz.quizId}
            onContextMenu={(e) => handleContextMenu(e, quiz)}
          >
            <QuizCard quiz={quiz} />
          </div>
        ))
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
      {contextMenu && seriesDetail.creator === userInfo.nickname && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y}>
          <button onClick={handleDeleteQuiz}>삭제</button>
        </ContextMenu>
      )}
    </Container>
  );
};

export default QuizSeriesDetail;
