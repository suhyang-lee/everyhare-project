import React from "react";

import styles from "./contents.module.scss";

const TransactionList = () => {
  return (
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
  );
};

export default TransactionList;
