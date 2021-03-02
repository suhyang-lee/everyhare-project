import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "sagas/user";
import postSaga from "sagas/post";
import searchSaga from "sagas/search";
import mypostSaga from "sagas/mypage";
import { authTokenClosure } from "utils/authToken";

axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async function (config) {
    const token = authTokenClosure.getToken();

    if (token) config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async function (response) {
    if (response.data.accessToken) {
      authTokenClosure.setToken(response.data.accessToken);
    }

    return response;
  },
  async function (error) {
    const errorAPI = error.config;
    if (error.response.status === 401 && errorAPI.retry === undefined) {
      errorAPI.retry = true;
      await axios.get("/auth/token");
      return axios.request(errorAPI);
    }

    return Promise.reject(error);
  },
);

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(searchSaga),
    fork(mypostSaga),
  ]);
}
