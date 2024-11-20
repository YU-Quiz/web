import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBook } from "react-icons/fa";
import {
  createSeries,
  getSeriesList,
  deleteSeries,
  updateSeries,
} from "../../services/quizseries/seriesManage";
import BookComponent from "../../components/quizSeries/BookComponent";

const PageContainer = styled.div`
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #218838;
  }
`;

const SeriesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 400px;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 15px;
  }

  input {
    padding: 10px;
    font-size: 16px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.create {
      background-color: #28a745;
      color: white;
      margin-bottom: 10px;

      &:hover {
        background-color: #218838;
      }
    }

    &.cancel {
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
      }
    }
  }
`;

const QuizSeriesPage = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSeriesName, setNewSeriesName] = useState(""); // 입력 값 관리
  const [editSeriesId, setEditSeriesId] = useState(null); // 수정 모드 관리
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // 문제집 목록 불러오기
  useEffect(() => {
    const fetchSeriesList = async () => {
      try {
        const seriesData = await getSeriesList("", "DATE_DESC", currentPage);
        setSeriesList(seriesData.content || []);
        setTotalPages(seriesData.totalPages || 1);
      } catch (error) {
        console.error("문제집 목록을 불러오지 못했습니다.", error);
        setSeriesList([]);
      }
    };

    fetchSeriesList();
  }, [currentPage]);

  const handleCreateSeries = async () => {
    if (!newSeriesName.trim()) {
      alert("문제집 이름을 입력해주세요.");
      return;
    }
    try {
      await createSeries({ name: newSeriesName });
      const updatedSeriesList = await getSeriesList(
        "",
        "DATE_DESC",
        currentPage
      ); // 전체 목록 다시 불러오기
      setSeriesList(updatedSeriesList.content || []);
      setIsModalOpen(false);
      setNewSeriesName(""); // 입력 값 초기화
    } catch (error) {
      console.error("문제집 생성에 실패했습니다.");
      alert("문제집 생성에 실패했습니다.");
    }
  };

  // 문제집 수정
  const handleEditSeries = async (seriesId, newName) => {
    try {
      await updateSeries(seriesId, { name: newName });
      setSeriesList((prevList) =>
        prevList.map((series) =>
          series.id === seriesId ? { ...series, name: newName } : series
        )
      );
      setEditSeriesId(null); // 수정 모드 종료
    } catch (error) {
      console.error("문제집 수정에 실패했습니다.");
      alert("문제집 수정에 실패했습니다.");
    }
  };

  // 문제집 삭제
  const handleDeleteSeries = async (seriesId) => {
    try {
      await deleteSeries(seriesId);
      setSeriesList((prev) => prev.filter((series) => series.id !== seriesId));
    } catch (error) {
      console.error("문제집 삭제에 실패했습니다.");
      alert("문제집 삭제에 실패했습니다.");
    }
  };

  return (
    <PageContainer>
      <Button onClick={() => setIsModalOpen(true)}>+ 문제집 생성</Button>
      <SeriesList>
        {seriesList.length > 0 ? (
          seriesList.map((series) => (
            <BookComponent
              key={series.id}
              quizSeries={series}
              handleDeleteSeries={handleDeleteSeries}
              handleEditSeries={(newName) =>
                handleEditSeries(series.id, newName)
              }
            >
              <FaBook />
              <h3>{series.name}</h3>
            </BookComponent>
          ))
        ) : (
          <p>표시할 문제집이 없습니다.</p>
        )}
      </SeriesList>

      {isModalOpen && (
        <Modal>
          <ModalContent>
            <h2>{editSeriesId ? "문제집 수정" : "문제집 생성"}</h2>
            <input
              type="text"
              value={newSeriesName}
              onChange={(e) => setNewSeriesName(e.target.value)}
              placeholder={
                editSeriesId
                  ? "수정할 이름을 입력하세요"
                  : "문제집 이름을 입력하세요"
              }
            />
            <button
              className="create"
              onClick={
                editSeriesId
                  ? () => handleEditSeries(editSeriesId, newSeriesName)
                  : handleCreateSeries
              }
            >
              {editSeriesId ? "수정" : "생성"}
            </button>
            <button className="cancel" onClick={() => setIsModalOpen(false)}>
              취소
            </button>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default QuizSeriesPage;
