import { REPORT_SORT_OPTIONS } from "../../constants/admin/reportSortOption";
import api from "../apiService";

const getAdminReports = async (
  sort = REPORT_SORT_OPTIONS.DATE_DESC,
  page = 0
) => {
  try {
    const params = {};

    params.sort = sort;

    if (page >= 0) params.page = page;

    const response = await api.get("/admin/reports", { params });

    return response.data;
  } catch (error) {
    if (error.response) {
      //console.log(error.response);
      throw new Error("신고 목록 불러오는 중 문제 발생. 다시 시도해주세요.");
    } else {
      console.log(error);
      throw new Error("서버와 연결할 수 없습니다.");
    }
  }
};

export { getAdminReports };
