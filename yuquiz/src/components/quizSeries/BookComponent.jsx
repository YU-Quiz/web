import React from "react";
import styled from "styled-components";
import useAuthStore from "../../stores/auth/authStore";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
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
  transition: transform 0.6s ease-in-out; /* 부드러운 회전 효과 */
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
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-left: 10px;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  position: absolute;
  box-shadow: inset 0 0 9px rgba(0, 0, 0, 0.1);
  z-index: 1;
  backface-visibility: hidden;
  border-right: 5px solid #d3d3d3;
  border-bottom: 5px solid #d3d3d3;
`;
const GoToButton = styled(Link)`
  margin-top: 10px
  font-size: 25px;
  border: 1px solid gray;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 30px;
  &:hover {
    background-color: #adadad;
  }
`;
const EditButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 80%;
  border-radius: 8px;
  border: none; /* 추가 */
  background: #1ee84c;
  border: 1px solid gray;
  &:hover {
    background-color: #149932;
  }
`;

const DeleteButton = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  width: 80%;
  border-radius: 8px;
  border: none;
  margin-top: 5px;
  background: red;

  border: 1px solid gray;
  &:hover {
    background-color: #800818;
  }
`;

const Title = styled.h1`
  background: white;
  padding: 10px;
  border-radius: 8px;
  font-size: 18px;
  width: 70%;
  margin: 0;
  border: 3px solid gray;
  color: #333;
  margin-bottom: 70%;
`;

const Author = styled.p`
  font-size: 14px;
  color: #666;
`;

const BookHover = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  &:hover ${Cover} {
    transform: rotateY(-120deg); /* 마우스 올리면 160도 회전 */
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
            <Title title={name}>
              {name.length > 5 ? name.substring(0, 4) + "..." : name}
            </Title>
            <Author>{creator}</Author>
          </Cover>
          <Pages>
            {name}
            <GoToButton to={`/quizseries/${id}`}>
              <FaPencilAlt />
              Go to Quiz
            </GoToButton>
            {creator === userInfo.nickname && (
              <EditButton
                className="edit"
                onClick={() =>
                  handleEditSeries(id, prompt("새 이름을 입력하세요:"))
                }
              >
                수정
              </EditButton>
            )}
            {creator === userInfo.nickname && (
              <DeleteButton
                className="delete"
                onClick={() => handleDeleteSeries(id)}
              >
                삭제
              </DeleteButton>
            )}
          </Pages>
        </Book>
      </BookHover>
    </BookWrapper>
  );
};

export default BookComponent;
