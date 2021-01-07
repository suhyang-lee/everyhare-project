import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import styles from "./comment.module.scss";
import {
  DeleteOutlined,
  EditOutlined,
  AlertOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const CommentList = ({ comment }) => {
  const { User } = comment;
  const { user } = useSelector((state) => state.user);
  const id = user?.id;

  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <li className={styles.commentWrapper}>
      <div className={styles.commentProfile}>
        <div className={styles.userProfileImage}>
          <img
            src="https://images.unsplash.com/photo-1518109331836-a2a7e93f89bb?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
            alt="프로필이미지"
          />
        </div>
        <p>{User.nickname}</p>
        <p>@{User.email && User.email.split("@")[0]}</p>
        {console.log(User.email)}
      </div>
      <div className={styles.commentContents}>
        <div className={styles.commentInfo}>
          <p>{moment(comment.updatedAt).format("YYYY/MM/DD H:MM")}</p>
          {id && User.id === id ? (
            <>
              <button>
                <DeleteOutlined alt="게시물 삭제하기" />
              </button>
              <button>
                <EditOutlined alt="게시물 수정하기" />
              </button>
            </>
          ) : (
            <button>
              <AlertOutlined alt="신고하기" />
            </button>
          )}
        </div>
        <p>{comment.contents}</p>
        <button onClick={onToggleLike}>
          {liked ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}{" "}
          5
        </button>
      </div>
    </li>
  );
};

CommentList.propTypes = {
  comment: PropTypes.object,
};
export default CommentList;
