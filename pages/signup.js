import React from "react";
import Head from "next/head";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "../actions/userAction";

import AppLayout from "../components/Layout/AppLayout";
import Signup from "../components/Signup/Signup";

const SignUp = () => {
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | EveryShare</title>
      </Head>
      <Signup />
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

export default SignUp;
