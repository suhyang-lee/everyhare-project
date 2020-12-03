import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import "../public/css/global.css";
import withReduxSaga from "next-redux-saga";

import wrapper from "../store/configureStore";

const EveryShare = ({ Component }) => {
  return (
    <>
      <Head profile="http://www.w3.org/2005/10/profile">
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>EveryShare</title>
      </Head>
      <Component />
    </>
  );
};

EveryShare.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(EveryShare));
