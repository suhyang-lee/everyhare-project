import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./userInfo.module.scss";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const onChangePrfile = useCallback((e) => {
    e.preventDefault();

    const imageFormData = new FormData();
    imageFormData.append("image", e.target.files);

    console.log(imageFormData);
  }, []);
  return (
    <div className={styles.userInfoWrapper}>
      <form className={styles.userForm}>
        <div className={styles.uploadProfile}>
          <label htmlFor="addProfile">프로필 업로드 </label>
          <img src={user.profileUrl} />
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
          value={user.email}
          disabled
        />

        <label htmlFor="phoneNumber">핸드폰 번호</label>
        <input type="text" name="phoneNumber" id="phoneNumber" />

        <label htmlFor="nickname">닉네임</label>
        <input type="text" name="nickname" id="nickname" />
      </form>
      <button className={styles.updateBtn}>변경하기</button>
    </div>
  );
};

export default UserInfo;
