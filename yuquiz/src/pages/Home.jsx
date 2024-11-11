// src/pages/Home.js
import { Link } from "react-router-dom";
import ProfileCard from "../components/root/ProfileCard";
import QuizCard from "../components/root/QuizCard";
import PostCard from "../components/root/PostCard";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const DashboardContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin-bottom: 20px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    padding: 8px;

    &:hover {
      color: #007bff;
    }
  }
`;

const CreateButton = styled(Link)`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

const QuizzesContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const PostsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Home = () => {
  return (
    <Container>
      <DashboardContainer>
        <Navbar>
          <NavLinks>
            <Link to="/quiz/list">Quizzes</Link>
            <Link to="/posts/list">Posts</Link>
            <Link to="/leaderboard">LeaderBoard</Link>
            <Link to="/quizseries/list">Quiz Series</Link>
            <Link to="/study/list">Study</Link>
          </NavLinks>
          <CreateButton to="/quiz/create">Create Quiz</CreateButton>
        </Navbar>
        <QuizzesContainer>
          <QuizCard title="What is the capital city of France?" quizType="O/X" />
          <QuizCard title="Who was the first president of the United States?" quizType="선다형" />
          <QuizCard title="What is the chemical symbol for gold?" quizType="단답형" />
          <QuizCard title="What is the chemical symbol for gold?" quizType="O/X" />
        </QuizzesContainer>

        <Navbar>
          <NavLinks>
            <Link to="/posts/list">공지사항</Link>
            <Link to="/posts/list">자유 게시판</Link>
            <Link to="/posts/list">풀이 게시판</Link>
          </NavLinks>
          <CreateButton to="/posts/create">Post</CreateButton>
        </Navbar>
        <PostsContainer>
          <PostCard
            title="Important Platform Update: New Features and Changes"
            category="Announcements"
            isNew={true}
          />
          <PostCard
            title="The Ultimate Guide to Acing Your Next Quiz"
            category="General"
            isPopular={true}
          />
          <PostCard
            title="Unlocking the Secrets of the Universe: A Beginner's Guide to Astrophysics"
            category="Discussion"
            isFeatured={true}
          />
        </PostsContainer>
      </DashboardContainer>
    </Container>
  );
};

export default Home;
