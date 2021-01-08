import { all, fork, delay, put, takeLatest, call } from "redux-saga/effects";

import {
  LOAD_USER_INFO_REQUEST,
  LOAD_USER_INFO_SUCCESS,
  LOAD_USER_INFO_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  KAKAO_LOG_IN_REQUEST,
  KAKAO_LOG_IN_SUCCESS,
  KAKAO_LOG_IN_FAILURE,
  NAVER_LOG_IN_REQUEST,
  NAVER_LOG_IN_SUCCESS,
  NAVER_LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from "../actions/userAction";
import axios from "axios";

function signUpAPI(data) {
  return axios.post("/user", data);
}

function* signup(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
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
    console.log(result);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
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
      type: KAKAO_LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: KAKAO_LOG_IN_FAILURE,
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
      type: NAVER_LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: NAVER_LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserInfoAPI(data) {
  return axios.get("/user", data);
}

function* loadUserInfo(action) {
  try {
    const result = yield call(loadUserInfoAPI, action.data);
    yield put({
      type: LOAD_USER_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_USER_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutAPI() {
  return axios.post("/user/logout");
}

function* logout() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogInKakao() {
  yield takeLatest(KAKAO_LOG_IN_REQUEST, loginKakao);
}

function* watchLogInNaver() {
  yield takeLatest(NAVER_LOG_IN_REQUEST, loginNaver);
}

function* watchLoadUserInfo() {
  yield takeLatest(LOAD_USER_INFO_REQUEST, loadUserInfo);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogInKakao),
    fork(watchLogInNaver),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchLoadUserInfo),
  ]);
}
