import api from '../apiService'; // Axios 인스턴스 또는 API 헬퍼 파일을 import

// 스터디 그룹원 조회
export const getStudyMembers = async (studyId) => {
    
  try {
    const response = await api.get(`/study/${studyId}/member`);

    console.log(response.data);
    return response.data; // 성공 시 스터디원 목록 반환
  } catch (error) {
    if (error.response) {
      const { status, message } = error.response.data;

      if (status === 403) {
        throw new Error(message || '스터디원이 아닙니다.');
      } else if (status === 404) {
        throw new Error(message || '존재하지 않는 스터디입니다.');
      } else {
        throw new Error('스터디원 목록 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } else {
      throw new Error('서버와 연결할 수 없습니다.');
    }
  }
};
