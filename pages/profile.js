import React from "react";

import { END } from "redux-saga";
import axios from "axios";
import wrapper from "../store/configureStore";
import { LOAD_USER_INFO_REQUEST } from "../actions/userAction";

const Profile = () => {
  return <div>프로필</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    context.store.dispatch({
      type: LOAD_USER_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  },
);

export default Profile;
