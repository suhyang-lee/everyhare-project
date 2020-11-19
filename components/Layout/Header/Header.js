/* 페이지 공통 헤더  */
import React, { useState } from "react";
import Category from "../Category/Category";
import Login from "../../Login/Login";

import styles from "./header.module.scss";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const onClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClickLoginModal = (e) => {
    e.preventDefault();
    setIsShow(true);
  };

  const onClickLoginModalClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  return (
    <>
      {isShow && <Login onClickLoginModalClose={onClickLoginModalClose} />}
      <header className={styles.header}>
        <div className={styles.headerItemsWrapper}>
          <div className={styles.headerItem}>
            <div className={styles.headerMenuBtn} onClick={onClickOpen}>
              <img src="/images/icon-menu.svg" alt="메뉴열기" />
              <h2>카테고리</h2>
            </div>
          </div>

          <div className={styles.headerItem}>
            <h1>
              <img src="/images/img-everyshare-logo.svg" alt="에브리쉐어" />
            </h1>
          </div>

          <div className={styles.headerItem}>
            <nav className={styles.gnbNav}>
              <ul className={styles.gnbUl}>
                <li>
                  <h2>
                    <a>마이페이지</a>
                  </h2>
                </li>
                <li>
                  <h2 onClick={onClickLoginModal}>로그인</h2>
                </li>
                <li>
                  <h2>
                    <a>회원가입</a>
                  </h2>
                </li>
                <li>
                  <img src="/images/icon-search.svg" alt="검색하기" />
                </li>
                <li>
                  <img src="/images/icon-shopping.svg" alt="담아두기" />
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {isOpen && <Category onClickOpen={onClickOpen} isOpen={isOpen} />}
      </header>
    </>
  );
};

export default Header;
