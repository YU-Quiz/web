// src/pages/Home.js
import { Link } from "react-router-dom";
import ProfileCard from "../components/root/ProfileCard";
import QuizCard from "../components/root/QuizCard";
import PostCard from "../components/root/PostCard";
import styled from "styled-components";


const Home = () => {
  return (
    <HomeContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: blue;
`;
