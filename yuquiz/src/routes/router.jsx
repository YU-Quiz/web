import { createBrowserRouter } from "react-router-dom";
import { MultipleChoose } from "../components/solveQuiz/MultipleChoose";
import { ShortAnswer } from "../components/solveQuiz/ShortAnswer";
import StarredQuizSolve from "../pages/StarredQuizSolve";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ShortAnswer />, // Root 컴포넌트
  },
]);

export default router;
