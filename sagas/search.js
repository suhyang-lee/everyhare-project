import { all, fork, put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_SEARCH_REQUEST,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_FAILURE,
} from "../actions/searchAction";

function loadSearchAPI(data, lastId) {
  return axios.get(`/search/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadSearch(action) {
  try {
    const result = yield call(loadSearchAPI, action.data, action.lastId);
    yield put({
      type: LOAD_SEARCH_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_SEARCH_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLoadSearch() {
  yield takeLatest(LOAD_SEARCH_REQUEST, loadSearch);
}

export default function* searchSaga() {
  yield all([fork(watchLoadSearch)]);
}
