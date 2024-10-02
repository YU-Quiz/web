import { HttpStatusCode } from "axios";
import api from "../apiService";

// 댓글 생성
const createComment = async(postId, content) =>{
    try {
        const response = await api.post(`/posts/comments/${postId}`, { 
            content
        });

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status === HttpStatusCode.BadRequest){
                throw new Error(`${error.response.data.content}`);
            }else{
                throw new Error('게시글 생성 중 문제 발생. 다시 시도해주세요.');
            };
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    }
}

// 댓글 수정
const editComment = async (commentId, content) =>{
    try {
        console.log(commentId);
        const response = await api.put(`/posts/comments/${commentId}`,{
            content
        });

        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status  === HttpStatusCode.BadRequest){
                throw new Error(`${error.response.data.content}`);
            }else if(error.response.status === HttpStatusCode.Forbidden){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('댓글 수정 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

// 댓글 삭제
const removeComment = async (commentId) =>{
    try {
        const response = await api.delete(`/posts/comments/${commentId}`,{});
        console.log(response.data);
        
        return response.data;
    } catch (error) {
        if(error.response){
            if(error.response.status  === HttpStatusCode.BadRequest){
                throw new Error(`${error.response.data.content}`);
            }else if(error.response.status === HttpStatusCode.Forbidden){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('게시글 댓글 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

export { createComment, editComment, removeComment};