import api from "../apiService";

const SORT_OPTIONS = {
  LIKE_DESC: "LIKE_DESC",
  LIKE_ASC: "LIKE_ASC",
  VIEW_DESC: "VIEW_DESC",
  VIEW_ASC: "VIEW_ASC",
  DATE_DESC: "DATE_DESC",
  DATE_ASC: "DATE_ASC",
  LIKED_DATE_DESC: "LIKED_DATE_DESC",
  LIKED_DATE_ASC: "LIKED_DATE_ASC",
  QUIZ_DATE_DESC: "QUIZ_DATE_DESC",
  QUIZ_DATE_ASC: "QUIZ_DATE_ASC",
};

// 작성한게시글 목록 불러오기
const getMyPostList = async(sort=SORT_OPTIONS.DATE_DESC,page=0)=>{
  try {
    const params = {};

    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;
    const response = await api.get("posts/my", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('작성한 게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};

// 게시글 좋아요 목록 불러오기
const getMyLikedPostList = async (page=0) => {
  try {
    const params = {};

    if (page >= 0) params.page = page;

    const response = await api.get("posts/liked", {params: params});
    // console.log("service: ", response.data);
    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('좋아요한 게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};

// 즐겨찾기 퀴즈목록 불러오기
const getMyPinnedQuizList = async (sort=SORT_OPTIONS.LIKED_DATE_DESC, page=0) =>{
  try {
    const params = {};

    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.QUIZ_DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;

    const response = await api.get("quizzes/pinned", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('즐겨찾기한 퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

// 작성한 퀴즈목록 불러오기
const getMyQuizList = async (sort=SORT_OPTIONS.DATE_DESC, page=0) =>{
  try {
    const params = {};

    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;

    const response = await api.get("quizzes/my", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('작성한 퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

// 좋아요 퀴즈목록 불러오기
const getMyLikedQuizList = async (sort=SORT_OPTIONS.LIKED_DATE_DESC, page=0) =>{
  try {
    const params = {};

    if (sort && Object.values(SORT_OPTIONS).includes(sort)) {
      params.sort = sort;
    } else {
      params.sort = SORT_OPTIONS.LIKED_DATE_DESC; // 기본값 설정
    }
    if (page >= 0) params.page = page;

    const response = await api.get("quizzes/liked", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('좋아요한 퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

// 틀린 퀴즈목록 불러오기
const getMyIncorrectQuizList = async (page=0) =>{
  try {
    const params = {};

    if (page >= 0) params.page = page;

    const response = await api.get("quizzes/incorrect", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('틀린 퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

// 맞은 퀴즈목록 불러오기
const getMyCorrectQuizList = async (page=0) =>{
  try {
    const params = {};

    if (page >= 0) params.page = page;

    const response = await api.get("quizzes/correct", {params: params});

    return response.data;
  } catch (error) {
    if(error.response){
        throw new Error('맞은 퀴즈 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
    }else{
        throw new Error('서버와 연결할 수 없습니다.');
    }
  }
}

export { getMyPostList, getMyLikedPostList, getMyPinnedQuizList, getMyQuizList, getMyLikedQuizList, getMyIncorrectQuizList, getMyCorrectQuizList };