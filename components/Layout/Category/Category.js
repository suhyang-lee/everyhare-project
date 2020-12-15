/* 헤더 내부 카테고리  */

import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";
import styles from "./category.module.scss";

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const Category = ({ onClickOpen, isOpen }) => {
  const body = document.querySelector("body");
  const lockScroll = (e) => e.preventDefault();

  let timeOutid;

  useEffect(() => {
    body.addEventListener("touchmove", lockScroll, { passive: false });
    body.style.overflow = "hidden";
    return () => {
      body.removeEventListener("touchmove", lockScroll, { passive: false });
      body.style.removeProperty("overflow");
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    timeOutid = setTimeout(() => {
      onClickOpen(false);
    });
  }, [onClickOpen, timeOutid]);

  const onMouseOverCapture = useCallback(() => {
    clearTimeout(timeOutid);
  }, [timeOutid]);

  return (
    <>
      <div className={styles.fakeBox} onClick={onMouseLeave}></div>
      <div
        className={styles.lnbWrapper}
        onMouseLeave={onMouseLeave}
        onMouseOverCapture={onMouseOverCapture}
      >
        <nav className={styles.lnbNav}>
          {/* <!-- 카테고리 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <h3>CATEGORY</h3>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/digital",
                  }}
                >
                  <HeaderLink>디지털/가전</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/kids",
                  }}
                >
                  <HeaderLink>유아동</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/goods",
                  }}
                >
                  <HeaderLink>생활용품</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/clothing",
                  }}
                >
                  <HeaderLink>의류/잡화</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/sports",
                  }}
                >
                  <HeaderLink>스포츠/레저</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/hobby",
                  }}
                >
                  <HeaderLink>도서/취미</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/board/etc",
                  }}
                >
                  <HeaderLink>기타용품</HeaderLink>
                </Link>
              </h4>
            </li>
          </ul>

          {/* <!-- 퀵 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <h3>QUICK MENU</h3>
            </li>
            <li>
              <h4>
                <Link
                  href={{
                    pathname: "/post",
                  }}
                >
                  <HeaderLink>글쓰기</HeaderLink>
                </Link>
              </h4>
            </li>
            <li>
              <h4>
                <HeaderLink>내가 대여해 준 물품</HeaderLink>
              </h4>
            </li>
            <li>
              <h4>
                <HeaderLink>내가 대여한 물품</HeaderLink>
              </h4>
            </li>
            <li>
              <h4>
                <HeaderLink>담아 둔 목록보기</HeaderLink>
              </h4>
            </li>
          </ul>

          {/* <!-- 고객서비스 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <h3>
                <HeaderLink>자주묻는 질문</HeaderLink>
              </h3>
            </li>
            <li>
              <h4>
                <HeaderLink>자주묻는 질문</HeaderLink>
              </h4>
            </li>
            <li>
              <h4>
                <HeaderLink>문의하기</HeaderLink>
              </h4>
            </li>
            <li>
              <h4>
                <HeaderLink>공지사항</HeaderLink>
              </h4>
            </li>
          </ul>

          {/* <!-- 이벤트 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <h3>EVENT</h3>
            </li>
            <li className={styles.eventBanner}></li>
          </ul>

          {/* <!-- 모바일용 gnb 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <Link
                href={{
                  pathname: "/mypage",
                }}
              >
                <HeaderLink>마이페이지</HeaderLink>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/login",
                }}
              >
                <HeaderLink>로그인</HeaderLink>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: "/signup",
                }}
              >
                <HeaderLink>회원가입</HeaderLink>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

Category.propTypes = {
  onClickOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default Category;
