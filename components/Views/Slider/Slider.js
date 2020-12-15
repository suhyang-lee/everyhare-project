import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./slider.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  .slick-dots {
    position: absolute;
    bottom: 1rem;

    li {
      width: 50px;
    height: 50px;
    overflow: hidden;
    border: 1px solid #c9c9c9;
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  
}
`;

const ProductSlider = ({ Images }) => {
  const settings = {
    customPaging: function (i) {
      return <img src={`http://localhost:3060/${Images[i].src}`} />;
    },
    dots: true,
    fade: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <Global />
      {Images.length !== 0 ? (
        <Slider {...settings}>
          {Images.map((image) => {
            return (
              <a key={image.id}>
                <div className={styles.slickImageWrapper}>
                  <img
                    src={`http://localhost:3060/${image.src}`}
                    alt="이미지리스트"
                  />
                </div>
              </a>
            );
          })}
        </Slider>
      ) : (
        <div className={styles.slickImageWrapper}>
          <img src="../images/no-images.png" />
        </div>
      )}
    </>
  );
};

ProductSlider.propTypes = {
  Images: PropTypes.arrayOf(PropTypes.object),
};

export default ProductSlider;
