import { HttpStatusCode } from "axios";
import api from "../apiService";
import { SORT_QUIZ_POST } from "../../constants/sort/SortType";

const SORT_OPTIONS = SORT_QUIZ_POST;
// 게시글 리스트 조회
const getPostsList = async (
  keyword = "",
  categoryId = null,
  sort = SORT_OPTIONS.DATE_DESC,
  page = 0
) => {
  try {
    const params = {};

    if (keyword) params.keyword = keyword;
    if (categoryId) params.categoryId = categoryId;
    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;

    const response = await api.get(`/posts`, {
      params: params,
    });
    // console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error("게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

// 게시글 생성
const createPost = async (categoryId, title, content) => {
  try {
    const response = await api.post(`/posts`, { categoryId, title, content });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.BadRequest) {
        throw new Error(`${error.response.data}`);
      } else {
        console.log("에러");
        throw new Error("게시글 생성 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

// 게시글 조회
const showPost = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`, {});

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound) {
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error("게시글 조회 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

// 게시글 수정
const editPost = async (postId, categoryId, title, content) => {
  try {
    const response = await api.put(`/posts/${postId}`, {
      categoryId: categoryId,
      title: title,
      content: content,
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.BadRequest) {
        throw new Error(`${error.response.data}`);
      } else if (error.response.status === HttpStatusCode.Forbidden) {
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error("게시글 수정 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

// 게시글 삭제
const removePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`, {});

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.Forbidden) {
        throw new Error(`${error.response.data.message}`);
      } else {
        throw new Error("게시글 삭제 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { createPost, showPost, editPost, removePost, getPostsList };
