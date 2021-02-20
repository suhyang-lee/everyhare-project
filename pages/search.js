import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";

import axios from "axios";
import wrapper from "../store/configureStore";

import AppLayout from "../components/Layout/AppLayout";
import BoardList from "../components/Board";

import USER from "../actions/userAction";
import SEARCH from "../actions/searchAction";

const Search = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { keyword } = router.query;

  const { searchs, hasMoreSearch, loadSearchLoading } = useSelector(
    (state) => state.search,
  );

  useEffect(() => {
    function onScroll() {
      if (
        window.pageYOffset + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreSearch && !loadSearchLoading) {
          dispatch({
            type: LOAD_SEARCH_REQUEST,
            lastId:
              searchs[searchs.length - 1] && searchs[searchs.length - 1].id,
            data: keyword,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMoreSearch, loadSearchLoading, searchs.length, keyword]);

  return (
    <AppLayout>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>
      <BoardList posts={searchs} title="통합검색" />
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

    context.store.dispatch({
      type: SEARCH.LOAD_SEARCH_REQUEST,
      data: context.query.keyword,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Search;
