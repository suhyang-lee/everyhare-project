import React from "react";
import styles from "./transaction.module.scss";
import { getFormatDate } from "utils/format";
import { STATE } from "utils/variables";

const TransactionList = ({ data }) => {
  return (
    <li>
      <img
        src={`http://localhost:3060/${data.Post.Images[0].src}`}
        alt="이미지"
      />
      <div className={styles.info}>
        <p>{data.Post.title}</p>
        <p>
          <span>대여기간</span> : {getFormatDate(data.rentalDate)} ~{" "}
          {getFormatDate(data.returnDate)}
        </p>
        <p>
          <span>대여금액</span> : {data.price} ETH
        </p>
      </div>
      <div className={styles.transactionState}>
        <p>{STATE[data.state]}</p>
        <button>{STATE[data.state + 1]}</button>
      </div>
    </li>
  );
};

export default TransactionList;
