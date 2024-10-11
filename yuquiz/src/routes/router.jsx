// src/router/index.js
import { createBrowserRouter, Outlet } from "react-router-dom";
import Root from "../pages/Root";
import QuizListPage from "../pages/quiz/QuizListPage";
import { QuizSolve } from "../pages/quiz/QuizSolve";
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
import KakaoLoginCallback from "../pages/login/kakao/kakaoLoginCallBack";
import RegisterOauth from "../pages/register/RegisterOauth";

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
        path: "register/oauth",
        element: <RegisterOauth />,
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
            path: "play/:quizId",
            element: <QuizSolve />,
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
      {
        path: "login/oauth2/code/kakao",
        element: <KakaoLoginCallback />,
      },
    ],
  },
]);

export default router;
