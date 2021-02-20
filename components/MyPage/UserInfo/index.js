import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import USER from "../../../actions/userAction";

import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { changeNicknameDone, user } = useSelector((state) => state.user);

  const [email, setEmail] = useState(() => user?.email);
  const [nickname, setNickname] = useState(() => user?.nickname);

  useEffect(() => {
    if (changeNicknameDone) {
      confirm("닉네임 변경이 완료되었습니다.");
    }
  }, [user, changeNicknameDone]);

  useEffect(() => {
    setEmail(user.email);
    setNickname(user.nickname);
  }, []);

  const onChangePrfile = useCallback((e) => {
    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("profile", e.target.files[0]);

    dispatch({
      type: USER.UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch({
        type: USER.CHANGE_NICKNAME_REQUEST,
        data: nickname,
      });
    },
    [nickname],
  );

  return (
    <div className={styles.userInfoWrapper}>
      <form className={styles.userForm}>
        <div className={styles.uploadProfile}>
          <label htmlFor="addProfile">프로필 업로드</label>
          <img
            src={
              user.profileUrl ? `${user.profileUrl}` : "/images/no-profile.webp"
            }
          />
        </div>

        <input
          type="file"
          name="addProfile"
          id="addProfile"
          onChange={onChangePrfile}
        />

        <label htmlFor="email">이메일</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={setEmail}
          disabled
        />

        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          name="nickname"
          id="nickname"
          value={nickname}
          onChange={setNickname}
        />
      </form>
      <button className={styles.updateBtn} onClick={onSubmit}>
        변경하기
      </button>
    </div>
  );
};

export default UserInfo;
