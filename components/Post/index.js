import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import Phase1 from "components/post/postFormPhase1";
import Phase2 from "components/post/postFormPhase2";
import styles from "./post.module.scss";

const PostForm = ({ post, setContents, onSubmit, defaultFormValues }) => {
  const { register, handleSubmit, errors } = useForm(defaultFormValues);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <img src="/images/icon-product.svg" alt="물품등록" />
        <h3>물품등록</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Phase1 register={register} errors={errors} post={post} />
        <Phase2
          post={post}
          register={register}
          errors={errors}
          setContents={setContents}
        />
        <button htmltype="submit" className={styles.submitBtn}>
          물품 등록하기
        </button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  handleEditorStateChange: PropTypes.func,
  post: PropTypes.shape({
    id: PropTypes.number,
    postType: PropTypes.string,
    category: PropTypes.string,
    rentTerm: PropTypes.string,
    title: PropTypes.string,
    priceType: PropTypes.string,
    price: PropTypes.number,
    deposit: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PostForm;
