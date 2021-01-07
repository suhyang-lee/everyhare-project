import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from "./user";
import post from "./post";
import search from "./search";

/* combineReducers를 통해 reducer 함수 합치기
 * Hydrate(SSR)를 위해서 index를 추가한 것 임.
 */

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
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
