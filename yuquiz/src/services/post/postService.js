import axios, { HttpStatusCode } from "axios";
import api from "../apiService";

const SERVER_API = process.env.REACT_APP_YUQUIZ;
// credentials 필요?

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
        const response = await axios.get(`${SERVER_API}/posts/${postId}`,{});

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
        const response = await axios.put(`${SERVER_API}/posts/${postId}`,{
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
        const response = await axios.delete(`${SERVER_API}/posts/${postId}`,{});

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

export {createPost, showPost, editPost, removePost};