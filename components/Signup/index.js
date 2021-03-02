import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { WarningOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import styled from "styled-components";
import USER from "actions/userAction";
import styles from "./signup.module.scss";

const Error = styled.div`
  color: red;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-left: 0.2rem;
  font-size: 0.9rem;
`;

const signUpSchema = yup.object().shape({
  userEmail: yup
    .string()
    .email("잘못된 이메일 형식 입니다.")
    .max(50, "이메일 주소는 50자 이하로 입력하셔야 합니다.")
    .required("이메일 주소를 반드시 입력하셔야 합니다."),

  userPassword: yup
    .string()
    .min(8, "패스워드는 최소 8자 이상 입니다.")
    .matches(
      /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{8,16}$/,
      "패스워드의 조합을 영문 + 숫자 + 특수문자 8~16자리로 입력 해 주세요.",
    )
    .required("패스워드는 반드시 입력해야 합니다."),

  userPasswordCheck: yup
    .string()
    .oneOf([yup.ref("userPassword"), null], "입력한 비밀번호와 다릅니다.")
    .required("패스워드 확인이 필요합니다."),

  userNickname: yup
    .string()
    .max(20, "별명은 20자 이하로 입력하셔야 합니다.")
    .required("별명을 반드시 입력하셔야 합니다."),

  userPhoneNumber: yup
    .string()
    .matches(/^\d{3}\d{3,4}\d{4}$/, "잘못된 번호 형식 입니다.")
    .required("핸드폰 번호는 반드시 입력해야 합니다."),

  userTerm: yup.bool().oneOf([true], "약관에 동의하셔야 합니다."),
});

const Signup = () => {
  const dispatch = useDispatch();
  const { signupDone, signupError, user } = useSelector((state) => state.user);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (signupDone) {
      Router.replace("/");
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  useEffect(() => {
    if (user && user.id) {
      Router.replace("/");
    }
  }, [user]);

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
  });

  const onSubmit = useCallback((data) => {
    data.provider = "local";
    console.log(data);
    dispatch({
      type: USER.SIGN_UP_REQUEST,
      data: data,
    });
  }, []);

  return (
    <div className={styles.joinWrapper}>
      <div className={styles.joinItem}>
        <div className={styles.joinContent}>
          <h4>에브리쉐어 가입하기</h4>
          <p>
            에브리쉐어에서 새로운 가치를 창출하고 <br />
            물건을 대여하여 사용하며 환경보호에 동참해요!
          </p>
        </div>
        <div className={styles.joinContent}>
          <button onClick={onKakaoTalkLogin}>카카오로 신규가입</button>
          <button onClick={onNaverLogin}>네이버로 신규가입</button>
        </div>
      </div>
      <div className={styles.joinItem}>
        <hr /> OR
        <hr />
      </div>
      <div className={styles.joinItem}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            name="userEmail"
            placeholder="사용하실 이메일을 입력 해 주세요."
            ref={register}
          />
          {errors.userEmail && (
            <ErrorMessage>{errors.userEmail?.message}</ErrorMessage>
          )}
          <input
            type="password"
            name="userPassword"
            placeholder="패스워드의 조합을 영문 + 숫자 + 특수문자 8~16자리로 입력 해 주세요."
            ref={register}
          />

          {errors.userPassword && (
            <ErrorMessage> {errors.userPassword?.message}</ErrorMessage>
          )}

          <input
            type="password"
            name="userPasswordCheck"
            placeholder="패스워드를 재입력 해 주세요."
            ref={register}
          />
          {errors.userPasswordCheck && (
            <ErrorMessage>{errors.userPasswordCheck?.message}</ErrorMessage>
          )}

          <input
            type="text"
            name="userNickname"
            placeholder="별명을 입력 해 주세요."
            ref={register}
          />
          {errors.userNickname && (
            <ErrorMessage> {errors.userNickname?.message}</ErrorMessage>
          )}
          <input
            type="text"
            name="userPhoneNumber"
            placeholder="휴대폰 번호를 '-'표 없이 입력 해 주세요"
            ref={register}
          />
          {errors.userPhoneNumber && (
            <ErrorMessage> {errors.userPhoneNumber?.message}</ErrorMessage>
          )}
          <p className={styles.joinInfoMessage}>
            ※ 에브리쉐어는 실제로 서비스되고 있지 않습니다{" "}
            <input type="checkbox" name="userTerm" ref={register} />
            {errors.userTerm && (
              <ErrorMessage>{errors.userTerm?.message}</ErrorMessage>
            )}
          </p>

          <button htmltype="submit" className={styles.joinSubmitBtn}>
            에브리쉐어 가입하기
          </button>
        </form>
      </div>
    </div>
  );
};

const ErrorMessage = ({ children }) => {
  return (
    <Error>
      <WarningOutlined /> {children}
    </Error>
  );
};

export default Signup;
