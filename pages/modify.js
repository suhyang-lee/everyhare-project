import React, { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import axios from "axios";
import wrapper from "store/configureStore";

import { END } from "redux-saga";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { convertToRaw } from "draft-js";

import draftToHtml from "draftjs-to-html";

import USER from "actions/userAction";
import POST from "actions/postAction";

import AppLayout from "components/layout/appLayout";
import PostForm from "components/post";
import LoadingIcon from "components/common/loadingIcon";

const Modify = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const postId = router.query.postId;

  const [contents, setContents] = useState("");
  const { user } = useSelector((state) => state.user);
  const {
    post,
    posts,
    ImagePaths,
    updatePostDone,
    removeUploadImagesDone,
  } = useSelector((state) => state.post);

  const defaultFormValues = {
    defaultValues: {
      category: post.category || "",
      deposit: post.deposit || "",
      postType: post.postType || "",
      rentTerm: post.rentTerm || "",
      rentalFee: post.price || "",
      rentelFeeSelect: post.priceType || "",
      title: post.title || "",
    },
  };

  useEffect(async () => {
    if (!user) router.replace("/login");

    dispatch({
      type: POST.LOAD_POST_REQUEST,
      data: { postId },
    });
  }, [removeUploadImagesDone]);

  useEffect(() => {
    if (updatePostDone) {
      setContents("");
      router.push(`view/${posts[0].id}`);
    }
  }, [updatePostDone]);

  const onSubmit = useCallback(
    async (data) => {
      const editorToHtml = draftToHtml(
        convertToRaw(contents.getCurrentContent()),
      );

      data.contents = editorToHtml;
      data.Images = ImagePaths;

      dispatch({
        type: POST.UPDATE_POST_REQUEST,
        data: { id: postId, data },
      });
    },
    [contents, ImagePaths],
  );

  return (
    <>
      {user ? (
        <AppLayout>
          <Head>
            <title>글 수정하기 | EveryShare</title>
          </Head>
          <PostForm
            post={post}
            setContents={setContents}
            onSubmit={onSubmit}
            defaultFormValues={defaultFormValues}
          />
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

export default Modify;
