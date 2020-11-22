import React, { useCallback, useState } from "react";
import styles from "./post.module.scss";
import Editor from "./PostEditor";
import classNames from "classnames/bind";
import { userSelect } from "../Hooks/userHooks";
import styled from "styled-components";
import { PlusCircleOutlined, RightOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const ErrorMessage = styled.div`
  color: red;
`;

const PostFormPhase2 = () => {
  const [long, short, onSelect] = userSelect();
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(5);
  const [minError, setMinError] = useState(false);
  const [maxError, setMaxError] = useState(false);

  const onMinCheck = useCallback(
    (e) => {
      setMin(e.target.value);
      if (e.target.value < 0 || e.target.value >= 31) {
        setMinError(true);
      } else {
        setMinError(false);
      }
    },
    [min],
  );

  const onMaxCheck = useCallback(
    (e) => {
      setMax(e.target.value);
      if (e.target.value < 5 || e.target.value >= 366) {
        setMaxError(true);
      } else {
        setMaxError(false);
      }
    },
    [max],
  );

  return (
    <>
      <article className={styles.postWrapper}>
        <h4>2단계</h4>
        <div className={styles.postContentsWrapper}>
          {/* 물건 대여 유형 */}
          <div className={styles.postContents}>
            <h5>물건의 대여 유형을 선택 해 주세요</h5>
            <div className={styles.radioWrapper}>
              <div className={styles.postTypeRadio} onClick={onSelect}>
                <button
                  className={
                    long
                      ? cx("active", "radioLabel")
                      : cx("noneActiveC", "radioLabel")
                  }
                  owner="borrower"
                >
                  장기 대여
                  <p>
                    장기간 대여를 하는 분들이 선택하는 유형으로 <br />
                    30일 이상 대여 시에 해당합니다
                  </p>
                </button>
              </div>

              <div className={styles.postTypeRadio} onClick={onSelect}>
                <button
                  className={
                    short
                      ? cx("active", "radioLabel")
                      : cx("noneActiveC", "radioLabel")
                  }
                  value="borrower"
                >
                  단기 대여
                  <p>
                    단기간 대여를 하는 분들이 선택하는 유형으로
                    <br />
                    30일 미만의 대여 시에 해당합니다
                  </p>
                </button>
              </div>
            </div>
          </div>
          {/* 물품 관련 텍스트 에디터 */}
          <div className={styles.postContents}>
            <h5>물품에 대한 내용을 작성해주세요</h5>
            <Editor />
          </div>
          <div className={styles.postContents}>
            <h5>대여 기간을 입력 해 주세요</h5>
            <div className={styles.inputWrapper}>
              <p>최소</p>
              <input
                type="number"
                min="1"
                max="31"
                step="5"
                className={styles.inputTerm}
                value={min}
                onChange={onMinCheck}
              />
              <p>일 / 최대</p>
              <input
                type="number"
                min="5"
                max="365"
                step="10"
                className={styles.inputTerm}
                value={max}
                onChange={onMaxCheck}
              />
              <p>일</p>
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>대여비의 계산 방법을 입력 해 주세요</h5>
            <div className={styles.inputWrapper}>
              <select
                name="renteFeeSelect"
                className={cx("categorySelect", "rentalFeeSelect")}
              >
                <option value="day">일(Days) 당</option>
                <option value="month">달(Month) 당</option>
                <option value="year">년(year) 당</option>
              </select>
              <input type="number" min="0" />
              <p>원</p>
              <button className={styles.addBtn}>
                제안추가&nbsp;
                <PlusCircleOutlined />
              </button>
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>적절한 보증금을 책정 해 주세요</h5>
            <div className={styles.inputWrapper}>
              <input type="number" min="0" className={styles.depositInput} />
              <p>원</p>
              <button className={styles.addBtn}>
                시세 알아보기&nbsp;
                <RightOutlined />
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostFormPhase2;
