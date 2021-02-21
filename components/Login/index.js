import React, { useCallback, useEffect, useState } from "react";
import styles from "./login.module.scss";
import Link from "next/link";
import styled from "styled-components";

import useInput from "../../Hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequstAction } from "../../reducers/user";

const Error = styled.div`
  width: 100%;
  color: red;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.2rem;
  font-size: 0.9rem;
  text-align: left;
`;

const LoginForm = ({ onClickLoginModal, isShow }) => {
  const dispatch = useDispatch();
  const { loginLoadding, user, loginDone, loginError } = useSelector(
    (state) => state.user,
  );
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [keepLoggedIn, onChangeKeepLoggedIn] = useInput("");
  const [loginInputError, setLoginInputError] = useState(false);
  const [attemptLoginError, setAttemptLoginError] = useState(false);

  useEffect(() => {
    if (loginError) {
      setAttemptLoginError(true);
    }
  }, [loginError, setAttemptLoginError]);

  useEffect(
    (e) => {
      if (loginDone) {
        onClickLoginModal(!e);
      }
    },
    [loginDone],
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (email === "" || password === "") {
        return setLoginInputError(true);
      }
      dispatch(loginRequstAction({ email, password }));
    },
    [email, password, setLoginInputError],
  );

  const onKakaoTalkLogin = useCallback((e) => {
    e.preventDefault();
    const currentUrl = document.location.href;
    window.location.href = `http://localhost:3060/auth/kakao?redirect_url=${encodeURIComponent(
      currentUrl,
    )}`;
  }, []);

  const onNaverLogin = useCallback((e) => {
    e.preventDefault();
    const currentUrl = document.location.href;
    window.location.href = `http://localhost:3060/auth/naver?redirect_url=${encodeURIComponent(
      currentUrl,
    )}`;
  }, []);

  return (
    <>
      <form className={styles.loginForm} onSubmit={onSubmit}>
        <input
          type="email"
          name="user-email"
          value={email}
          onChange={onChangeEmail}
          placeholder="이메일"
        />
        <input
          type="password"
          name="user-password"
          value={password}
          onChange={onChangePassword}
          placeholder="비밀번호"
        />
        {loginInputError && (
          <Error>이메일 또는 비밀번호가 입력되지 않았습니다.</Error>
        )}
        {attemptLoginError && (
          <Error>가입되지 않은 아이디이거나 잘못된 비밀번호 입니다.</Error>
        )}
        <div className={styles.loginInfoSet}>
          <div className={styles.loginKeep}>
            <input
              id="keepLoggedIn"
              type="checkbox"
              value={keepLoggedIn}
              onChange={onChangeKeepLoggedIn}
            />
            <label htmlFor="keepLoggedIn">로그인 유지하기</label>
          </div>
          <Link href="/profile/search">
            <div>아이디/비밀번호 찾기</div>
          </Link>
        </div>

        <div className={styles.loginButtonList}>
          <button htmltype="submit">에브리쉐어 로그인</button>
          <button onClick={onKakaoTalkLogin}>카카오 로그인</button>
          <button onClick={onNaverLogin}>네이버 로그인</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
