// src/router/index.js
import { createBrowserRouter, Outlet } from "react-router-dom";
import Root from "../pages/Root";
import QuizListPage from "../pages/quiz/QuizListPage";
import { QuizSolve } from "../pages/quiz/QuizSolve"; // 퀴즈 풀기 컴포넌트 추가
import { QuizCreator } from "../pages/quiz/QuizCreator";
import { QuizFix } from "../pages/quiz/QuizFix";
import MyPageLayout from "../pages/mypage/MyPageLayout";
import MyPage, { MyPageLoader } from "../pages/mypage/MyPage";
import EditProfile from "../pages/mypage/EditProfile";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import PostListPage from "../pages/post/PostListPage";
import PostCreator from "../pages/post/PostCreator";
import PostFix from "../pages/post/PostFix";
import PostView from "../pages/post/PostView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: <Root />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "my",
        element: <MyPageLayout />,
        children: [
          {
            index: true,
            element: <MyPage />,
            loader: MyPageLoader,
          },
          {
            path: "edit",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "quiz",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: "list",
            element: <QuizListPage />,
          },
          {
            path: "create",
            element: <QuizCreator />,
          },
          {
            path: "edit/:quizId",
            element: <QuizFix />,
          },
          {
            // 퀴즈 풀기 페이지 라우트 추가
            path: "play/:quizId",
            element: <QuizSolve />, // 퀴즈 풀기 컴포넌트 연결
          },
        ],
      },
      {
        path: "posts",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: "list",
            element: <PostListPage />,
          },
          {
            path: "create",
            element: <PostCreator />,
          },
          {
            path: "edit/:postId",
            element: <PostFix />,
          },
          {
            path: "view/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "admin",
        element: <MyPageLayout />,
        children: [
          {
            index: true,
            element: <MyPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
