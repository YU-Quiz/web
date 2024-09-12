import axios, { HttpStatusCode } from 'axios';
import { getAccessToken } from '../../utils/token';

const SERVER_API = process.env.REACT_APP_YUQUIZ;
const accessToken = getAccessToken();
const handlerSubmitQuiz =async (data)=>{
    try{
        const response = await axios.post(`${SERVER_API}/quizzes`, data, {
            headers: {
              'Authorization': `${accessToken}`, 
              'Content-Type': 'application/json',
            },
          });
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