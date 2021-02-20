import React from "react";
import Sidebar from "./sidebar";
import Contents from "./contents";

import styles from "./userInfo.module.scss";
import { TITLEINFO, MYPAGETYPE } from "../../utils/variables";

import Transaction from "./Transaction";
import MyContents from "./MyContents";
import UserInfo from "./UserInfo";

const MypageContents = ({ path, user }) => {
  const pageType = MYPAGETYPE[path];
  return (
    <section className={styles.wrapper}>
      <Sidebar />
      <Contents info={TITLEINFO[path]}>
        {pageType === 0 && <Transaction path={path} />}
        {pageType === 1 && <MyContents path={path} />}
        {pageType === 2 && <UserInfo path={path} />}
      </Contents>
    </section>
  );
};

export default MypageContents;
