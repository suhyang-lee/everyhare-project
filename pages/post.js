import React from "react";
import Head from "next/head";

import AppLayout from "../components/Layout/AppLayout";
import PostForm from "../components/Post/PostForm";

const Post = () => {
  return (
    <AppLayout>
      <Head>
        <title>글쓰기 | EveryShare</title>
      </Head>
      <PostForm />
    </AppLayout>
  );
};

export default Post;
