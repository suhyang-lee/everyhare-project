import React from "react";
import styles from "./home.module.scss";
import MainBanner from "components/home/mainBanner";

const Home = () => {
  return (
    <>
      <MainBanner />
      <section className={styles.contentsWrapper}></section>
    </>
  );
};

export default Home;
