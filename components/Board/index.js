import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import styles from "./board.module.scss";
import { SnippetsOutlined } from "@ant-design/icons";

const Board = ({ posts, title }) => {
  const { loadPostsLoading } = useSelector((state) => state.post);

  return (
    <section className={styles.contentsWrapper}>
      <div className={styles.titleWrapper}>
        <h3>{title}</h3>
        <button>
          필터
          <img src="../images/icon-filter.svg" alt="필터" />
        </button>
      </div>
      {posts.length === 0 && (
        <div className={styles.nonePost}>
          <span>
            <SnippetsOutlined />
            현재 게시물이 존재하지않아요!
          </span>
          <Link href="/post">
            <button>가장 먼저 글쓰기</button>
          </Link>
        </div>
      )}
      {loadPostsLoading ? (
        <div>loading.....</div>
      ) : (
        <>
          <div className={styles.listContents}>
            {posts.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </div>
        </>
      )}
    </section>
  );
};

Board.propTypes = {
  category: PropTypes.string,
};

export default Board;
