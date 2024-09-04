import axios from "axios";

const SERVER_API = process.env.REACT_APP_YUQUIZ;

const handlerCheckDupID = async (data) => {
    try {
        const res = await axios.get(`${SERVER_API}/users/verify-username`, {
            params: { username: data }
        });
        return res;
    } catch (e) {
        console.error(e);
    }
};
const handlerCheckDupNick = async (data) => {
    try {
        const res = await axios.get(`${SERVER_API}/users/verify-nickname`, {
            params: { nickname: data }
        });
        return res;
    } catch (e) {
        console.error(e);
    }
};
const handlerCheckEmail = async (data) => {
    try {
        const res = await axios.post(`${SERVER_API}/users/email/verification-request`, {
            email: data
        });
        return res;
    } catch (e) {
        console.error(e);
    }
};
const handlerCheckEmailVerify = async (data) => {
    try {
        const res = await axios.post(`${SERVER_API}/users/email/code-verification`, {
            email : data.email,
            code : data.code
        });
        return res;
    } catch (e) {
        console.error(e);
    }
};
const handlerSubmit = async (data) =>{
    try{
        const res = await axios.post(`${SERVER_API}/users/email/code-verification`,{
            username: data.username,
            password: data.password,
            nickname: data.nickname,
            email: data.email,
            majorName: data.majorName,
            agreeEmail: data.agreeEmail
        });
        return res;
    }catch(e){
        console.error(e);
    }
}


export { handlerCheckDupID, handlerCheckDupNick, handlerCheckEmail,handlerCheckEmailVerify,handlerSubmit };
