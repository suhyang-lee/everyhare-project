import React, { useCallback, useState } from "react";
import styles from "./view.module.scss";
import PropTypes from "prop-types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import styled from "styled-components";

import CommentList from "./Comment/CommentList";
import CommentInput from "./Comment/CommentInput";
import ProductSlider from "./Slider/slider";

const AchorStyle = styled(AnchorLink)`
  color: #000;
  cursor: pointer;
`;

const View = ({ post, postId }) => {
  const { Images, Comments, User } = post;
  const [days, setDays] = useState(1);

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

  return (
    <div className={styles.contentsWrapper}>
      {/* 기본 제품 정보 */}
      <section className={styles.viewInfoWrapper}>
        <div className={styles.infoImagesWrapper}>
          <ProductSlider Images={Images} />
        </div>
        <div className={styles.infoWrapper}>
          <h4>{post.category}</h4>
          <h5>{post.title}</h5>
          <div className={styles.buyBtnWrapper}>
            <button>신청하기</button>
            <button>찜하기</button>
          </div>
          <div className={styles.writerInfo}>
            <div className={styles.profileImage}>
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80"
                alt="프로필이미지"
              />
            </div>
            <div className={styles.profileInfo}>
              <p>{User.nickname}</p>
              <button className={styles.chatBtn}>1대1 대화요청</button>
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
              예상 대여비<span>(일 {post.rentalFee} ETH 기준)</span>
            </p>
            <p>
              {parseFloat(days * post.rentalFee + post.deposit).toFixed(3)} ETH
            </p>
          </div>
        </div>
      </section>
      {/* 댓글 및 내용  */}
      <section className={styles.viewContents}>
        <ul className={styles.menu}>
          <li>내용보기</li>
          <li>
            <AchorStyle offset={() => 200} href="#comment">
              댓글보기 ({Comments.length})
            </AchorStyle>
          </li>
        </ul>
        <article className={styles.productContents}>{post.contents}</article>
        <article className={styles.productContents} id="comment">
          <ul>
            {Comments.map((comment) => {
              return <CommentList comment={comment} key={comment.id} />;
            })}
          </ul>
          <CommentInput postId={postId} />
        </article>
      </section>
    </div>
  );
};

View.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    category: PropTypes.string,
    title: PropTypes.string,
    contents: PropTypes.string,
    rentalFee: PropTypes.number,
    deposit: PropTypes.number,
    Images: PropTypes.arrayOf(PropTypes.object),
    Comments: PropTypes.arrayOf(PropTypes.object),
  }),
  postId: PropTypes.number.isRequired,
};

export default View;
