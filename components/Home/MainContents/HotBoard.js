import React from "react";

import styles from "./hotboard.module.scss";

const MainHotBoard = () => {
  return (
    <article className={styles.requestContentsWrapper}>
      <div className={styles.headingWrpper}>
        <h4>👼 거래 요청이 가장 많아요! </h4>
        <p>지금 현재 거래 요청이 많은 10개의 대여 거래</p>
      </div>
      <ul className={styles.requestContents}>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1548378329-437e1ef34263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80"
              alt="제품"
            />
          </div>
        </li>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1552233659-012e177ed56d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              alt="제품"
            />
          </div>
        </li>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1586861375711-1b66f04147f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
              alt="제품"
            />
          </div>
        </li>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1595074475126-11362260b8aa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80"
              alt="제품"
            />
          </div>
        </li>
        <li className={styles.leftBtn}>
          <img src="../images/icon-arrow-btn.svg" alt="왼쪽 버튼" />
        </li>
        <li className={styles.rightBtn}>
          <img src="../images/icon-arrow-btn.svg" alt="오른쪽 버튼" />
        </li>
      </ul>
    </article>
  );
};

export default MainHotBoard;
