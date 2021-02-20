import React from "react";
import Head from "next/head";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { useRouter } from "next/router";

import AppLayout from "../../components/Layout/AppLayout";
import Contents from "../../components/MyPage";
import USER from "../../actions/userAction";

const Mypage = () => {
  const { query } = useRouter();
  return (
    <AppLayout>
      <Head>
        <title>마이페이지 | EveryShare</title>
      </Head>
      <Contents path={query.mypage} />
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
      type: USER.LOAD_USER_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Mypage;
