import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../public/css/global.css";

import wrapper from "../store/configureStore";

const EveryShare = ({ Component }) => {
  return (
    <>
      <Head>
        <title>EveryShare</title>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Component />
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(EveryShare);
