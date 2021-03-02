import React from "react";

import styles from "./contents.module.scss";

const Contents = ({ children, info }) => {
  return (
    <section className={styles.userContents}>
      <h3>{info.title}</h3>
      <p>{info.discription}</p>
      <article className={styles.contents}>{children}</article>
    </section>
  );
};

export default Contents;
