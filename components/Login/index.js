import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./login.module.scss";
import LoginForm from "components/login/loginForm";

const Login = ({ onLoginModalOpen, onLoginModalClose }) => {
  const body = document.querySelector("body");
  const lockScroll = (e) => e.preventDefault();

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onLoginModalClose();
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
    <div className={styles.loginWrapper} onClick={onMaskClick}>
      <div className={styles.modalWrapper}>
        <button className={styles.closeBtn} onClick={onLoginModalClose}>
          <img src="/images/icon-close.svg" alt="로그인 모달 닫기" />
        </button>
        <img src="/images/img-everyshare-logo.svg" alt="에브리쉐어 로고" />
        <LoginForm
          onLoginModalClose={onLoginModalClose}
          onLoginModalOpen={onLoginModalOpen}
        />
      </div>
    </div>
  );
};

Login.propTypes = {
  onClickLoginModal: PropTypes.func,
};

export default Login;
