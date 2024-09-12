import axios, { HttpStatusCode } from "axios";
import api from "../apiService";

const SERVER_API = process.env.REACT_APP_YUQUIZ;
// credentials 필요?--> apiService에서 다해줌

/*
{
    "totalPages": 1,
    "totalElements": 5,
    "first": true,
    "last": true,
    "size": 20,
    "content": [
      {
        "postId": 12,
        "postTitle": "qwe12",
        "nickname": "test1111",
        "categoryName": "공지게시판",
        "createdAt": "2024-08-22T18:28:30.319814",
        "likeCount": 1,
        "viewCount": 0
      },
      {
        "postId": 9,
        "postTitle": "2제목",
        "nickname": "테스터",
        "categoryName": "공지게시판",
        "createdAt": "2024-08-20T15:33:51.620851",
        "likeCount": 0,
        "viewCount": 0
      },
      {
        "postId": 8,
        "postTitle": "새로운 타이틀",
        "nickname": "테스터",
        "categoryName": "자유게시판",
        "createdAt": "2024-08-20T15:33:46.902076",
        "likeCount": 1,
        "viewCount": 0
      },
      {
        "postId": 6,
        "postTitle": "새로운 타이틀",
        "nickname": "테스터",
        "categoryName": "자유게시판",
        "createdAt": "2024-08-20T15:33:34.426304",
        "likeCount": 0,
        "viewCount": 0
      },
      {
        "postId": 4,
        "postTitle": "새로운 타이틀",
        "nickname": "테스터111",
        "categoryName": "자유게시판",
        "createdAt": "2024-08-20T14:57:51.031651",
        "likeCount": 0,
        "viewCount": 0
      }
    ],
    "number": 0,
    "sort": {
      "empty": false,
      "unsorted": false,
      "sorted": true
    },
    "pageable": {
      "pageNumber": 0,
      "pageSize": 20,
      "sort": {
        "empty": false,
        "unsorted": false,
        "sorted": true
      },
      "offset": 0,
      "unpaged": false,
      "paged": true
    },
    "numberOfElements": 5,
    "empty": false
  }
*/

// sort: LIKE_DESC, LIKE_ASC, VIEW_DESC, VIEW_ASC, DATE_DESC, DATE_ASC
// 게시글 리스트 조회
const getPostsList = async (keyword, categoryId, sort, page)=>{
    try{
        const response = await api.get(`/posts`, {  
            params: {
                keyword: keyword,
                categoryId: categoryId,
                sort: sort,
                page: page,
            }
        });
        // console.log(response.data);

        return response.data;
    }catch(error){
        if(error.response){
            throw new Error('게시글 목록 불러오는 중 문제 발생. 다시 시도해주세요.');
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

// 게시글 생성
const createPost = async (categoryId, title, content) =>{
    try{
        const response = await api.post(`/posts`, { categoryId, title, content });

        return response.data;
    }catch(error){
        if(error.response){
            if(error.response.status === HttpStatusCode.BadRequest){
                throw new Error(`${error.response.data}`);
            }else{
                console.log("에러");
                throw new Error('게시글 생성 중 문제 발생. 다시 시도해주세요.');
            };
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

// 게시글 조회
const showPost = async (postId) =>{
    try {
        const response = await api.get(`/posts/${postId}`,{});

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status === HttpStatusCode.NotFound){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('게시글 조회 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

// 게시글 수정
const editPost = async (postId, categoryId, title, content) =>{
    try {
        const response = await api.put(`/posts/${postId}`,{
            categoryId: categoryId,
            title: title,
            content: content
        });

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status  === HttpStatusCode.BadRequest){
                throw new Error(`${error.response.data}`);
            }else if(error.response.status === HttpStatusCode.Forbidden){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('게시글 수정 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

// 게시글 삭제
const removePost = async (postId) =>{
    try {
        const response = await api.delete(`/posts/${postId}`,{});

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status  === HttpStatusCode.Forbidden){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('게시글 삭제 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

const getCategories = async() =>{
    try {
        const response = await api.get('/posts/categories', {});

        return response.data;
    } catch (error) {
        if(error.response){
            throw new Error('카테고리 불러오는 중 문제 발생. 다시 시도해주세요.');
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    }
}

export {createPost, showPost, editPost, removePost, getCategories, getPostsList};