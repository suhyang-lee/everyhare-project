import { all, fork } from "redux-saga/effects";
import userSaga, { loadTokenAPI } from "./user";
import postSaga from "./post";
import searchSaga from "./search";
import axios from "axios";
import { getToken, setToken } from "../utils/authToken";

axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  async function (response) {
    await setToken(response.data.accessToken);
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
  yield all([fork(userSaga), fork(postSaga), fork(searchSaga)]);
}
