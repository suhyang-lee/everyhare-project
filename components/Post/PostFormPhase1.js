import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import styles from "./post.module.scss";
import classNames from "classnames/bind";
import _ from "lodash/fp";

const cx = classNames.bind(styles);

const ErrorMessage = styled.div`
  display: block;
  color: red;
  margin-top: 1rem;
`;

const PostFormPhase1 = ({ register, errors }) => {
  return (
    <>
      <article className={styles.postWrapper}>
        <h4>1단계</h4>
        <div className={styles.postContentsWrapper}>
          <div className={styles.postContents}>
            <h5>물품등록 유형을 선택하세요</h5>
            <div className={styles.radioWrapper}>
              <div className={styles.postTypeRadio}>
                <input
                  ref={register}
                  type="radio"
                  id="owner"
                  name="postType"
                  value="owner"
                  defaultChecked
                  hidden
                />
                <label
                  htmlFor="owner"
                  className={cx("radioLabel", "typeLabel")}
                >
                  물건 빌려드려요
                  <p>
                    회원님의 집에 방치되어 있는 물건을 <br />
                    필요한 누군가에게 빌려주는 유형입니다
                  </p>
                </label>
              </div>

              <div className={styles.postTypeRadio}>
                <input
                  ref={register}
                  type="radio"
                  id="borrower"
                  name="postType"
                  value="borrower"
                  hidden
                />
                <label
                  htmlFor="borrower"
                  className={cx("radioLabel", "typeLabel")}
                >
                  물건 빌려주세요
                  <p>
                    필요하지만 구매하기엔 고민이 될 때 <br />
                    누군가에게 빌리는 유형입니다
                  </p>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>카테고리를 선택 해 주세요</h5>

            <select
              name="category"
              className={styles.selectList}
              ref={register}
            >
              <option value="" disabled>
                카테고리를 선택 해 주세요
              </option>
              <option value="digital">디지털/가전</option>
              <option value="kids">유아동</option>
              <option value="goods">생활용품</option>
              <option value="clothing">의류/잡화</option>
              <option value="sports">스포츠/레저</option>
              <option value="hobby">도서/취미</option>
              <option value="etc">기타용품</option>
            </select>
          </div>
        </div>
      </article>
    </>
  );
};

PostFormPhase1.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default PostFormPhase1;
