import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "reducers/user";
import post from "reducers/post";
import search from "reducers/search";
import mypage from "reducers/mypage";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log("HYDRATE", action);
      return action.payload;
    default: {
      const combineReducer = combineReducers({
        user,
        post,
        search,
        mypage,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
