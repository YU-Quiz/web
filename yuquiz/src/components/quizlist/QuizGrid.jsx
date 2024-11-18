import styled from "styled-components";
import { QuizCard } from "../../components/quizlist/QuizCard";

const CardGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, 200px);
  justify-content: center;
`;
export const QuizGrid = ({ currentQuizzes }) => (
  <CardGrid>
    {currentQuizzes.map((quiz, i) => (
      <QuizCard key={i} quiz={quiz} />
    ))}
  </CardGrid>
);
