import { all, fork, delay, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import USER from "../actions/userAction";

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signup(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: USER.SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: USER.SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function logInAPI(data) {
  return axios.post("/auth/local", data);
}

function* login(action) {
  try {
    const result = yield call(logInAPI, action.data);
    yield put({
      type: USER.LOG_IN_SUCCESS,
      data: result.data.userInfo,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function loginKakaoAPI(data) {
  return axios.post("/auth/kakao", data);
}

function* loginKakao(action) {
  try {
    const result = yield call(loginKakaoAPI, action.data);
    console.log("카카오로그인", result);
    yield put({
      type: USER.KAKAO_LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.KAKAO_LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function loginNaverAPI(data) {
  return axios.get("/auth/naver", data);
}

function* loginNaver(action) {
  try {
    const result = yield call(loginNaverAPI, action.data);

    yield put({
      type: USER.NAVER_LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.NAVER_LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfoAPI() {
  return axios.get("/user");
}

function* loadUserInfo() {
  try {
    const result = yield call(loadUserInfoAPI);
    yield put({
      type: USER.LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logout() {
  try {
    const result = yield call(logOutAPI);
    yield put({
      type: USER.LOG_OUT_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function uploadProfileImageAPI(data) {
  return axios.patch("/mypage/info/profile", data);
}

function* uploadProfileImage(action) {
  try {
    const result = yield call(uploadProfileImageAPI, action.data);

    yield put({
      type: USER.UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.UPLOAD_PROFILE_IMAGE_FAILURE,
      error: err.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch("/mypage/info", { nickname: data });
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: USER.CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: USER.CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(USER.LOG_IN_REQUEST, login);
}

function* watchLogInKakao() {
  yield takeLatest(USER.KAKAO_LOG_IN_REQUEST, loginKakao);
}

function* watchLogInNaver() {
  yield takeLatest(USER.NAVER_LOG_IN_REQUEST, loginNaver);
}

function* watchLoadUserInfo() {
  yield takeLatest(USER.LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLogOut() {
  yield takeLatest(USER.LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(USER.SIGN_UP_REQUEST, signup);
}

function* watchUploadProfileImage() {
  yield takeLatest(USER.UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

function* watchChangeNickname() {
  yield takeLatest(USER.CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogInKakao),
    fork(watchLogInNaver),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadUserInfo),
    fork(watchUploadProfileImage),
    fork(watchChangeNickname),
  ]);
}
