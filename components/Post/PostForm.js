import React from "react";

import styles from "./post.module.scss";
import Phase1 from "./PostFormPhase1";
import Phase2 from "./PostFormPhase2";

const PostForm = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <img src="/images/icon-product.svg" alt="물품등록" />
        <h3>물품등록</h3>
      </div>
      <Phase1 />
      <Phase2 />

      <button className={styles.nextBtn}>다음단계로</button>
    </div>
  );
};

export default PostForm;
