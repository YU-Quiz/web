import { Link, useLoaderData } from "react-router-dom";
import ListBox from "../../components/mypage/ListBox";
import "../../styles/mypage/MyPage.scss";
import { getMyCorrectQuizList, getMyIncorrectQuizList, getMyLikedQuizList, getMyPinnedQuizList, getMyQuizList } from "../../services/mypage/myList";
import QuizListBox from "../../components/mypage/QuizListBox";

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
  console.log(data);

  return (
    <div className="dashboard-container">
      <Link to="/" className="my-home-btn">
        홈으로
      </Link>
      <div className="row">
        <ListBox title="알림함" items={[]} />
        <QuizListBox title="작성한 퀴즈 목록" items={data.myQuizList.content} />
        <ListBox title="작성한 게시글 목록" items={[]} />
      </div>
      <div className="row">
        <QuizListBox title="즐겨찾기 목록" items={data.myPinnedQuizList.content} />
        <QuizListBox title="풀린 문제 목록" items={data.myCorrectQuizList.content} />
        <QuizListBox title="좋아요한 퀴즈 목록" items={data.myLikedQuizList.content} />
      </div>
    </div>
  );
};

export default MyPage;
