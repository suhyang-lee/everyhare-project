import React, { useCallback } from "react";
import styles from "./post.module.scss";
import _ from "lodash/fp";
import PropTypes from "prop-types";
import styled from "styled-components";
import classNames from "classnames/bind";
import { v4 as uuidv4 } from "uuid";
import { RightOutlined, CloseCircleFilled } from "@ant-design/icons";

import Editor from "./PostEditor";
import { useDispatch, useSelector } from "react-redux";
import POST from "../../actions/postAction";

const cx = classNames.bind(styles);

const ErrorMessage = styled.div`
  display: block;
  color: red;
  margin-top: 1rem;
`;

const PostFormPhase2 = ({ register, setEditorState, errors }) => {
  const dispatch = useDispatch();
  const { ImagePaths } = useSelector((state) => state.post);

  const onChangeImages = useCallback(
    (e) => {
      e.preventDefault();

      let totalImages = e.target.files.length + ImagePaths.length;

      if (totalImages >= 11) {
        return alert("최대 10개까지 업로드가 가능합니다.");
      }

      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (file) => {
        imageFormData.append("image", file);
      });

      dispatch({
        type: POST.UPLOAD_IMAGES_REQUEST,
        data: imageFormData,
      });
    },
    [ImagePaths],
  );

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({
        type: POST.REMOVE_IMAGE,
        data: index,
      });
    },
    [],
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
              <div className={styles.postTypeRadio}>
                <input
                  ref={register}
                  type="radio"
                  name="rentTerm"
                  value="long"
                  id="long"
                  hidden
                  defaultChecked
                />
                <label htmlFor="long" className={cx("radioLabel", "termLabel")}>
                  장기 대여
                  <p>
                    장기간 대여를 하는 분들이 선택하는 유형으로 <br />
                    30일 이상 대여 시에 해당합니다
                  </p>
                </label>
              </div>

              <div className={styles.postTypeRadio}>
                <input
                  ref={register}
                  type="radio"
                  name="rentTerm"
                  value="short"
                  id="short"
                  hidden
                />
                <label
                  htmlFor="short"
                  className={cx("radioLabel", "termLabel")}
                >
                  단기 대여
                  <p>
                    단기간 대여를 하는 분들이 선택하는 유형으로
                    <br />
                    30일 미만의 대여 시에 해당합니다
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* 물품 이미지 추가 */}
          <div className={styles.postContents}>
            <h5>
              대여 할 이미지를 등록 해 주세요 <br />{" "}
              <span>{ImagePaths.length}/10</span>
            </h5>

            <div className={styles.imageUploadWrapper}>
              <label htmlFor="addFile">사진등록</label>
              <input
                type="file"
                multiple
                id="addFile"
                name="image"
                onChange={onChangeImages}
              />
              {/* 이미지 업로드시 미리보기 */}
              {ImagePaths.map((image, index) => {
                return (
                  <>
                    <div className={styles.imagePreviews} key={image}>
                      <CloseCircleFilled
                        className={styles.closeBtn}
                        onClick={onRemoveImage(index)}
                        key={image}
                      />
                      <img src={`http://localhost:3060/${image}`} alt={image} />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <div className={styles.postContents}>
            <h5>게시물 제목을 입력 해 주세요</h5>
            <div className={styles.contentsBox}>
              <div className={styles.textWrapper}>
                <input
                  type="text"
                  name="title"
                  ref={register({
                    required: true,
                    maxLength: 100,
                  })}
                />
              </div>
              {_.get("title.type", errors) === "required" && (
                <ErrorMessage>제목은 필수 입력 사항입니다</ErrorMessage>
              )}
              {_.get("title.type", errors) === "maxLength" && (
                <ErrorMessage>제목은 최대 100자까지 입니다</ErrorMessage>
              )}
            </div>
          </div>

          {/* 물품 관련 텍스트 에디터 */}
          <div className={styles.postContents}>
            <h5>물품에 대한 내용을 작성해주세요</h5>
            <div className={styles.inputWrapper}>
              <Editor setEditorState={setEditorState} />
            </div>
          </div>

          {/* 대여비 계산 방법 */}
          <div className={styles.postContents}>
            <h5>대여비의 계산 방법을 입력 해 주세요</h5>
            <div className={styles.contentsBox}>
              <div className={styles.inputWrapper}>
                <select
                  ref={register}
                  name="rentelFeeSelect"
                  className={cx("selectList", "rentalFeeSelect")}
                >
                  <option value="day">일(Days) 당</option>
                  <option value="month">달(Month) 당</option>
                  <option value="year">년(year) 당</option>
                </select>
                <input
                  type="text"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                  name="rentalFee"
                  className={styles.rentalFee}
                />
                <p>ETH</p>
              </div>

              {_.get("rentalFee.type", errors) === "required" && (
                <ErrorMessage>대여비는 필수 입력 사항입니다</ErrorMessage>
              )}

              {_.get("rentalFee.type", errors) === "pattern" && (
                <ErrorMessage>오직 숫자만 입력하셔야 합니다</ErrorMessage>
              )}
            </div>
          </div>

          {/* 보증금 책정 */}
          <div className={styles.postContents}>
            <h5>적절한 보증금을 책정 해 주세요</h5>
            <div className={styles.contentsBox}>
              <div className={styles.inputWrapper}>
                <input
                  type="text"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                  name="deposit"
                  className={styles.depositInput}
                />
                <p>ETH</p>
                <button className={styles.searchBtn}>
                  시세 알아보기&nbsp;
                  <RightOutlined />
                </button>
              </div>
              {_.get("deposit.type", errors) === "required" && (
                <ErrorMessage>보증금은 필수 입력 사항입니다</ErrorMessage>
              )}

              {_.get("deposit.type", errors) === "pattern" && (
                <ErrorMessage>오직 숫자만 입력하셔야 합니다</ErrorMessage>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

PostFormPhase2.propTypes = {
  register: PropTypes.func.isRequired,
  setEditorState: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default PostFormPhase2;
