import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import PostCard from "./PostCard";
import styles from "./board.module.scss";
import { LOAD_POST_REQUEST } from "../../actions/postAction";

const Board = () => {
  const dispatch = useDispatch();
  const { posts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post,
  );
  const { query } = useRouter();

  const category = {
    digital: "디지털/가전",
    kids: "유아동",
    goods: "생활용품",
    clothing: "의류/잡화",
    sports: "스포츠/레저",
    hobby: "도서/취미",
    etc: "기타용품",
  };

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  return (
    <section className={styles.contentsWrapper}>
      <div className={styles.titleWrapper}>
        <h3>{category[query.category]}</h3>
        <button>
          필터
          <img src="../images/icon-filter.svg" alt="필터" />
        </button>
      </div>

      <div className={styles.listContents}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Board;
