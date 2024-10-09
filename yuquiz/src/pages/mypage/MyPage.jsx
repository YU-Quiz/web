import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ListBox from "../../components/mypage/ListBox";
import "../../styles/mypage/MyPage.scss";
import { getMyCorrectQuizList, getMyIncorrectQuizList, getMyLikedQuizList, getMyPinnedQuizList, getMyQuizList } from "../../services/mypage/myList";
import QuizListBox from "../../components/mypage/QuizListBox";
import Modal from 'react-modal';
import DetailList from "../../components/mypage/DetailList";

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
  const [listData, setListData] = useState(null);

  const handleModalOpen = (listData)=>{
    setListData(listData);
    setModalOpen(true);
  };

  // 모달창 생성 함수
  function DetailModal({listData}){
    return(
      <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="리스트 더보기"
          className="detail-report-modal"
          overlayClassName="detail-modal-overlay" /* 배경 어둡게 */
      >
        {listData ? (
          <DetailList listData={listData} />
        ) : (
          <p>리스트가 없습니다.</p>
        )}
      </Modal>
    );
  }

  return (
    <div className="dashboard-container">
      <Link to="/" className="my-home-btn">
        홈으로
      </Link>
      <DetailModal listData={listData}></DetailModal>
      <div className="row">
        <ListBox title="작성한 게시글 목록" items={[]} />
        <QuizListBox title="작성한 퀴즈 목록" items={data.myQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title="즐겨찾기 목록" items={data.myPinnedQuizList} handleModalOpen={handleModalOpen} />
      </div>
      <div className="row">
        <QuizListBox title="좋아요한 퀴즈 목록" items={data.myLikedQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title="푼 문제 목록" items={data.myCorrectQuizList} handleModalOpen={handleModalOpen} />
        <QuizListBox title="틀린 문제 목록" items={data.myIncorrectQuizList} handleModalOpen={handleModalOpen} />
      </div>
    </div>
  );
};

export default MyPage;
