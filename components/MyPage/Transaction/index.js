import React from "react";

import styles from "./transaction.module.scss";
import TransactionList from "./transactionList";

const Transaction = () => {
  return (
    <>
      <p>총 0건</p>
      <ul className={styles.transactionList}>
        <TransactionList />
      </ul>
    </>
  );
};

export default Transaction;
