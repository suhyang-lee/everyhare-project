/* 헤더 내부 카테고리  */

import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./category.module.scss";

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

  const onMouseLeave = () => {
    timeOutid = setTimeout(() => {
      onClickOpen(false);
    });
  };

  const onMouseOverCapture = () => {
    clearTimeout(timeOutid);
  };

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
                <a>디지털/가전</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>유아동</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>생활용품</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>의류/잡화</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>스포츠/레저</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>도서/취미</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>기타용품</a>
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
                <a>글쓰기</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>내가 대여해 준 물품</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>내가 대여한 물품</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>담아 둔 목록보기</a>
              </h4>
            </li>
          </ul>

          {/* <!-- 고객서비스 메뉴 --> */}
          <ul className={styles.lnbItem}>
            <li>
              <h3>
                <a>자주묻는 질문</a>
              </h3>
            </li>
            <li>
              <h4>
                <a>자주묻는 질문</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>문의하기</a>
              </h4>
            </li>
            <li>
              <h4>
                <a>공지사항</a>
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
            <li>마이페이지</li>
            <li>로그인</li>
            <li>회원가입</li>
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
