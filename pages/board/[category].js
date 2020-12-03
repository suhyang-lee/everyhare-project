import React, { useEffect, useReducer } from "react";
import Head from "next/head";

import AppLayout from "../../components/Layout/AppLayout";
import BoardList from "../../components/Board";

const Board = () => {
  return (
    <AppLayout>
      <Head>
        <title>게시물 리스트 보기 | EveryShare</title>
      </Head>
      <BoardList />
    </AppLayout>
  );
};

export default Board;
