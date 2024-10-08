import { Link, useLoaderData } from "react-router-dom";
import ListBox from "../../components/mypage/ListBox";
import "../../styles/mypage/MyPage.scss";
import { getMyLikedQuizList, getMyQuizList } from "../../services/mypage/myList";
import { useState } from "react";

// loader
export async function MyPageLoader() {
  const [myQuizList, myLikedQuizList] = await Promise.all([
    getMyQuizList(0),
    getMyLikedQuizList(0),
  ]);

  return {
    myQuizList,
    myLikedQuizList,
  };
}

const MyPage = () => {
  const data = useLoaderData();

  // const navigate = useNavigate();
  const [myQuizList, setMyQuizList] = useState(data.myQuizList);
  const [myLikedQuizList, setMyLikedQuizList] = useState(data.myLikedQuizList);

  return (
    <div className="dashboard-container">
      <Link to="/" className="my-home-btn">
        홈으로
      </Link>
      <div className="row">
        {/* <ListBox title="알림함" items={data.alerts} /> */}
        <ListBox title="작성한 퀴즈 목록" items={myQuizList.content} />
        {/* <ListBox title="작성한 게시글 목록" items={data.posts} /> */}
      </div>
      <div className="row">
        {/* <ListBox title="즐겨찾기 목록" items={data.bookmarks} /> */}
        {/* <ListBox title="풀린 문제 목록" items={data.solvedProblems} /> */}
        <ListBox title="좋아요 목록" items={myLikedQuizList.content} />
      </div>
    </div>
  );
};

export default MyPage;
