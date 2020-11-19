import React, { useEffect } from "react";
import styles from "./login.module.scss";
import PropTypes from "prop-types";

const Login = ({ onClickLoginModalClose }) => {
  const body = document.querySelector("body");
  const lockScroll = (e) => e.preventDefault();

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClickLoginModalClose(e);
    }
  };

  useEffect(() => {
    body.addEventListener("touchmove", lockScroll, { passive: false });
    body.style.overflow = "hidden";
    return () => {
      body.removeEventListener("touchmove", lockScroll, { passive: false });
      body.style.removeProperty("overflow");
    };
  }, []);

  return (
    <>
      <div className={styles.loginWrapper} onClickCapture={onMaskClick}>
        <div className={styles.modalWrapper}>
          <button className={styles.closeBtn} onClick={onClickLoginModalClose}>
            <img src="/images/icon-close.svg" alt="로그인 모달 닫기" />
          </button>
          <img src="/images/img-everyshare-logo.svg" alt="에브리쉐어 로고" />
          <form className={styles.loginForm}>
            <input type="text" name="id" placeholder="아이디" />
            <input type="password" name="password" placeholder="비밀번호" />
          </form>

          <div className={styles.loginInfoSet}>
            <label>
              <input type="checkbox" /> 로그인 유지하기
            </label>
            <button>아이디/비밀번호 찾기</button>
          </div>

          <div className={styles.loginButtonList}>
            <button>에브리쉐어 로그인</button>
            <button>카카오 로그인</button>
            <button>네이버 로그인</button>
          </div>
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  onClickLoginModalClose: PropTypes.func.isRequired,
};

export default Login;
