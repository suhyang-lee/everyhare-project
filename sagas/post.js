import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
} from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../actions/postAction";
import { generateDummyPost } from "../reducers/post";

export default function* postSaga() {
  yield all([
    fork(watchLoadPost),
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchReadPost),
  ]);
}

//API 요청
function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function loadPostAPI(data) {
  return axios.get("/api/post");
}

function readPostAPI(data) {
  return axios.post("/api/${data.postId}");
}

function addCommentAPI(data) {
  return axios.post("/api/${data.postId}/comment", data);
}

//API 결과 받아 처리

function* loadPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* readPost(action) {
  try {
    yield delay(1000);
    yield put({
      type: READ_POST_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: READ_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function* addComment(action) {
  try {
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchReadPost() {
  yield takeLatest(READ_POST_REQUEST, readPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
