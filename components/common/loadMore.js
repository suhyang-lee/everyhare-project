import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import styled from "styled-components";

const LoadWrapper = styled.div`
  text-align: center;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
`;

const LoadMore = ({ onLoadMore }) => {
  return (
    <LoadWrapper>
      <Button onClick={onLoadMore}>loading more</Button>
    </LoadWrapper>
  );
};

LoadMore.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default LoadMore;
