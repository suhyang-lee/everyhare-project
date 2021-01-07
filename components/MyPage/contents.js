import React from "react";

import styles from "./contents.module.scss";

const Contents = () => {
  return (
    <section className={styles.userContents}>
      <h3>내가 대여해 준 물품</h3>
      <p>
        회원님들께서 다른 회원님께 회원님의 물건을 빌려 준 경우에 대한 거래 내역
        입니다
      </p>
      <article className={styles.contents}>
        <p>총 0건</p>
        <ul className={styles.transactionList}>
          <li>
            <img src="#" alt="이미지" />
            <div className={styles.info}>
              <p>카메라 삽니다</p>
              <p>
                <span>대여기간</span> : 2020.04.30 - 2020.05.30
              </p>
              <p>
                <span>대여금액</span> : 4300원
              </p>
            </div>
            <div className={styles.transactionState}>
              <p>거래대기</p>
              <button>거래승인 </button>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default Contents;
