import { HttpStatusCode } from "axios";
import api from "../apiService"; // Axios 인스턴스
import { toast } from "react-toastify";

// 알림 리스트 조회
const getNotifications = async (
  page = 0,
  sort = "DATE_DESC",
  view = "UNCHECKED"
) => {
  try {
    const params = { page, sort, view };

    const response = await api.get(`/users/my/alert`, { params });
    return response.data;
  } catch (error) {
    toast.error("알림 기능을 연결할 수 없습니다.");
  }
};

// 알림 읽음 처리
const markNotificationAsRead = async (notificationIds) => {
  try {
    const response = await api.post(`/users/my/alert`, notificationIds);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === HttpStatusCode.BadRequest) {
        throw new Error(`${error.response.data}`);
      } else {
        throw new Error(
          "알림 읽음 처리 중 문제가 발생했습니다. 다시 시도해주세요."
        );
      }
    } else {
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { getNotifications, markNotificationAsRead };
