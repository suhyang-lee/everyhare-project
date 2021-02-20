/* 페이지 공통 헤더  */
import React, { useCallback, useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Router from "next/router";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./search.module.scss";
import useInput from "../../../Hooks/useInput";

const Search = ({ onClickSearch }) => {
  const [search, onChangeSearch] = useInput("");
  const body = document.querySelector("body");
  const lockScroll = (e) => e.preventDefault();

  useEffect(() => {
    body.addEventListener("touchmove", lockScroll, { passive: false });
    body.style.overflow = "hidden";
    return () => {
      body.removeEventListener("touchmove", lockScroll, { passive: false });
      body.style.removeProperty("overflow");
    };
  }, []);

  const onSearch = useCallback(() => {
    Router.push(`/search?keyword=${search}`);
  }, [search]);

  return (
    <>
      <div className={styles.backgroundWrapper}>
        <div className={styles.searchWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.logo}>
              <img src="/images/img-everyshare-logo.svg" alt="에브리쉐어" />
            </div>

            <input
              type="search"
              name="userSearch"
              value={search}
              onChange={onChangeSearch}
              placeholder="검색어를 입력하세요"
            />
            <button onClick={onSearch}>
              <SearchOutlined />
            </button>
          </div>
          <button className={styles.closeBtn} onClick={onClickSearch}>
            <CloseOutlined />
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
