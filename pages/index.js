import React from "react";
import Head from "next/head";
import { END } from "redux-saga";

import AppLayout from "../components/Layout/AppLayout";
import Contents from "../components/Home/Home";

import { LOAD_USER_INFO_REQUEST } from "../actions/userAction";

import wrapper from "../store/configureStore";
import axios from "axios";

const Home = () => {
  return (
    <AppLayout>
      <Head>
        <title>홈 | EveryShare</title>
      </Head>
      <Contents />
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

export default Home;
