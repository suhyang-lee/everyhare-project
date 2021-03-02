import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import styles from "./postcard.module.scss";

const type = {
  owner: "LEND",
  borrower: "BORROW",
};

const PostCard = ({ post }) => {
  return (
    <Link href={`/view/${post.id}`}>
      <div className={styles.postCard}>
        <div className={styles.imageWrapper}>
          {post.Images && post.Images[0] ? (
            <img
              src={`http://localhost:3060/${post.Images[0].src}`}
              alt="썸네일 이미지"
            />
          ) : (
            <img src="../images/no-images.png" alt="썸네일 이미지" />
          )}
        </div>
        <div className={styles.cardInfo}>
          <p>
            <span>[{type[post.postType]}]</span> {post.title}
          </p>
          <p>대여비 및 보증금</p>
          <div className={styles.cardInfoPrice}>
            <p>
              {post.price} ETH / {post.deposit} ETH
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

PostCard.propTypes = {
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
};

export default PostCard;
