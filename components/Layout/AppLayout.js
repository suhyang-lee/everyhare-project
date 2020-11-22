import React from "react";
import PropTypes from "prop-types";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

/* CSS 모듈 import */
import styles from "./layout.module.scss";

const AppLayout = ({ children }) => {
  return (
    <div className={styles.page}>
      <Header styles={styles} />
      <section className={styles.contents}>{children}</section>
      <Footer />
    </div>
  );
};

//props 체크 - node는 react의 node.
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
