import {
  all,
  fork,
  delay,
  put,
  takeLatest,
  call,
  throttle,
} from "redux-saga/effects";

import {
  LOAD_MYPOSTS_REQUEST,
  LOAD_MYPOSTS_SUCCESS,
  LOAD_MYPOSTS_FAILURE,
  LOAD_MYCOMMENTS_REQUEST,
  LOAD_MYCOMMENTS_SUCCESS,
  LOAD_MYCOMMENTS_FAILURE,
} from "../actions/mypageAction";

import axios from "axios";

function loadMyPostsAPI(pageNum) {
  return axios.get(`mypage/posts?pageNum=${pageNum}`);
}

function* loadMyPosts(action) {
  try {
    const result = yield call(loadMyPostsAPI, action.pageNum);
    yield put({
      type: LOAD_MYPOSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MYPOSTS_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyCommentsAPI() {
  return axios.post("/mypage/comments");
}

function* loadMyComments() {
  try {
    yield call(loadMyCommentsAPI);
    yield put({
      type: LOAD_MYCOMMENTS_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOAD_MYCOMMENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyPosts() {
  yield takeLatest(LOAD_MYPOSTS_REQUEST, loadMyPosts);
}

function* watchLoadMyComments() {
  yield takeLatest(LOAD_MYCOMMENTS_REQUEST, loadMyComments);
}

export default function* mypageSaga() {
  yield all([fork(watchLoadMyPosts), fork(watchLoadMyComments)]);
}
