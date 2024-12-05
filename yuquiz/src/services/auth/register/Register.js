// src/services/authService.js
import api from "../../apiService";
import useAuthStore from "../../../stores/auth/authStore";
import axios, { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

const SERVER_API = process.env.REACT_APP_YUQUIZ;

// 아이디 중복 확인
const handlerCheckDupID = async (InputID, setInputID, setCheckID) => {
  const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

  // 아이디 형식 확인
  if (!idRegex.test(InputID)) {
    toast.warn(
      "아이디는 6~20자의 영문 대소문자와 숫자를 포함해야 하며, 최소 하나 이상의 영문자와 숫자가 있어야 합니다."
    );
    setInputID("");
    return false;
  }

  try {
    const response = await axios.post(`${SERVER_API}/users/verify-username`, {
      username: InputID,
    });

    if (response.status === HttpStatusCode.Ok) {
      toast.success("사용 가능한 아이디입니다.");
      return true;
    } else {
      toast.error("오류가 발생하였습니다."); // 409 상태 처리
      return false;
    }
  } catch (error) {
    // 네트워크 오류 또는 서버 문제 처리
    if (error.response && error.response.status === HttpStatusCode.Conflict) {
      toast.error(
        error.response.data.message || "이미 사용 중인 아이디입니다."
      );
    } else {
      toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  }

  return false;
};

// 닉네임 중복 확인
const handlerCheckDupNick = async (
  InputNickname,
  setNickname,
  setCheckNick
) => {
  const nicknameRegex = /^(?![-_])[가-힣a-zA-Z0-9-_]{2,10}(?<![-_])$/;

  if (!nicknameRegex.test(InputNickname)) {
    toast.warn(
      "닉네임은 2~10자의 한글, 영문, 숫자만 가능하며, -와 _는 처음과 끝에 올 수 없습니다."
    );
    setNickname("");
    return false;
  }

  try {
    const response = await axios.post(`${SERVER_API}/users/verify-nickname`, {
      nickname: InputNickname,
    });

    if (response.status === HttpStatusCode.Ok) {
      toast.success("사용 가능한 닉네임입니다.");
      return true;
    } else if (response.status === HttpStatusCode.Conflict) {
      toast.warn("이미 사용 중인 닉네임입니다."); // 409 상태 처리
      return false;
    }
  } catch (error) {
    if (error.response && error.response.status === HttpStatusCode.Conflict) {
      toast.warn(error.response.data.message || "이미 사용 중인 닉네임입니다.");
    } else {
      console.error("Error in handleCheckDupNick:", error);
      toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  }

  return false;
};

// 이메일 인증 요청
const handlerCheckEmail = async (InputEmail) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(InputEmail)) {
    toast.warn("유효한 이메일 주소를 입력하세요.");
    return;
  }

  try {
    const response = await axios.post(
      `${SERVER_API}/users/email/verification-request`,
      { email: InputEmail }
    );
    if (response && response.status === HttpStatusCode.Ok) {
      toast.info(response.data.response || "인증번호를 발송했습니다.");
    } else if (response.status === HttpStatusCode.TooManyRequests) {
      toast.warn(response.data.message || "조금 있다 다시 시도해 주세요.");
    }
  } catch (error) {
    if (error.response.status === HttpStatusCode.Conflict) {
      toast.warn("이미 가입된 이메일 입니다. 다른 이메일로 시도하세요.");
    } else {
      toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  }
};

// 이메일 인증 확인
const handlerCheckEmailVerify = async (
  InputEmail,
  InputConfirm,
  setEmailVerified
) => {
  try {
    const response = await axios.post(
      `${SERVER_API}/users/email/code-verification`,
      { email: InputEmail, code: InputConfirm }
    );
    if (response && response.status === HttpStatusCode.Ok) {
      toast.success("인증번호 확인 성공");
      return true;
    }
  } catch (error) {
    if (error.response && error.response.status === HttpStatusCode.Conflict) {
      toast.warn(error.response.data.message || "이미 가입된 이메일입니다.");
    } else if (error.response.data?.status === HttpStatusCode.BadRequest) {
      toast.error(
        error.response.data.message || "인증번호가 일치하지 않습니다."
      );
    } else {
      toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
  }
  return false;
};
const getMajorList = async () => {
  try {
    const response = await axios.get(`${SERVER_API}/majors`, {});
    //console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
// 회원가입 제출
const handlerSubmit = async (registerData, validations) => {
  const {
    checkID,
    InputID,
    InputPW,
    InputRePW,
    InputNickname,
    checkNick,
    emailVerified,
    InputMajor,
  } = validations;

  const pwRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  if (checkID !== InputID) {
    toast.warn("중복확인을 마친 아이디와 일치하지 않습니다.");
    return false;
  } else if (!pwRegex.test(InputPW)) {
    toast.warn(
      "비밀번호는 8~16자의 영문 소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다."
    );
    return false;
  } else if (InputPW !== InputRePW) {
    toast.warn("비밀번호가 일치하지 않습니다.");
    return false;
  } else if (!checkNick || InputNickname !== checkNick) {
    toast.warn("닉네임 중복 확인을 완료해주세요.");
    return false;
  } else if (!emailVerified) {
    toast.warn("이메일 인증이 필요합니다.");
    return false;
  } else if (!InputMajor) {
    toast.warn("전공을 선택해주세요.");
    return false;
  }

  try {
    const response = await api.post(`/auth/sign-up`, registerData);
    if (response && response.status === HttpStatusCode.Ok) {
      const { accessToken } = response.data;
      await useAuthStore.getState().login(accessToken); // Zustand 상태에 저장
      toast.success("회원가입 성공!");
      return true;
    } else if (response.status === HttpStatusCode.BadRequest) {
      toast.error(response.data.message || "회원가입에 실패했습니다.");
    }
  } catch (error) {
    toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
  }
  return false;
};
const registerOauth = async (registerData) => {
  const { nickname, email, majorName, agreeEmail } = registerData;

  // 닉네임 정규식 검사
  const nicknameRegex = /^(?![-_])[가-힣a-zA-Z0-9-_]{2,10}(?<![-_])$/;
  if (!nicknameRegex.test(nickname)) {
    toast.warn(
      "닉네임은 2~10자의 한글, 영문, 숫자만 가능하며, -와 _는 처음과 끝에 올 수 없습니다."
    );
    return false;
  }

  // 이메일 정규식 검사
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    toast.warn("유효한 이메일 주소를 입력하세요.");
    return false;
  }

  // 전공 이름 확인
  if (!majorName || typeof majorName !== "string" || majorName.trim() === "") {
    toast.warn("전공을 선택하세요.");
    return false;
  }

  // 이메일 수신 동의 확인
  if (typeof agreeEmail !== "boolean") {
    toast.warn("이메일 수신 동의 여부를 선택해주세요.");
    return false;
  }

  try {
    // 서버로 POST 요청
    const response = await api.post(
      `${SERVER_API}/auth/sign-up/oauth`,
      registerData
    );
    //console.log(response, registerData);

    if (response && response.status === HttpStatusCode.Ok) {
      toast.success("소셜 회원가입이 성공적으로 완료되었습니다.");
      return true;
    } else if (response.status === HttpStatusCode.BadRequest) {
      toast.error(response.data.message || "회원가입에 실패했습니다.");
      return false;
    }
  } catch (error) {
    //console.log(registerData);
    if (error.response && error.response.status === HttpStatusCode.Conflict) {
      toast.warn(error.response.data.message || "이미 등록된 사용자입니다.");
    } else {
      toast.error("서버에 문제가 발생했습니다. 나중에 다시 시도하세요.");
    }
    return false;
  }
};
export {
  handlerCheckDupID,
  handlerCheckDupNick,
  handlerCheckEmail,
  handlerCheckEmailVerify,
  handlerSubmit,
  registerOauth,
  getMajorList,
};
