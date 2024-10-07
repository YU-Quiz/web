import { HttpStatusCode } from "axios";
import api from "../apiService";

const getMyLikedPostList = async () => {
  try {
    const response = await api.put("users/my", );
    if (response.status === HttpStatusCode.Ok) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to update user info", error);
    return false;
  }
};

export { getMyLikedPostList };

// 
