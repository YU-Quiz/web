import axios, { HttpStatusCode } from "axios";
import { getAccessToken, removeAccessToken, setAccessToken } from "../../../utils/token";

const SERVER_API = process.env.REACT_APP_YUQUIZ;

const login = async(username, password) =>{
    try {
        const response = await axios.post(`${SERVER_API}/auth/sign-in`, {
          username: username,
          password: password
        },{
            withCredentials: true,
        });

        const {accessToken} = response.data;
        setAccessToken(accessToken);
    
        return response.data;
      } catch (error) {
        // 상태코드 처리
        if(error.response){
            if(error.response.status === HttpStatusCode.NotFound){
                throw new Error(`${error.response.data.message}`);
            }else if(error.response.status === HttpStatusCode.Locked){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('로그인 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

const logout = async () =>{
    try {
        const accessToken = getAccessToken();

        const response = await axios.get(`${SERVER_API}/auth/sign-out`, {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Bearer를 포함시켜야 하는가?
            }
        },{
            withCredentials: true,
        });

        // 엑세스토큰 삭제
        removeAccessToken();

        return response.data;
    }catch(error){
        if(error.response){
            if(error.response.status === HttpStatusCode.NotFound){
                throw new Error(`${error.response.data.message}`);
            }else{
                throw new Error('로그아웃 중 문제 발생. 다시 시도해주세요.');
            }
        }else{
            throw new Error('서버와 연결할 수 없습니다.');
        }
    };
};

export {login, logout};
