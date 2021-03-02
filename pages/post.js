import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import wrapper from "store/configureStore";
import { addPost } from "reducers/post";

import USER from "actions/userAction";

import AppLayout from "components/layout/appLayout";
import PostForm from "components/post";
import LoadingIcon from "components/common/loadingIcon";

const Post = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [contents, setContents] = useState("");

  const { user } = useSelector((state) => state.user);
  const { posts, ImagePaths, addPostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);

  useEffect(() => {
    if (addPostDone) {
      setContents("");
      router.push(`view/${posts[0].id}`);
    }
  }, [addPostDone]);

  const onSubmit = useCallback(
    async (data) => {
      const editorToHtml = draftToHtml(
        convertToRaw(contents.getCurrentContent()),
      );

      data.contents = editorToHtml;
      data.Images = ImagePaths;

      dispatch(addPost(data));
    },
    [contents, ImagePaths],
  );

  return (
    <>
      {user ? (
        <AppLayout>
          <Head>
            <title>글쓰기 | EveryShare</title>
          </Head>
          <PostForm setContents={setContents} onSubmit={onSubmit} />
        </AppLayout>
      ) : (
        <LoadingIcon />
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: USER.LOAD_USER_INFO_REQUEST,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Post;
