import axios, { HttpStatusCode } from "axios";
import api from "../apiService";

const SERVER_API = process.env.REACT_APP_YUQUIZ;
const getUser = async () => {
  try {
    const response = await api.get(`/users/my`);

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound) {
        throw new Error(`${error.response.data.message}`);
      } else {
        console.log("에러");
        throw new Error("사용자 정보 조회 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const updateUser = async (nickname, email, majorName, agreeEmail) => {
  try {
    const response = await api.put(`/users/my`, {
      nickname: nickname,
      email: email,
      majorName: majorName,
      agreeEmail: agreeEmail,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.NotFound) {
        throw new Error(`${error.response.data.message}`);
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        throw new Error(`${error.response.data}`);
      } else {
        console.log("에러");
        throw new Error("사용자 정보 수정 중 문제 발생. 다시 시도해주세요.");
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const withdrawUser = async () => {
  try {
    const response = await api.delete(`/users/my`);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("에러");
      throw new Error("회원 탈퇴 중 문제 발생. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

const findUsername = async (email) => {
  try {
    const response = await axios.post(`${SERVER_API}/auth/find-username`, {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("에러");
      throw new Error("ID 찾는 과정에서 오류 발생. 다시 시도해주세요.");
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { getUser, updateUser, withdrawUser, findUsername };
