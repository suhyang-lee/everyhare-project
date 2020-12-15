import React from "react";
import styles from "./home.module.scss";

import MainBanner from "./MainBanner/MainBanner";

const Home = () => {
  return (
    <>
      <MainBanner />
      <section className={styles.contentsWrapper}></section>
    </>
  );
};

export default Home;
