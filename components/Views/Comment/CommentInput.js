import React, { useCallback, useEffect } from "react";
import { MessageFilled } from "@ant-design/icons";
import { useForm } from "react-hook-form";

import styles from "./comment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../../reducers/post";

const CommentInput = ({ postId }) => {
  const { register, handleSubmit, reset } = useForm();
  const { addCommentDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addCommentDone) {
      reset();
    }
  }, [addCommentDone]);

  const onSubmitForm = useCallback((data) => {
    data.postId = postId;
    console.log(data);
    dispatch(addComment(data));
  });

  return (
    <form className={styles.commentInput} onSubmit={handleSubmit(onSubmitForm)}>
      <input
        type="text"
        placeholder="제품에 대한 댓글을 남겨주세요"
        name="comment"
        ref={register}
      />
      <button htmltype="submit">
        <MessageFilled />
      </button>
    </form>
  );
};

export default CommentInput;
