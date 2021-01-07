import React from "react";

import styles from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h3>MY PAGE</h3>

      <h4>거래 내역</h4>
      <ul>
        <li>내가 대여해 준 물품</li>
        <li>내가 대여한 물품</li>
      </ul>

      <h4>회원 정보</h4>
      <ul>
        <li>내가 쓴 글 보기</li>
        <li>내가 쓴 댓글 보기</li>
        <li>회원정보 수정</li>
        <li>회원탈퇴</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
