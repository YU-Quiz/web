import axios, { HttpStatusCode } from "axios";
import api from "../apiService";
const SERVER_API = process.env.REACT_APP_YUQUIZ;
const confirmResetPW = async (username, email) => {
  try {
    const response = await axios.post(
      `${SERVER_API}/auth/reset-password/verify-user`,
      {
        username,
        email,
      }
    );
    if (response.status === HttpStatusCode.Ok) {
      return { success: true, message: "재설정 이메일 전송완료" };
    }
  } catch (error) {
    if (error.response && error.response.status === HttpStatusCode.BadRequest) {
      return {
        success: false,
        message: error.response.data.message || "정보를 정확히 입력해주세요.",
      };
    } else {
      console.error("Error in resetPW:", error);
      return {
        success: false,
        message: "서버에 문제가 발생했습니다. 나중에 다시 시도하세요.",
      };
    }
  }
};

const doResetPW = async (username, password, code) => {
  try {
    const response = await axios.post(`${SERVER_API}/auth/reset-password`, {
      username,
      password,
      code,
    });
    if (response.status === HttpStatusCode.Ok) {
      return {
        success: true,
        message: "비밀번호 재설정 완료! 다시 로그인 해보세요!",
      };
    }
  } catch (error) {
    if (error.response && error.response.status === HttpStatusCode) {
      return {
        success: false,
        message:
          error.response.data.message || "입력하신 정보가 유효하지 않습니다.",
      };
    } else {
      console.error("Error in resetPW:", error);
      return {
        success: false,
        message: "서버에 문제가 발생했습니다. 나중에 다시 시도하세요.",
      };
    }
  }
};
export { confirmResetPW, doResetPW };
