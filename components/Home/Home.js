import React from "react";
import styles from "./home.module.scss";

import MainBanner from "./MainBanner/MainBanner";
import NewBoard from "./MainContents/NewBoard";
import HotBoard from "./MainContents/HotBoard";
import SnsContents from "./MainContents/SnsContents";

const Home = () => {
  return (
    <>
      <MainBanner />
      <section className={styles.contentsWrapper}>
        {/* <!-- 새로 올라온 컨텐츠  --> */}
        <NewBoard />
        {/* <!-- 거래 요청이 많은 컨텐츠  --> */}
        <HotBoard />
        {/* <!-- SNS 컨텐츠 --> */}
        <SnsContents />
      </section>
    </>
  );
};

export default Home;
