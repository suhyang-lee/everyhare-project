import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "../../actions/userAction";

import { LOAD_POST_REQUEST } from "../../actions/postAction";
import AppLayout from "../../components/Layout/AppLayout";
import View from "../../components/Views/View";

const PostContents = () => {
  const dispatch = useDispatch();
  const postId = useRouter().query.postContents;
  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: { postId },
    });
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>게시물 상세보기 | EveryShare</title>
      </Head>
      <View post={post} />
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

export default PostContents;
