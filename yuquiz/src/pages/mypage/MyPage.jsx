import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ListBox from "../../components/mypage/ListBox";
import "../../styles/mypage/MyPage.scss";
import { getMyCorrectQuizList, getMyIncorrectQuizList, getMyLikedQuizList, getMyPinnedQuizList, getMyQuizList } from "../../services/mypage/myList";
import QuizListBox from "../../components/mypage/QuizListBox";
import Modal from 'react-modal';

// loader
export async function MyPageLoader() {
  const [
    myQuizList,
    myLikedQuizList,
    myPinnedQuizList,
    myCorrectQuizList,
    myIncorrectQuizList
  ] = await Promise.all([
    getMyQuizList(0),
    getMyLikedQuizList(0),
    getMyPinnedQuizList(0),
    getMyCorrectQuizList(0),
    getMyIncorrectQuizList(0),
  ]);

  return {
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

  // 모달창
  function DetailModal(){
    return(
      <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="리스트 더보기"
          className="detail-report-modal"
          overlayClassName="detail-modal-overlay" /* 배경 어둡게 */
      >
        <p>모달오픈</p>
      </Modal>
    );
  }

  return (
    <div className="dashboard-container">
      <Link to="/" className="my-home-btn">
        홈으로
      </Link>
      {/* <button onClick={handleModalOpen}>모달 버튼</button> */}
      <DetailModal></DetailModal>
      <div className="row">
        <ListBox title="작성한 게시글 목록" items={[]} />
        <QuizListBox title="작성한 퀴즈 목록" items={data.myQuizList.content} setModalOpen={setModalOpen} />
        <QuizListBox title="즐겨찾기 목록" items={data.myPinnedQuizList.content} setModalOpen={setModalOpen} />
      </div>
      <div className="row">
        <QuizListBox title="좋아요한 퀴즈 목록" items={data.myLikedQuizList.content} setModalOpen={setModalOpen} />
        <QuizListBox title="푼 문제 목록" items={data.myCorrectQuizList.content} setModalOpen={setModalOpen} />
        <QuizListBox title="틀린 문제 목록" items={data.myIncorrectQuizList.content} setModalOpen={setModalOpen} />
      </div>
    </div>
  );
};

export default MyPage;
