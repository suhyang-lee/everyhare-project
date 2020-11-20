import React from "react";
import Head from "next/head";

import AppLayout from "../components/Layout/AppLayout";
import Signup from "../components/Signup/Signup";

const SignUp = () => {
  return (
    <AppLayout>
      <Head>
        <title>회원가입 | EveryShare</title>
      </Head>
      <Signup />
    </AppLayout>
  );
};

export default SignUp;
