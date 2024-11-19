import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaBook } from "react-icons/fa"; // React Icons 사용
import {
  createSeries,
  getSeriesList,
  deleteSeries,
  updateSeries,
} from "../../services/quizseries/seriesManage";
import useAuthStore from "../../stores/auth/authStore";
import BookComponent from "../../components/quizSeries/BookComponent";

// Styled Components
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

const SeriesItem = styled.div`
  position: relative;
  width: 120px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;

  &:hover {
    background-color: #e9ecef;
  }

  svg {
    font-size: 50px;
    color: #3b3b98;
    margin-bottom: 10px;
  }

  h3 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
  }

  .actions {
    display: flex;
    gap: 5px;

    button {
      padding: 5px 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .edit {
      background-color: gray;
      color: white;
    }

    .delete {
      background-color: #dc3545;
      color: white;
    }
  }
`;

const QuizSeriesPage = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

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

  const handleCreateSeries = async (newSeriesName) => {
    try {
      const newSeries = await createSeries({
        name: newSeriesName,
      });
      setSeriesList((prev) => [...prev, newSeries]);
    } catch (error) {
      console.error("문제집 생성에 실패했습니다.");
    }
  };

  const handleEditSeries = async (seriesId, newName) => {
    try {
      await updateSeries(seriesId, { name: newName });
      setSeriesList((prevList) =>
        prevList.map((series) =>
          series.id === seriesId ? { ...series, name: newName } : series
        )
      );
    } catch (error) {
      console.error("문제집 수정에 실패했습니다.");
    }
  };

  const handleDeleteSeries = async (seriesId) => {
    try {
      await deleteSeries(seriesId);
      setSeriesList((prev) => prev.filter((series) => series.id !== seriesId));
    } catch (error) {
      console.error("문제집 삭제에 실패했습니다.");
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
              handleEditSeries={handleEditSeries}
            >
              <FaBook />
              <h3>{series.name}</h3>
              <div className="actions"></div>
            </BookComponent>
          ))
        ) : (
          <p>표시할 문제집이 없습니다.</p>
        )}
      </SeriesList>
    </PageContainer>
  );
};

export default QuizSeriesPage;
