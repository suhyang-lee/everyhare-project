import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
} from "../actions/userAction";

import produce from "immer";

export const initState = {
  loginLoadding: false, //로그인 시도
  loginDone: false,
  loginError: false,

  logoutLoadding: false, //로그아웃 시도
  logoutDone: false,
  logoutError: false,

  changeNicknameLoadding: false, //닉네임 변경 시도
  changeNicknameDone: false,
  changeNicknameError: false,

  user: null,
  signUpdate: {},
  loginDate: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: "동그리",
  id: 1,
  Posts: [],
});

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
      case LOG_IN_REQUEST:
        draft.loginLoadding = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;

      case LOG_IN_SUCCESS:
        draft.loginLoadding = false;
        draft.loginDone = true;
        draft.user = dummyUser(action.data);
        break;

      case LOG_IN_FAILURE:
        draft.loginLoadding = false;
        draft.loginDone = false;
        draft.user = action.error;
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