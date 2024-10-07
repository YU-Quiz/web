import { HttpStatusCode } from "axios";
import api from "../apiService";

const submitEditMyInfo = async (updatedData) => {
  try {
    const response = await api.put("users/my", updatedData);
    if (response.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to update user info", error);
    return false;
  }
};

export { submitEditMyInfo };
