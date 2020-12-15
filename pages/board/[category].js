import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../../store/configureStore";

import AppLayout from "../../components/Layout/AppLayout";
import BoardList from "../../components/Board";
import { getCategory } from "../../components/common/global";
import { LOAD_USER_INFO_REQUEST } from "../../actions/userAction";
import { LOAD_POSTS_REQUEST } from "../../actions/postAction";

const Board = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { category } = router.query;

  const { posts, hasMorePost, loadPostsLoading } = useSelector(
    (state) => state.post,
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostsLoading) {
          const lastId = posts[posts.length - 1]?.id;
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId,
            data: category,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostsLoading, posts]);

  return (
    <AppLayout>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>
      <BoardList posts={posts} title={getCategory(category)} />
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

    context.store.dispatch({
      type: LOAD_POSTS_REQUEST,
      data: context.query.category,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Board;
