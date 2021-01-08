import {
  all,
  delay,
  fork,
  put,
  takeLatest,
  throttle,
  call,
} from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  ZZIM_POST_REQUEST,
  ZZIM_POST_SUCCESS,
  ZZIM_POST_FAILURE,
  NOT_ZZIM_POST_REQUEST,
  NOT_ZZIM_POST_SUCCESS,
  NOT_ZZIM_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  APPLY_RENTAL_REQUEST,
  APPLY_RENTAL_SUCCESS,
  APPLY_RENTAL_FAILURE,
} from "../actions/postAction";

//전체 게시물 가져오기
function loadPostAPI(data) {
  return axios.get(`/post/${data.postId}`, data);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POSTS_FAILURE,
      error: err.response.data,
    });
  }
}

//게시물 등록하기
function addPostAPI(data) {
  return axios.post("/post", data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//이미지 등록하기
function uploadImagesAPI(data) {
  return axios.post("/post/images", data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    console.log(result);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

//PostId로 게시물 가져오기
function loadPostsAPI(data, lastId) {
  return axios.get(`/posts/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//댓글 등록하기
function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}

//물건 찜하기
function zzimPostAPI(data) {
  return axios.patch(`/post/${data.postId}/zzim`, data);
}

function* zzimPost(action) {
  try {
    const result = yield call(zzimPostAPI, action.data);
    yield put({
      type: ZZIM_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ZZIM_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//찜 삭제
function notZzimPostAPI(data) {
  return axios.delete(`/post/${data.postId}/zzim`, data);
}

function* notZzimPost(action) {
  try {
    const result = yield call(notZzimPostAPI, action.data);
    console.log(result);
    yield put({
      type: NOT_ZZIM_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: NOT_ZZIM_POST_FAILURE,
      error: err.response.data,
    });
  }
}

//신청하기
function addApplyAPI(data) {
  return axios.post("post/apply", data);
}

function* addApply(action) {
  try {
    const result = yield call(addApplyAPI, action.data);
    console.log(result);
    yield put({
      type: ADD_APPLY_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_APPLY_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchZzimPost() {
  yield takeLatest(ZZIM_POST_REQUEST, zzimPost);
}
function* watchNotZzimPost() {
  yield takeLatest(NOT_ZZIM_POST_REQUEST, notZzimPost);
}

function* watchloadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchAdd() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchloadPost),

    fork(watchAddPost),
    fork(watchUploadImages),

    fork(watchZzimPost),
    fork(watchNotZzimPost),

    fork(watchAddComment),
  ]);
}
