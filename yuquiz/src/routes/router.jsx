// src/router/index.js
import { createBrowserRouter, Outlet } from "react-router-dom";
import Root, { UserInfoLoader } from "../pages/Root";
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
import KakaoLoginCallback from "../pages/login/social/kakaoLoginCallBack";
import RegisterOauth from "../pages/register/RegisterOauth";
import NaverLoginCallback from "../pages/login/social/naverLoginCallBack";
import ReqResetPW from "../pages/login/findpw/ReqResetPW";
import ResResetPW from "../pages/login/findpw/ResResetPW";
import { FindID } from "../pages/login/findID/FindID";
import AdminPageLayout from "../pages/admin/AdminPageLayout";
import ContentTemplate from "../components/admin/ContentTemplate";
import AdminUsersControl from "../pages/admin/AdminUsersControl";
import QuizSeriesPage, { QuizSeries } from "../pages/series/QuizSeries";
import QuizSeriesDetail from "../pages/series/QuizSeriesDetail";
import StudyGroupList from "../pages/study/StudyGroupList";
import StudyGroupDetail from "../pages/study/StudyGroupDetail";

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
        path: "resetPW",
        element: <ReqResetPW />,
      },
      {
        path: "findID",
        element: <FindID />,
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
        //수정필요 현재 프로토타입임
        path: "quizseries",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: "list",
            element: <QuizSeriesPage />,
          },
          {
            path: "create",
            element: <QuizCreator />,
          },
          {
            path: ":seriesId",
            element: <QuizSeriesDetail />,
          },
          {
            path: "play/:quizId",
            element: <QuizSolve />,
          },
        ],
      },
      {
        //현재 임시
        path: "study",
        element: (
          <>
            <Outlet />
          </>
        ),
        children: [
          {
            path: "list",
            element: <StudyGroupList />,
          },
          {
            path: "create",
            element: <QuizCreator />,
          },
          {
            path: ":studyId",
            element: <StudyGroupDetail />,
          },
          {
            path: "play/:quizId",
            element: <QuizSolve />,
          },
        ],
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
        element: <AdminPageLayout />,
        children: [
          {
            index: true,
            element: <ContentTemplate />,
            // loader: MyPageLoader,
          },
          {
            path: "users-control",
            element: <AdminUsersControl />,
            // loader: AdminUsersLoader,
          },
          {
            path: "posts-control",
            element: <ContentTemplate />,
          },
          {
            path: "quizzes-control",
            element: <ContentTemplate />,
          },
          {
            path: "reports-control",
            element: <ContentTemplate />,
          },
          {
            path: "others",
            element: <ContentTemplate />,
          },
        ],
      },
      {
        path: "login/oauth2/code/kakao",
        element: <KakaoLoginCallback />,
      },
      {
        path: "login/oauth2/code/naver",
        element: <NaverLoginCallback />,
      },
      {
        path: "resetPW/req",
        element: <ResResetPW />,
      },
    ],
  },
]);

export default router;
