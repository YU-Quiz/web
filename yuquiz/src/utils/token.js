// 토큰 전역상태 관리
let accessToken = null;

// 엑세스토큰 저장
const setAccessToken = (token) =>{
    accessToken = token;
};

// 엑세스토큰 반환
const getAccessToken = () =>{
    return accessToken;
};

// 엑세스토큰 삭제
const removeAccessToken = () =>{
    setAccessToken(null);
};


export {setAccessToken, getAccessToken, removeAccessToken};