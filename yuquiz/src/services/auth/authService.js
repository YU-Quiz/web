import axios, { HttpStatusCode } from "axios";
import { setAccessToken } from "../../utils/token";

const SERVER_API = process.env.REACT_APP_YUQUIZ;

// 리프레시토큰을 이용하여 엑세스토큰 재발급
const reissueAccessToken = async () =>{
    try{
        const response = await axios.post(`${SERVER_API}auth/token-reissue`,{withCredentials: true,}); // 쿠키와 함께 요청 전송

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        
        return response.data;
    }catch(error){
        if(error.response){
            if(error.response.status === HttpStatusCode.NotFound){ // 404
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('토큰 재발급 중 문제 발생, 다시 시도해 주세요');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

export {reissueAccessToken};