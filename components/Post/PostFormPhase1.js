import React from "react";
import styles from "./post.module.scss";
import classNames from "classnames/bind";
import { userSelect } from "../Hooks/userHooks";
const cx = classNames.bind(styles);

const PostFormPhase1 = () => {
  const [owner, borrower, onSelect] = userSelect();

  return (
    <>
      <article className={styles.postWrapper}>
        <h4>1단계</h4>
        <div className={styles.postContentsWrapper}>
          <div className={styles.postContents}>
            <h5>물품등록 유형을 선택하세요</h5>
            <div className={styles.radioWrapper}>
              <div className={styles.postTypeRadio} onClick={onSelect}>
                <button
                  className={
                    owner
                      ? cx("active", "radioLabel")
                      : cx("noneActive", "radioLabel")
                  }
                  owner="borrower"
                >
                  물건 빌려드려요
                  <p>
                    회원님의 집에 방치되어 있는 물건을 <br />
                    필요한 누군가에게 빌려주는 유형입니다
                  </p>
                </button>
              </div>

              <div className={styles.postTypeRadio} onClick={onSelect}>
                <button
                  className={
                    borrower
                      ? cx("active", "radioLabel")
                      : cx("noneActive", "radioLabel")
                  }
                  value="borrower"
                >
                  물건 빌려주세요
                  <p>
                    필요하지만 구매하기엔 고민이 될 때 <br />
                    누군가에게 빌리는 유형입니다
                  </p>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>지역은 어디신가요?</h5>
            <div className={styles.locationWrapper}>
              <input type="text" name="location" />
              <button className={styles.gpsBtn}>
                <img src="/images/icon-gps.svg" alt="GPS 이미지" />
              </button>
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>카테고리를 선택 해 주세요</h5>

            <select name="CategorySelect" className={styles.categorySelect}>
              <option value="" disabled>
                카테고리를 선택 해 주세요
              </option>
              <option value="디지털/가전">디지털/가전</option>
              <option value="유아동">유아동</option>
              <option value="생활용품">생활용품</option>
              <option value="의류/잡화">의류/잡화</option>
              <option value="스포츠/레저">스포츠/레저</option>
              <option value="도서/취미">도서/취미</option>
              <option value="기타용품">기타용품</option>
            </select>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostFormPhase1;
