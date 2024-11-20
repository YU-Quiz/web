import api from '../apiService'; 

// 일간 채팅 내역 조회
const getDailyChatLogs = async (roomId) => {
    
  try {
    const response = await api.get(`/chat/${roomId}/messages/daily`);

    // console.log(response.data);
    return response.data; 
  } catch (error) {
    if (error.response) {
        throw new Error('일간 채팅 내역 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
    } else {
      throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};

// 날짜별 채팅 내역 조회
const getChatLogsByDate = async (roomId, date) => {
    try {

      const response = await api.delete(`/chat/${roomId}/messages?date=${date}`);
  
      if (response.status === 204) {
        return { message: "멤버 삭제 성공" };
      }
    } catch (error) {
        if (error.response) {
            throw new Error('날짜별 채팅 내역 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
        } else {
          throw new Error('서버와 연결할 수 없습니다.');
        }
    }
  };

  export { getChatLogsByDate, getDailyChatLogs };