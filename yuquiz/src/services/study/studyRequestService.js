import api from '../apiService';

// 멤버 신청목록 조회
const getStudyRequests = async (studyId) => {
    
    try {
      const response = await api.get(`/study/${studyId}/request`);
  
    //   console.log(response.data);
      return response.data; // 성공 시 신청 목록 반환
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
  
        if (status === 403) {
          throw new Error(message || '스터디장이 아닙니다.');
        } else if (status === 404) {
          throw new Error(message || '존재하지 않는 스터디입니다.');
        } else {
          throw new Error('스터디원 신청목록 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        throw new Error('서버와 연결할 수 없습니다.');
      }
    }
  };

// 스터디 가입신청
const requestStudy = async (studyId) => {
    
    try {
      const response = await api.post(`/study/${studyId}/request`);
  
    //   console.log(response.data);
      return response.data; // 성공 시 신청 목록 반환
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
  
        if (status === 404) {
          throw new Error(message || '존재하지 않는 스터디입니다.');
        } else if(status === 409) {
            throw new Error('이미 가입된 스터디입니다.');
        } else {
          throw new Error('스터디원 신청목록 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
      } else {
        throw new Error('서버와 연결할 수 없습니다.');
      }
    }
  };

  // 스터디 가입 수락
const acceptStudyRequest = async (studyId, memberId) => {
    
    try {
      const response = await api.post(`/study/${studyId}/request`, {id: memberId});
  
    //   console.log(response.data);
      return response.data; // 성공 시 신청 목록 반환
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;
  
        if (status === 403) {
            throw new Error(message || '스터디원이 아닙니다.');
          } else if (status === 404) {
            throw new Error(message || '존재하지 않는 스터디입니다.');
          } else {
            throw new Error('스터디원 가입수락 조회 중 문제가 발생했습니다. 다시 시도해주세요.');
          }
      } else {
        throw new Error('서버와 연결할 수 없습니다.');
      }
    }
  };

export {getStudyRequests, requestStudy, acceptStudyRequest};