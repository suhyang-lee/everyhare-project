import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import AppLayout from "../components/Layout/AppLayout";
import PostForm from "../components/Post";

import Loading from "../components/common/Loading";

const Post = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  return (
    <>
      {user ? (
        <AppLayout>
          <Head>
            <title>글쓰기 | EveryShare</title>
          </Head>
          <PostForm />
        </AppLayout>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Post;
