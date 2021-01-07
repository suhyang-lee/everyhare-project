import React from "react";
import Sidebar from "./sidebar";
import Contents from "./contents";

import styles from "./userInfo.module.scss";

const UserInfo = () => {
  return (
    <section className={styles.wrapper}>
      <Sidebar />
      <Contents />
    </section>
  );
};

export default UserInfo;
