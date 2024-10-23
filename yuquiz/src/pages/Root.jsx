import { Link } from "react-router-dom";
import PostCard from "../components/root/PostCard";
import ProfileCard from "../components/root/ProfileCard";
import QuizCard from "../components/root/QuizCard";
import "../styles/root/Root.scss";

const Root = () => {
  return (
    <div className="root-container">
        <div className="sidebar">
            <ProfileCard />
            <Link to='/admin/users-control'>관리자 페이지</Link>
        </div>
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="nav-links">
                    <Link to='/quiz/list'>Quizzes</Link>
                    <Link to='/posts/list'>Posts</Link>
                    <Link to='/leaderboard'>LeaderBoard</Link>
                </div>
                <Link to='/quiz/create' className="create-btn">Create Quiz</Link>
            </nav>
            <section className="quizzes-container">
                <QuizCard title="What is the capital city of France?" quizType="O/X" />
                <QuizCard title="Who was the first president of the United States?" quizType="선다형" />
                <QuizCard title="What is the chemical symbol for gold?" quizType="단답형" />
                <QuizCard title="What is the chemical symbol for gold?" quizType="O/X" />
            </section>

            <nav className="navbar">
                <div className="nav-links">
                    <Link to='/posts/list'>공지사항</Link>
                    <Link to='/posts/list'>자유 게시판</Link>
                    <Link to='/posts/list'>풀이 게시판</Link>
                </div>
                <Link to='/posts/create' className="create-btn">Post</Link>
            </nav>
            <section className="posts-container">
                <PostCard title="Important Platform Update: New Features and Changes" category="Announcements" isNew={true} />
                <PostCard title="The Ultimate Guide to Acing Your Next Quiz" category="General" isPopular={true} />
                <PostCard title="Unlocking the Secrets of the Universe: A Beginner's Guide to Astrophysics" category="Discussion" isFeatured={true} />
            </section>
        </div>
    </div>
  );
};

export default Root;
