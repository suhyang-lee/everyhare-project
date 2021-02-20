import {
  all,
  fork,
  delay,
  put,
  takeLatest,
  call,
  throttle,
} from "redux-saga/effects";

import MYPAGE from "../actions/mypageAction";

import axios from "axios";

function loadMyContentsAPI(data) {
  return axios.get(`mypage/contents?pageNum=${data.pageNum}&type=${data.type}`);
}

function* loadMyContents(action) {
  try {
    const result = yield call(loadMyContentsAPI, action.data);
    yield put({
      type: MYPAGE.LOAD_MYCONTENTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: MYPAGE.LOAD_MYCONTENTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadMyContents() {
  yield takeLatest(MYPAGE.LOAD_MYCONTENTS_REQUEST, loadMyContents);
}

export default function* mypageSaga() {
  yield all([fork(watchLoadMyContents)]);
}
