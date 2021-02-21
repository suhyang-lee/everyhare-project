import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";

import AppLayout from "../components/Layout/AppLayout";
import Contents from "../components/Home";

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

export default Home;
