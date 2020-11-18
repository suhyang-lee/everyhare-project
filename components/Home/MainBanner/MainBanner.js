import React from "react";

import styles from "./mainBanner.module.scss";

const MainBanner = () => {
  return (
    <div className={styles.mainBannerWrapper}>
      <section className={styles.mainBanner}>
        <div className={styles.bannerContents}>
          <h5>
            Never buy <br />
            Just borrow.
          </h5>
          <p>에브리쉐어에서는 모든 것을 공유합니다</p>
          <p>이제는 사지말고 공유하세요</p>
          <button className={styles.bannerWriteBtn}>글쓰러 가기</button>
        </div>
      </section>
    </div>
  );
};

export default MainBanner;
