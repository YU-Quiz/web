import React from "react";
import styled from "styled-components";
import useAuthStore from "../../stores/auth/authStore";
import { Link } from "react-router-dom";

const BookWrapper = styled.div`
  width: 200px;
  height: 300px;
  perspective: 1000px;
  background-color: gray;
  position: relative;
`;

const Book = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const Cover = styled.div`
  width: 100%;
  height: 100%;
  background-color: #a2cce9;
  border-left: 4px solid #71a4c5;
  position: absolute;
  transform-origin: left;
  transform: rotateY(0deg); /* 초기 상태 */
  transition: transform 0.5s ease-in-out; /* 부드러운 회전 효과 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 2; /* 항상 페이지 위로 */
  border-right: 5px solid #d3d3d3; /* 우측 테두리 */
  border-bottom: 5px solid #d3d3d3; /* 하단 테두리 */
`;

const Pages = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  position: absolute;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  backface-visibility: hidden;
  border-right: 5px solid #d3d3d3; /* 우측 테두리 */
  border-bottom: 5px solid #d3d3d3; /* 하단 테두리 */
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  color: #333;
`;

const Author = styled.p`
  font-size: 14px;
  margin: 0;
  color: #666;
`;

const BookHover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:hover ${Cover} {
    transform: rotateY(-160deg); /* 마우스 올리면 160도 회전 */
  }
`;

const BookComponent = (
  { quizSeries },
  handleEditSeries,
  handleDeleteSeries
) => {
  const { id, name, creator } = quizSeries;

  const { userInfo } = useAuthStore();
  return (
    <BookWrapper>
      <BookHover>
        <Book>
          <Cover>
            <Title>{name}</Title>
            <Author>{creator}</Author>
          </Cover>
          <Pages>
            <Link to={`/quizseries/${id}`}>
              <button>Go to Quiz</button>
            </Link>
            {creator === userInfo.nickname && (
              <button
                className="edit"
                onClick={() =>
                  handleEditSeries(id, prompt("새 이름을 입력하세요:"))
                }
              >
                수정
              </button>
            )}
            {creator === userInfo.nickname && (
              <button className="delete" onClick={() => handleDeleteSeries(id)}>
                삭제
              </button>
            )}
          </Pages>
        </Book>
      </BookHover>
    </BookWrapper>
  );
};

export default BookComponent;
