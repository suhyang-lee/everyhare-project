import React from "react";

import styles from "./newboard.module.scss";

const MainNewBoard = () => {
  return (
    <article className={styles.newContentsWrapper}>
      <div className={styles.headingWrpper}>
        <h4>💌 지금 새로 올라왔어요!</h4>
      </div>
      <ul className={styles.newContents}>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1592219907299-b8084c39d625?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              alt="배너 이미지"
            />
          </div>
          <div className={styles.productWrapper}>
            <h5>
              <span>[빌려드립니다]</span> 아이폰 X 빌려드려요
            </h5>
            <p>
              2.0 ETH <span>(월 단위)</span>
            </p>
          </div>
        </li>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1512054502232-10a0a035d672?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
              alt="아이폰"
            />
          </div>
          <div className={styles.productWrapper}>
            <h5>
              <span>[빌려드립니다]</span> 아이폰 X 빌려드려요
            </h5>
            <p>
              2.0 ETH <span>(월 단위)</span>
            </p>
          </div>
        </li>
        <li>
          <div className={styles.productImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1579721840641-7d0e67f1204e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=638&q=80"
              alt="워치"
            />
          </div>
          <div className={styles.productWrapper}>
            <h5>
              <span>[빌려드립니다]</span> 아이폰 X 빌려드려요
            </h5>
            <p>
              2.0 ETH <span>(월 단위)</span>
            </p>
          </div>
        </li>

        <li className={styles.leftBtn}>
          <img
            className="img-left-btn"
            src="/images/icon-arrow-btn.svg"
            alt="왼쪽 버튼"
          />
        </li>
        <li className={styles.rightBtn}>
          <img src="/images/icon-arrow-btn.svg" alt="오른쪽 버튼" />
        </li>
      </ul>
    </article>
  );
};

export default MainNewBoard;
