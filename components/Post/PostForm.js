import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { EditorState } from "draft-js";
import { useForm } from "react-hook-form";
import Router from "next/router";

import styles from "./post.module.scss";
import Phase1 from "./PostFormPhase1";
import Phase2 from "./PostFormPhase2";

import { addPost } from "../../reducers/post";

const PostForm = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();
  const { addPostDone, ImagePaths, posts } = useSelector((state) => state.post);
  const { register, handleSubmit, errors, reset } = useForm();

  useEffect(() => {
    if (addPostDone) {
      reset();
      setEditorState("");
      Router.push(`view/${posts[0].id}`);
    }
  }, [addPostDone]);

  const onSubmit = useCallback(
    (data) => {
      const editorToHtml = draftToHtml(
        convertToRaw(editorState.getCurrentContent()),
      );

      //전달 데이터 내부에 richtext 컨텐츠 삽입
      data.contents = editorToHtml;
      data.Images = ImagePaths;

      dispatch(addPost(data));
    },
    [editorState, ImagePaths],
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <img src="/images/icon-product.svg" alt="물품등록" />
        <h3>물품등록</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Phase1 register={register} errors={errors} />
        <Phase2
          register={register}
          errors={errors}
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <button htmltype="submit" className={styles.submitBtn}>
          물품 등록하기
        </button>
      </form>
    </div>
  );
};

export default PostForm;
