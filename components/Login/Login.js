import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./login.module.scss";
import LoginForm from "./LoginForm";

const Login = ({ onClickLoginModalClose, setIsLoggedIn }) => {
  /* 모달 부모창 스크롤 막기 */
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
          <LoginForm
            setIsLoggedIn={setIsLoggedIn}
            onClickLoginModalClose={onClickLoginModalClose}
          />
        </div>
      </div>
    </>
  );
};

Login.propTypes = {
  onClickLoginModalClose: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Login;
