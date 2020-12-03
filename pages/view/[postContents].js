import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import AppLayout from "../../components/Layout/AppLayout";
import View from "../../components/Views/View";
import { useSelector } from "react-redux";

const PostContents = () => {
  const postId = useRouter().query.postContents;
  const { posts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>게시물 상세보기 | EveryShare</title>
      </Head>
      <View
        post={posts.find((v) => v.id === parseInt(postId))}
        postId={postId}
      />
    </AppLayout>
  );
};

export default PostContents;
