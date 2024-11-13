import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import styled from "styled-components";
import {
  getMyCorrectQuizList,
  getMyIncorrectQuizList,
  getMyLikedPostList,
  getMyLikedQuizList,
  getMyPinnedQuizList,
  getMyPostList,
  getMyQuizList,
} from "../../services/mypage/myList";
import QuizListBox from "../../components/mypage/QuizListBox";
import DetailList from "../../components/mypage/DetailList";
import PostListBox from "../../components/mypage/PostListBox";
import ProfileCard from "../../components/mypage/ProfileCard";
import { PostListTitles, QuizListTitles } from "../../constants/mypage/LIstTitles";



export async function MyPageLoader() {
  const [
    myPostList,
    myLikedPostList,
    myQuizList,
    myLikedQuizList,
    myPinnedQuizList,
    myCorrectQuizList,
    myIncorrectQuizList,
  ] = await Promise.all([
    getMyPostList(0),
    getMyLikedPostList(0),
    getMyQuizList(0),
    getMyLikedQuizList(0),
    getMyPinnedQuizList(0),
    getMyCorrectQuizList(0),
    getMyIncorrectQuizList(0),
  ]);

  return {
    myPostList,
    myLikedPostList,
    myQuizList,
    myLikedQuizList,
    myPinnedQuizList,
    myCorrectQuizList,
    myIncorrectQuizList,
  };
}

const MyPage = () => {
  const data = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleModalOpen = (title) => {
    setModalTitle(title);
    setModalOpen(true);
  };

  const DetailModal = () => (
    modalOpen && (
      <Overlay onClick={() => setModalOpen(false)}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <DetailList title={modalTitle} />
        </ModalContainer>
      </Overlay>
    )
  );

  return (
    <DashboardContainer>
      <ProfileCard />
      <DetailModal />
      <Row>
        <PostListBox title={PostListTitles.MY_POST_LIST} items={data.myPostList} handleModalOpen={handleModalOpen} />
        <PostListBox title={PostListTitles.MY_LIKED_LIST} items={data.myLikedPostList} handleModalOpen={handleModalOpen} />
        <QuizListBox title={QuizListTitles.MY_QUIZ_LIST} items={data.myQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title={QuizListTitles.MY_PINNED_LIST} items={data.myPinnedQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title={QuizListTitles.MY_LIKED_LIST} items={data.myLikedQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title={QuizListTitles.MY_CORRECT_LIST} items={data.myCorrectQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title={QuizListTitles.MY_INCORRECT_LIST} items={data.myIncorrectQuizList} handleModalOpen={handleModalOpen} />
      </Row>
    </DashboardContainer>
  );
};

export default MyPage;

// Styled Components
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Make sure it's above everything else */
`;

const ModalContainer = styled.div`
  width: 70%;
  height: 90%;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

