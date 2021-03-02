import produce from "immer";
import USER from "actions/userAction";
import { authTokenClosure } from "utils/authToken";

export const initState = {
  loginLoadding: false,
  loginDone: false,
  loginError: false,

  loadUserInfoLoadding: false,
  loadUserInfoDone: false,
  loadUserInfoError: false,

  logoutLoadding: false,
  logoutDone: false,
  logoutError: false,

  changeNicknameLoadding: false,
  changeNicknameDone: false,
  changeNicknameError: false,

  signupLoadding: false,
  signupDone: false,
  signupError: false,

  uploadImageLoading: false,
  uploadImageDone: false,
  uploadImageError: null,

  user: null,
};

export const loginRequstAction = (data) => {
  return {
    type: USER.LOG_IN_REQUEST,
    data,
  };
};

export const kakaoLoginRequestAction = () => {
  return {
    type: USER.KAKAO_LOG_IN_REQUEST,
  };
};

export const naverLoginRequestAction = () => {
  return {
    type: USER.NAVER_LOG_IN_REQUEST,
  };
};

export const logoutRequstAction = () => {
  return {
    type: USER.LOG_OUT_REQUEST,
  };
};

const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case USER.LOAD_TOKEN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case USER.LOAD_TOKEN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case USER.LOAD_TOKEN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case USER.LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case USER.LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case USER.LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case USER.KAKAO_LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case USER.KAKAO_LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case USER.KAKAO_LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case USER.NAVER_LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case USER.NAVER_LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case USER.NAVER_LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case USER.LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoadding = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        break;
      case USER.LOAD_USER_INFO_SUCCESS:
        draft.loadUserInfoLoadding = false;
        draft.loadUserInfoDone = true;
        draft.user = action.data;
        break;
      case USER.LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoadding = false;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = action.error;
        break;

      case USER.LOG_OUT_REQUEST:
        draft.logoutLoadding = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case USER.LOG_OUT_SUCCESS:
        draft.logoutLoadding = false;
        draft.logoutDone = true;
        draft.user = null;
        authTokenClosure.setToken(undefined);

        break;
      case USER.LOG_OUT_FAILURE:
        draft.logoutLoadding = false;
        draft.logoutDone = false;
        draft.logoutError = action.error;
        break;

      case USER.SIGN_UP_REQUEST:
        draft.signupLoadding = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case USER.SIGN_UP_SUCCESS:
        draft.signupLoadding = false;
        draft.signupDone = true;
        break;
      case USER.SIGN_UP_FAILURE:
        draft.signupLoadding = false;
        draft.signupDone = false;
        draft.signupError = action.error;
        break;

      case USER.CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoadding = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case USER.CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = true;
        draft.user = action.data;
        break;
      case USER.CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      case USER.UPLOAD_PROFILE_IMAGE_REQUEST:
        draft.uploadImageLoadding = true;
        draft.uploadImageDone = false;
        draft.uploadImageError = null;
        break;
      case USER.UPLOAD_PROFILE_IMAGE_SUCCESS:
        draft.uploadImageLoadding = false;
        draft.uploadImageDone = true;
        draft.user = action.data;
        break;
      case USER.UPLOAD_PROFILE_IMAGE_FAILURE:
        draft.uploadImageLoadding = false;
        draft.uploadImageDone = false;
        draft.uploadImageError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
