import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1607473582673-53b29fccc89d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80");
  background-size: cover;
  background-position: center;
`;

const Layout = ({ children }) => {
  return <Page>{children}</Page>;
};

//props 체크 - node는 react의 node.
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
