import React, { useCallback, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import PropTypes from "prop-types";

const LoginForm = ({ setIsLoggedIn, onClickLoginModalClose }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(id, password);
      setIsLoggedIn(true);
      onClickLoginModalClose();
    },
    [id, password],
  );
  return (
    <>
      <form className={styles.loginForm} onSubmit={onSubmitForm}>
        <input
          type="text"
          name="user-id"
          value={id}
          onChange={onChangeId}
          placeholder="아이디"
        />
        <input
          type="password"
          name="user-password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
        />

        <div className={styles.loginInfoSet}>
          <label>
            <input type="checkbox" /> 로그인 유지하기
          </label>
          <Link href="/profile/search">
            <button>아이디/비밀번호 찾기</button>
          </Link>
        </div>

        <div className={styles.loginButtonList}>
          <button htmltype="submit">에브리쉐어 로그인</button>
          <button>카카오 로그인</button>
          <button>네이버 로그인</button>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  onClickLoginModalClose: PropTypes.func.isRequired,
};

export default LoginForm;
