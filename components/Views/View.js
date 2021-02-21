import React, { useCallback, useState } from "react";

import styles from "./view.module.scss";
import PropTypes from "prop-types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { HeartOutlined, HeartFilled, WechatOutlined } from "@ant-design/icons";

import CommentList from "./Comment/CommentList";
import CommentInput from "./Comment/CommentInput";
import ProductSlider from "./Slider/slider";
import { CATEOGRY } from "../../utils/variables";
import Apply from "./Apply/ApplyModal";
import POST from "../../actions/postAction";

const AchorStyle = styled(AnchorLink)`
  color: #000;
  cursor: pointer;
`;

const View = ({ post }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.user);
  const id = user?.id;
  const basketed = post.Basketer.find((v) => v.id === id);

  const handleMinus = useCallback(() => {
    if (days > 1) {
      setDays((prevDays) => prevDays - 1);
    }
  }, [days]);

  const handlePlus = useCallback(() => {
    if (days <= 365) {
      setDays((prevDays) => prevDays + 1);
    }
  }, [days]);

  const onZzimed = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }
    dispatch({
      type: POST.ZZIM_POST_REQUEST,
      data: { postId: post.id },
    });
  }, [id, post]);

  const onNotZzimed = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다.");
    }

    dispatch({
      type: POST.NOT_ZZIM_POST_REQUEST,
      data: { postId: post.id },
    });
  }, [id, post]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <div className={styles.contentsWrapper}>
      {/* 기본 제품 정보 */}
      <section className={styles.viewInfoWrapper}>
        <div className={styles.infoImagesWrapper}>
          {<ProductSlider Images={post.Images} />}
        </div>
        <div className={styles.infoWrapper}>
          <h4>{CATEOGRY[post.category]}</h4>
          <h5>{post.title}</h5>
          <div className={styles.buyBtnWrapper}>
            <button onClick={openModal}>신청하기</button>
            <button>
              찜하기{" "}
              {basketed ? (
                <HeartFilled style={{ color: "red" }} onClick={onNotZzimed} />
              ) : (
                <HeartOutlined onClick={onZzimed} />
              )}
            </button>
          </div>
          <div className={styles.writerInfo}>
            <div className={styles.profileImage}>
              <img
                src={post.User.profileUrl}
                alt={`${post.User.nickname}의 프로필`}
              />
            </div>
            <div className={styles.profileInfo}>
              <p>{post.User.nickname}</p>
              <button className={styles.chatBtn}> 1대1 대화요청</button>
            </div>
          </div>
          <div className={styles.priceWrapper}>
            <p>기간(일)</p>
            <button className={styles.dayBtn} onClick={handleMinus}>
              -
            </button>
            <p>{days}</p>
            <button className={styles.dayBtn} onClick={handlePlus}>
              +
            </button>
          </div>
          <div className={styles.priceWrapper}>
            <p>보증금</p>
            <p>{post.deposit} ETH</p>
          </div>
          <div className={styles.totalPriceWrapper}>
            <p>
              예상 대여비<span>(일 {post.price} ETH 기준)</span>
            </p>
            <p>{parseFloat(days * post.price + post.deposit).toFixed(3)} ETH</p>
          </div>
        </div>
      </section>
      {/* 댓글 및 내용  */}
      <section className={styles.viewContents}>
        <ul className={styles.menu}>
          <li>내용보기</li>
          <li>
            <AchorStyle offset={() => 200} href="#comment">
              댓글보기 ({post.Comments.length})
            </AchorStyle>
          </li>
        </ul>
        <article className={styles.productContents}>
          <div
            className={styles.contents}
            dangerouslySetInnerHTML={{ __html: post.contents }}
          ></div>
        </article>
        <article className={styles.productContents} id="comment">
          <ul>
            {post.Comments.map((comment) => {
              return <CommentList comment={comment} key={comment.id} />;
            })}
          </ul>
          {post && post.id ? <CommentInput postId={post.id} /> : <></>}
        </article>
      </section>
      <Apply
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        writer={post.User}
      />
    </div>
  );
};

View.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    postType: PropTypes.string,
    category: PropTypes.string,
    rentTerm: PropTypes.string,
    title: PropTypes.string,
    priceType: PropTypes.string,
    price: PropTypes.number,
    deposit: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    UserId: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default View;
