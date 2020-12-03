/* 페이지 공통 헤더  */
import React, { useCallback, useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import Category from "../Category/Category";
import Login from "../../Login/Login";

import styles from "./header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequstAction } from "../../../reducers/user";

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequstAction());
  }, []);

  const onClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const onClickLoginModal = (e) => {
    setIsShow(true);
  };

  const onClickLoginModalClose = (e) => {
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
            <Link href="/">
              <h1>
                <img src="/images/img-everyshare-logo.svg" alt="에브리쉐어" />
              </h1>
            </Link>
          </div>

          <div className={styles.headerItem}>
            <nav className={styles.gnbNav}>
              <ul className={styles.gnbUl}>
                <li>
                  <h2>
                    <a>마이페이지</a>
                  </h2>
                </li>
                {user ? (
                  <li onClick={onLogOut}>
                    <h2>로그아웃</h2>
                  </li>
                ) : (
                  <>
                    <li>
                      <h2 onClick={onClickLoginModal}>로그인</h2>
                    </li>
                    <li>
                      <h2>
                        <Link href="/signup">
                          <HeaderLink>회원가입</HeaderLink>
                        </Link>
                      </h2>
                    </li>
                  </>
                )}

                <li className={styles.circleBtn}>
                  <img src="/images/icon-search.svg" alt="검색하기" />
                </li>
                <li className={styles.circleBtn}>
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
