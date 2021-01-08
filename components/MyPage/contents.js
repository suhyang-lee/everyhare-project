import React from "react";

import styles from "./contents.module.scss";
import UserView from "./UserInfo/userView";

const Contents = () => {
  return (
    <section className={styles.userContents}>
      <h3>내가 대여해 준 물품</h3>
      <p>
        회원님들께서 다른 회원님께 회원님의 물건을 빌려 준 경우에 대한 거래 내역
        입니다
      </p>
      <article className={styles.contents}>
        <UserView />
      </article>
    </section>
  );
};

export default Contents;
