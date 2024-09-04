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


export { handlerCheckDupID, handlerCheckDupNick };
