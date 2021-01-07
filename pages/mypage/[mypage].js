import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";

import AppLayout from "../../components/Layout/AppLayout";
import UserInfo from "../../components/MyPage";
import { LOAD_USER_INFO_REQUEST } from "../../actions/userAction";

const Mypage = () => {
  return (
    <AppLayout>
      <Head>
        <title>마이페이지 | EveryShare</title>
      </Head>
      <UserInfo />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Mypage;
