import React from "react";
import PropTypes from "prop-types";
import Header from "components/layout/header";
import Footer from "components/layout/footer";

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

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
