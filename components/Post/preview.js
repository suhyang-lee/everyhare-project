import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import styles from "./post.module.scss";
import { CloseCircleFilled } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import POST from "actions/postAction";

const Preview = ({ image, index, post }) => {
  const dispatch = useDispatch();

  const onRemoveImage = useCallback((e) => {
    if (post) {
      dispatch({
        type: POST.REMOVE_IMAGES_REQUEST,
        data: { id: index },
      });
    } else {
      dispatch({
        type: POST.REMOVE_IMAGE,
        data: index,
      });
    }
  }, []);

  return (
    <div className={styles.imagePreviews} key={index}>
      <CloseCircleFilled
        className={styles.closeBtn}
        key={image.src}
        onClick={onRemoveImage}
      />
      <img src={`http://localhost:3060/${image.src}`} alt={image.src} />
    </div>
  );
};

export default Preview;
