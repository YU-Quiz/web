import { HttpStatusCode } from 'axios';
import api from '../apiService';
const SERVER_API = process.env.REACT_APP_YUQUIZ;
const handlerSubmitQuiz =async (data)=>{
    try{
        const response = await api.post(`${SERVER_API}/quizzes`, data);
        if (response.status === HttpStatusCode.Ok) {
            alert(response.response||"퀴즈 생성 완료!");
            return true;
        } 
    }
    catch{  
        alert("퀴즈가 유효하지 않습니다.");
    }
}
export {handlerSubmitQuiz};