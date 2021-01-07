import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  KAKAO_LOG_IN_REQUEST,
  KAKAO_LOG_IN_SUCCESS,
  KAKAO_LOG_IN_FAILURE,
  NAVER_LOG_IN_REQUEST,
  NAVER_LOG_IN_SUCCESS,
  NAVER_LOG_IN_FAILURE,
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_TOKEN_REQUEST,
  LOAD_TOKEN_SUCCESS,
  LOAD_TOKEN_FAILURE,
} from "../actions/userAction";

import produce from "immer";
import { setToken } from "../utils/authToken";

export const initState = {
  loginLoadding: false, //로그인 시도
  loginDone: false,
  loginError: false,

  loadUserInfoLoadding: false, //로그인 정보 시도
  loadUserInfoDone: false,
  loadUserInfoError: false,

  logoutLoadding: false, //로그아웃 시도
  logoutDone: false,
  logoutError: false,

  changeNicknameLoadding: false, //닉네임 변경 시도
  changeNicknameDone: false,
  changeNicknameError: false,

  signupLoadding: false,
  signupDone: false,
  signupError: false,

  user: null,
  isLoggedIn: false,
};

export const loginRequstAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequstAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_TOKEN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOAD_TOKEN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case LOAD_TOKEN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case KAKAO_LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case KAKAO_LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case KAKAO_LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case NAVER_LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case NAVER_LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = action.data;
        break;
      case NAVER_LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.loginError = action.error;
        break;

      case LOAD_USER_INFO_REQUEST:
        draft.loadUserInfoLoadding = true;
        draft.loadUserInfoDone = false;
        draft.loadUserInfoError = null;
        break;
      case LOAD_USER_INFO_SUCCESS:
        const { isLoggedIn } = action.data;
        draft.loadUserInfoLoadding = false;
        draft.loadUserInfoDone = true;
        if (isLoggedIn) {
          draft.user = action.data.user;
          draft.isLoggedIn = true;
        }
        break;
      case LOAD_USER_INFO_FAILURE:
        draft.loadUserInfoLoadding = false;
        draft.loadUserInfoDone = false;
        draft.loginError = action.error;
        break;

      case LOG_OUT_REQUEST:
        draft.logoutLoadding = true;
        draft.logoutDone = false;
        draft.logoutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logoutLoadding = false;
        draft.logoutDone = true;
        draft.user = null;
        setToken("");
        break;
      case LOG_OUT_FAILURE:
        draft.logoutLoadding = false;
        draft.logoutDone = false;
        draft.logoutError = action.error;
        break;

      case SIGN_UP_REQUEST:
        draft.signupLoadding = true;
        draft.signupDone = false;
        draft.signupError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signupLoadding = false;
        draft.signupDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signupLoadding = false;
        draft.signupDone = false;
        draft.signupError = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoadding = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
