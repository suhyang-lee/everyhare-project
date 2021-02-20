import React from "react";
import Link from "next/link";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h3>MY PAGE</h3>

      <h4>거래 내역</h4>
      <ul>
        <Link href="/mypage/owner">
          <li>내가 대여해 준 물품</li>
        </Link>
        <Link href="/mypage/borrow">
          <li>내가 대여한 물품</li>
        </Link>
      </ul>

      <h4>회원 정보</h4>
      <ul>
        <Link href="/mypage/posts">
          <li>내가 쓴 글 보기</li>
        </Link>
        <Link href="/mypage/comments">
          <li>내가 쓴 댓글 보기</li>
        </Link>
        <Link href="/mypage/info">
          <li>회원정보 수정</li>
        </Link>
        <Link href="/mypage/signout">
          <li>회원탈퇴</li>
        </Link>
      </ul>
    </aside>
  );
};

export default Sidebar;
