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
  const { user } = useSelector((state) => state.user);

  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  return (
    <li className={styles.commentWrapper}>
      <div className={styles.commentProfile}>
        <div className={styles.userProfileImage}>
          <img src={comment.User.profileUrl} alt="프로필이미지" />
        </div>
        <p>{comment.User.nickname}</p>
        <p>@{comment.User.email && comment.User.email.split("@")[0]}</p>
      </div>
      <div className={styles.commentContents}>
        <div className={styles.commentInfo}>
          <p>{moment(comment.updatedAt).format("YYYY/MM/DD H:MM")}</p>

          {user.id === comment.User.id ? (
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
          0
        </button>
      </div>
    </li>
  );
};

CommentList.propTypes = {
  comment: PropTypes.object,
};
export default CommentList;
