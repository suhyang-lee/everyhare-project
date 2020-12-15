import { all, fork } from "redux-saga/effects";
import axios from "axios";

import userSaga from "./user";
import postSaga from "./post";
import searchSaga from "./search";

axios.defaults.baseURL = "http://localhost:3060";
axios.defaults.withCredentials = true;
/*
    <1> fucntion * = 제너레이트 문법
    : 기본적으로 yield를 통해 함수 자체를 일시정지 할 수 있음.
      while(1) 같은 것도 멈추었다 실행할 수 있으므로 무한수를 만들 수 있음.
      결국 yield는 await같은 역할을 한다고 볼 수 있음.

    <2> take == dispatch

    <3> call과 fork 차이?
    -call은 동기 : 블로킹. 응답을 기다렸다가 결과를 받으면 실행.
    -fork는 비동기 : 논블로킹. 기다리지않고 바로 다음 것 실행.

    <4> takeEvery
    -take는 딱 한번만 실행할 수 있음. 그래서 사용 시에 while(true)를 통해서
    무한하게 사용할 수 있도록 하는데 이것은 문법적으로 이해하기 어렵고(일반적 프로그래밍 방법이 아니라 생각할 수 있으니)
    읽기도 불편하다 느낄 수 있으므로 takeEvery를 통해 그를 대신하는 것임. 동작 기능은 같음.

    <5> takeLatest
    -일반적으로 쓰는 함수.
    -실수나, 마우스의 고장으로 버튼 이벤트가 연속적으로 발생한 경우, 앞에 이벤트를 모두 무시하고
    가장 마지막의 이벤트만 동작을 실행하도록 하는 것. 
    하지만 이때, 마지막 이벤트라는 것은 무조건 마지막 이벤트를 실행하는 것이 아니라,
    서로 같은 상태인 중에 앞선 이벤트들을 취소하는 것. 물론 프론트 단에서만 동작하는 것.
    그러므로 서버에는 요청이 그대로 들어가게 된다. 그래서 서버에서 같은 데이터가 들어오는지 확인이 필요하다.
    -왜냐면 takeLatest 자체는 요청을 취소하는 것은 아니기 때문이다.

    <6> throttle
    -일정 시간을 정해놓으면 딱 1번만 요청을 보내도록 하는 것.
    -스크롤 이벤트에 자주 사용

    <7> debouncing
    -검색 이벤트에 자주 사용
*/

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(searchSaga)]);
}
