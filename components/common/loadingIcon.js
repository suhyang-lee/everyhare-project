import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Loader = styled.div`
  border: 8px solid #f3f3f3;
  border-top: 8px solid #ffc800;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingIcon = () => {
  return (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default LoadingIcon;
