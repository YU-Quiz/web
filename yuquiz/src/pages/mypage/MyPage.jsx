import ListBox from "../../components/mypage/ListBox";
import "../../styles/mypage/MyPage.scss";

const MyPage = () => {
    // 샘플 데이터
  const data = {
    alerts: ['새로운 알림 1', '새로운 알림 2', '새로운 알림 3', '새로운 알림 4', '새로운 알림 5'],
    quizzes: ['퀴즈 1', '퀴즈 2', '퀴즈 3', '퀴즈 4', '퀴즈 5'],
    posts: [],
    bookmarks: ['즐겨찾기 1', '즐겨찾기 2', '즐겨찾기 3', '즐겨찾기 4', '즐겨찾기 5'],
    solvedProblems: [],
    favorites: []
  };

    return (
      <div className="dashboard-container">
      <button className="my-home-btn">홈으로</button>
      <div className="row">
          <ListBox title="알림함" items={data.alerts} />
          <ListBox title="작성한 퀴즈 목록" items={data.quizzes} />
          <ListBox title="작성한 게시글 목록" items={data.posts} />
      </div>
      <div className="row">
          <ListBox title="즐겨찾기 목록" items={data.bookmarks} />
          <ListBox title="풀린 문제 목록" items={data.solvedProblems} />
          <ListBox title="좋아요 목록" items={data.favorites} />
      </div>
  </div>
      );
}

export default MyPage;