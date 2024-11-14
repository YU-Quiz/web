// src/pages/Home.js
import styled from "styled-components";
import banner_video from "../assets/banner_video.mp4";
import { Link } from "react-router-dom";

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
        <SectionTitle>📢 Announcements 📢</SectionTitle>
        <AnnouncementsGrid>
          <AnnouncementCard to={'/posts/1'}>FAQ</AnnouncementCard>
          <AnnouncementCard to={'/posts/2'}>How to<br />create quiz?</AnnouncementCard>
          <AnnouncementCard to={'/posts/3'}>I want join<br />study club</AnnouncementCard>
        </AnnouncementsGrid>
      </AnnouncementsSection>

      <QuizSection>
        <SectionTitle>📝 Try Quiz! 📝</SectionTitle>
        <QuizGrid>
          <QuizCard>Solve<br></br>Quiz</QuizCard>
          <QuizCard>Create<br />Quiz</QuizCard>
          <QuizCard>Explore<br />Quiz Series</QuizCard>
        </QuizGrid>
      </QuizSection>

      <EventsSection>
        <SectionTitle>🎉 Upcoming Events! 🎉</SectionTitle>
        <EventsGrid>
          <EventTitle>coming soon...</EventTitle>
        </EventsGrid>
      </EventsSection>
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
  background: #f3f4f6;
`;

const BannerSection = styled.div`
  position: relative;
  width: 100%;
  height: 540px;
  overflow: hidden;
`;

const BannerVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  margin: 40px 0 20px;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

// Announcements Section
const AnnouncementsSection = styled.div`
  width: 100%;
  padding: 60px 20px;
  background-color: #ffffff;
  text-align: center;
`;

const AnnouncementsGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const AnnouncementCard = styled(Link)`
  width: 200px;
  height: 150px;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

// Quiz Section
const QuizSection = styled.div`
  width: 100%;
  padding: 60px 20px;
  background-color: #f3f4f6;
  text-align: center;
`;

const QuizGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const QuizCard = styled(Link)`
  width: 200px;
  height: 150px;
  background-color: #e8ebed;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

// Events Section
const EventsSection = styled.div`
  width: 100%;
  padding: 60px 20px;
  background-color: #ffffff;
  text-align: center;
`;

const EventsGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const EventCard = styled(Link)`
  width: 250px;
  height: 180px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: #333;
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const EventTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  text-align: center;
`;

const EventDate = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const EventDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  text-align: center;
`;
