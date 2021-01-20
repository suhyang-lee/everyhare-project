import React from "react";
import Sidebar from "./sidebar";
import Contents from "./contents";

import styles from "./userInfo.module.scss";
import { titleInfo, myPageType } from "../common/global";

import Transaction from "./Transaction";
import MyContents from "./MyContents";
import UserInfo from "./UserInfo";

const MypageContents = ({ path }) => {
  const pageType = myPageType[path];
  return (
    <section className={styles.wrapper}>
      <Sidebar />
      <Contents info={titleInfo[path]}>
        {pageType === 0 && <Transaction />}
        {pageType === 1 && <MyContents />}
        {pageType === 2 && <UserInfo />}
      </Contents>
    </section>
  );
};

export default MypageContents;
