// Access Token을 sessionStorage에 저장
export const setAccessToken = (token) => {
    sessionStorage.setItem('accessToken', token);
  };
  
  // Access Token을 sessionStorage에서 가져오기
  export const getAccessToken = () => {
    return sessionStorage.getItem('accessToken');
  };
  
  // Access Token을 sessionStorage에서 삭제
  export const removeAccessToken = () => {
    sessionStorage.removeItem('accessToken');
  };
  