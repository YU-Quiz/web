// src/router/index.js
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import QuizListPage from "../pages/quiz/QuizListPage";
import { QuizSolve } from "../pages/quiz/QuizSolve";
import { QuizCreator } from "../pages/quiz/QuizCreator";
import { QuizFix } from "../pages/quiz/QuizFix";
import MyPageLayout from "../pages/mypage/MyPageLayout";
import MyPage, { MyPageLoader } from "../pages/mypage/MyPage";
import EditProfile from "../pages/mypage/EditProfile";
import { Login } from "../pages/login/Login";
import { Register } from "../pages/register/Register";
import PostListPage, { postListLoader } from "../pages/post/PostListPage";
import PostCreator from "../pages/post/PostCreator";
import PostFix from "../pages/post/PostFix";
import PostView, { postViewLoader } from "../pages/post/PostView";
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
import StudyGroupList, { studyListLoader } from "../pages/study/StudyGroupList";
import StudyGroupDetail, { studyDetailsLoader } from "../pages/study/StudyGroupDetail";
import AdminPostsControl from "../pages/admin/AdminPostsControl";
import AdminQuizControl from "../pages/admin/AdminQuizControl";
import AdminReportsControl from "../pages/admin/AdminReportsControl";
import RootLayout from "../pages/RootLayout";
import Home from "../pages/Home";
import StudyDetailsPage from "../pages/study/StudyGroupDetail";
import StudyGroupCreator from "../pages/study/StudyGroupCreator";
import StudyGroupFix from "../pages/study/StudyGroupFix";
import ChatRoom, { chatRoomLoader } from "../pages/study/ChatRoom";
import StudyNoticesListPage, { studyNoticesListLoader } from "../pages/study/StudyNotices";
import StudyNoticeCreator from "../pages/study/StudyNoticeCreator";
import StudyPostsListPage, { studyPostsListLoader } from "../pages/study/StudyPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <StudyGroupList />,
            loader: studyListLoader,
          },
          {
            path: "new",
            element: <StudyGroupCreator />,
          },
          {
            path: ":studyId",
            element: <StudyGroupDetail />,
            loader: studyDetailsLoader,
          },
          {
            path: ":studyId/edit",
            element: <StudyGroupFix />,
            // loader: studyDetailsLoader,
          },
          {
            path: ":studyId/chat/:chatId",
            element: <ChatRoom />,
            loader: chatRoomLoader,
          },
          {
            path: ":studyId/notices",
            element: <StudyNoticesListPage />,
            loader: studyNoticesListLoader,
          },
          {
            path: ":studyId/notices/new",
            element: <StudyNoticeCreator />,
          },
          {
            path: ":studyId/posts",
            element: <StudyPostsListPage />,
            loader: studyPostsListLoader,
          },
          {
            path: ":studyId/posts/new",
            // element: <StudyPostCreator />,
          },
          {
            path: ":studyId/quizseries",
            element: <StudyGroupFix />,
            // loader: studyDetailsLoader,
          },
        ],
      },
      {
        path: "my",
        element: <Outlet />,
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
        element: <Outlet />, // Use Outlet to render child routes only
        children: [
          {
            index: true,
            element: <PostListPage />,
            loader: postListLoader,
          },
          {
            path: "new",
            element: <PostCreator />,
          },
          {
            path: ":postId/edit",
            element: <PostFix />,
          },
          {
            path: ":postId",
            element: <PostView />,
            loader: postViewLoader,
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
  {
    path: "/admin",
    element: <AdminPageLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="users-control" replace />,
        // loader: MyPageLoader,
      },
      {
        path: "users-control",
        element: <AdminUsersControl />,
        // loader: AdminUsersLoader,
      },
      {
        path: "posts-control",
        element: <AdminPostsControl />,
      },
      {
        path: "quizzes-control",
        element: <AdminQuizControl />,
      },
      {
        path: "reports-control",
        element: <AdminReportsControl />,
      },
    ],
  },
]);

export default router;
