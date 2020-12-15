import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "../actions/userAction";

import AppLayout from "../components/Layout/AppLayout";
import PostForm from "../components/Post/PostForm";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";

const Post = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <>
      {user ? (
        <AppLayout>
          <Head>
            <title>글쓰기 | EveryShare</title>
          </Head>
          <PostForm />
        </AppLayout>
      ) : (
        <Loading />
      )}
    </>
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

export default Post;
