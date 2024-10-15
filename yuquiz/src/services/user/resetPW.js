import { HttpStatusCode } from "axios";
import api from "../apiService";

export const ResetPW = async (username, email) => {
  try {
    const response = await api.post(`auth/reset-password/verify-user`, {
      username,
      email,
    });
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
