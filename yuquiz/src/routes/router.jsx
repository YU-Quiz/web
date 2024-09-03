import { createBrowserRouter, Outlet } from "react-router-dom";
import Root from "../pages/Root";
import EditProfile from "../pages/mypage/EditProfile";
import QuizListPage from "../pages/quiz/QuizListPage";
import PostListPage from "../pages/post/PostListPage";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import MyPage from "../pages/mypage/MyPage";
import { QuizCreator } from "../pages/quiz/QuizCreator";
import { QuizFix } from "../pages/quiz/QuizFix";
import PostCreator from "../pages/post/PostCreator";
import PostFix from "../pages/post/PostFix";
import PostView from "../pages/post/PostView";
import MyPageLayout from "../pages/mypage/MyPageLayout";

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
        element: <Login />
      },
      {
        path: "register",
        element: <Register />, // 회원가입 컴포넌트
      },
      {
        path: "my",
        element: <MyPageLayout />, // 마이페이지 컴포넌트
        children: [
          {
            index: true,
            element: <MyPage />,
          },
          {
            path: "edit",
            element: <EditProfile />, // 정보 수정하기 컴포넌트
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
            element: <QuizListPage />, // 퀴즈 목록 컴포넌트
          },
          {
            path: "create",
            element: <QuizCreator />, // 퀴즈 생성 컴포넌트
          },
          {
            path: "edit/:quizId",
            element: <QuizFix />, // 퀴즈 수정 컴포넌트 (동적 경로)
          },
          {
            path: "play/:quizId",
            element: <QuizFix />, // 퀴즈 풀기 컴포넌트 (동적 경로)
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
            element: <PostListPage />, // 게시글 목록 컴포넌트
          },
          {
            path: "create",
            element: <PostCreator />, // 게시글 생성 컴포넌트
          },
          {
            path: "edit/:postId",
            element: <PostFix />, // 게시글 수정 컴포넌트 (동적 경로)
          },
          {
            path: "view/:postId",
            element: <PostView />, // 게시글 조회 컴포넌트 (동적 경로)
          },
        ],
      },
      {
        path: "admin",
        element: <MyPageLayout />, // 관리자 페이지 컴포넌트
        children: [
          {
            index: true,
            element: <MyPage />,
          }
        ],
      },
    ],
  },
]);

export default router;
