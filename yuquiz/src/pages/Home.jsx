// src/pages/Home.js
import styled from "styled-components";
import banner_video from "../assets/banner_video.mp4";

const Home = () => {
  return (
    <HomeContainer>
      <BannerSection>
        <BannerVideo autoPlay loop muted>
          <source src={banner_video} type="video/mp4" />
          Your browser does not support the video tag.
        </BannerVideo>
      </BannerSection>

      <AnnouncementsSection>
        <SectionTitle>📢 Announcements</SectionTitle>
        <AnnouncementsGrid>
          <AnnouncementCard>Main Announcement</AnnouncementCard>
          <AnnouncementCard>Announcement 1</AnnouncementCard>
          <AnnouncementCard>Announcement 2</AnnouncementCard>
          <AnnouncementCard>Announcement 3</AnnouncementCard>
        </AnnouncementsGrid>
      </AnnouncementsSection>

      <QuizSection>
        <SectionTitle>📝 Try Quiz!</SectionTitle>
        <QuizGrid>
          <QuizCard>About Quiz</QuizCard>
          <QuizCard>Quiz Types</QuizCard>
          <QuizCard>Quiz Challenges</QuizCard>
        </QuizGrid>
      </QuizSection>

      <StudySection>
        <SectionTitle>📚 Study Together!</SectionTitle>
        <StudyGrid>
          <StudyCard>Study Group 1</StudyCard>
          <StudyCard>Study Group 2</StudyCard>
          <StudyCard>Study Group 3</StudyCard>
        </StudyGrid>
      </StudySection>
    </HomeContainer>
  );
};

export default Home;

// Styled Components
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: none;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 540px;
  overflow: hidden;
  margin-top: 20px;
`;

const BannerVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin: 40px 0 20px;
  font-weight: bold;
  color: #333;
`;

// Announcements Section
const AnnouncementsSection = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: #ffffff;
  text-align: center;
`;

const AnnouncementsGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const AnnouncementCard = styled.div`
  width: 200px;
  height: 150px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
`;

// Quiz Section
const QuizSection = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: #f9f9f9;
  text-align: center;
`;

const QuizGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const QuizCard = styled.div`
  width: 200px;
  height: 150px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
  border-radius: 8px;
`;

// Study Section
const StudySection = styled.div`
  width: 100%;
  padding: 40px 0;
  background-color: #ffffff;
  text-align: center;
`;

const StudyGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const StudyCard = styled.div`
  width: 200px;
  height: 150px;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #333;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
`;
