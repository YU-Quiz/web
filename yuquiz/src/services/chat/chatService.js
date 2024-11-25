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
    const response = await api.get(`/chat/${roomId}/messages`, {
      params: { date },
    });
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching chat logs by date:", error.message);
    throw new Error("날짜별 채팅 내역 조회 중 문제가 발생했습니다.");
  }
};

  export { getChatLogsByDate, getDailyChatLogs };