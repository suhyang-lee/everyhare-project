import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "../../actions/userAction";

import { userInput } from "../Hooks/userHooks";
import styles from "./signup.module.scss";

const ErrorMessage = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signupLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = userInput("");

  const [password, onChangePassword] = userInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [nickname, onChangeNickname] = userInput("");
  const [phoneNumber, onChangePhoneNumber] = userInput("");

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      console.log(email, nickname, password, phoneNumber);
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, nickname, password, phoneNumber },
      });
    },
    [password, passwordCheck, term],
  );
  return (
    <div className={styles.joinWrapper}>
      <div className={styles.joinItem}>
        <div className={styles.joinContent}>
          <h4>에브리쉐어 가입하기</h4>
          <p>
            에브리쉐어에서 이제는 새로운 가치를 창출하고 <br />
            물건을 사지말고 대여하며 환경보호에 동참해요!
          </p>
        </div>
        <div className={styles.joinContent}>
          <button>카카오로 신규가입</button>
          <button>네이버로 신규가입</button>
        </div>
      </div>
      <div className={styles.joinItem}>
        <hr /> OR
        <hr />
      </div>
      <div className={styles.joinItem}>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            name="user-email"
            value={email}
            onChange={onChangeEmail}
            required
            placeholder="사용하실 이메일을 입력 해 주세요."
          />
          <input
            type="password"
            name="user-password"
            value={password}
            onChange={onChangePassword}
            placeholder="패스워드의 조합을 영문 + 숫자 + 특수문자 8~16자리로 입력 해 주세요."
          />
          <input
            type="password"
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            placeholder="패스워드를 재입력 해 주세요."
          />
          {passwordError && (
            <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
          )}
          <input
            type="text"
            name="user-nickname"
            value={nickname}
            onChange={onChangeNickname}
            placeholder="별명을 입력 해 주세요."
          />
          <input
            type="text"
            name="user-phone-number"
            value={phoneNumber}
            onChange={onChangePhoneNumber}
            placeholder="휴대폰 번호를 '-'표 없이 입력 해 주세요"
          />
          <p className={styles.joinInfoMessage}>
            <input
              type="checkbox"
              name="user-term"
              checked={term}
              onChange={onChangeTerm}
            />
            ※ 에브리쉐어는 실제로 서비스되고 있지 않습니다. <br />
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </p>
          <button className={styles.joinSubmitBtn} htmltype="submit">
            에브리쉐어 가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
