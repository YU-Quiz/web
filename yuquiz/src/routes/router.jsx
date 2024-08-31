import { createBrowserRouter } from "react-router-dom";
import QuizFix from "../pages/quiz/QuizFix";
import QuizCreator from "../pages/quiz/QuizCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root 컴포넌트
  },
]);

export default router;
