import React from "react";
import Head from "next/head";
import Link from "next/link";

import { END } from "redux-saga";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import wrapper from "../store/configureStore";
import styles from "../components/Login/login.module.scss";
import LoginForm from "../components/Login";
import styled from "styled-components";

const HeaderLink = styled.a`
  color: black;
  cursor: pointer;
`;

const LoginPage = () => {
  return (
    <Layout>
      <Head>
        <title>로그인 | EveryShare</title>
      </Head>
      <div className={styles.loginWrapper}>
        <div className={styles.modalWrapper}>
          <Link href="/">
            <HeaderLink>
              <img
                src="/images/img-everyshare-logo.svg"
                alt="에브리쉐어 로고"
              />
            </HeaderLink>
          </Link>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";

    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default LoginPage;
