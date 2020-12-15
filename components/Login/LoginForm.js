import React, { useCallback, useEffect } from "react";

import styles from "./login.module.scss";
import Link from "next/link";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { userInput } from "../Hooks/userHooks";
import { useDispatch, useSelector } from "react-redux";
import { loginRequstAction } from "../../reducers/user";

const LoginForm = ({ onClickLoginModal }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loginLoadding, loginError, user } = useSelector(
    (state) => state.user,
  );
  const [email, onChangeEmail] = userInput("");
  const [password, onChangePassword] = userInput("");
  const [keepLoggedIn, onChangeKeepLoggedIn] = userInput("");

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (user && user.id) {
      router.push("/");
    }
  }, [user]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(loginRequstAction({ email, password }));
      onClickLoginModal(!e);
    },
    [email, password],
  );

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

export default LoginForm;
