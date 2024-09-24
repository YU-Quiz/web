import { HttpStatusCode } from "axios";
import api from "../apiService";

// 카테고리 받기
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

// 좋아요
const postLike = async(postId) =>{
    try {
        const response = await api.post(`/posts/${postId}/like`, {});

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status === HttpStatusCode.NotFound){
                throw new Error(`${error.response.message}`);
            }else if(error.response.status === HttpStatusCode.Conflict){
                throw new Error(`${error.response.message}`);
            }
            else{
                // console.log("에러");
                throw new Error('좋아요중 문제발생. 다시 시도해주세요.');
            };
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    }
}

// 좋아요 취소
const postLikeCancel = async(postId) =>{
    try {
        const response = await api.delete(`/posts/${postId}/like`, {});

        return response.data;
    } catch (error) {
        if(error.response){
            throw new Error('좋아요 취소중 문제발생. 다시 시도해주세요.');
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    }
}

export {getCategories, postLike, postLikeCancel};