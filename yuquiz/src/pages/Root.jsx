import PostCard from "../components/root/PostCard";
import ProfileCard from "../components/root/ProfileCard";
import QuizCard from "../components/root/QuizCard";
import "../styles/root/Root.scss";

const Root = () => {
  
  return (
    <div className="root-container">
        <div className="sidebar">
            <ProfileCard />
        </div>
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="nav-links">
                    <a href="#">Quizzes</a>
                    <a href="#">Posts</a>
                    <a href="#">Leaderboard</a>
                </div>
                <a href="#" className="create-btn">Create Quiz</a>
            </nav>
            <section className="quizzes-container">
                <QuizCard title="What is the capital city of France?" quizType="O/X" />
                <QuizCard title="Who was the first president of the United States?" quizType="선다형" />
                <QuizCard title="What is the chemical symbol for gold?" quizType="단답형" />
                <QuizCard title="What is the chemical symbol for gold?" quizType="O/X" />
            </section>

            <nav className="navbar">
                <div className="nav-links">
                    <a href="#">공지사항</a>
                    <a href="#">자유 게시판</a>
                    <a href="#">풀이 게시판</a>
                </div>
                <a href="#" className="create-btn">Post</a>
            </nav>
            <section className="posts-container">
                <PostCard title="Important Platform Update: New Features and Changes" category="Announcements" isNew={true} />
                <PostCard title="The Ultimate Guide to Acing Your Next Quiz" category="General" isPopular={true} />
                <PostCard title="Unlocking the Secrets of the Universe: A Beginner's Guide to Astrophysics" category="Discussion" isFeatured={true} />
            </section>
        </div>
    </div>
  );
}

export default Root;
