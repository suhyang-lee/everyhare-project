import MYPAGE from "../actions/mypageAction";

import produce from "immer";

export const initState = {
  loadMyContentsLoading: false,
  loadMyContentsDone: false,
  loadMyContentsError: null,

  myContents: [],
  myContentsTotalCount: 0,
};

const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MYPAGE.LOAD_MYCONTENTS_REQUEST:
        draft.loadMyContentsLoading = true;
        draft.loadMyContentsDone = false;
        draft.loadMyContentsError = null;
        break;
      case MYPAGE.LOAD_MYCONTENTS_SUCCESS:
        draft.loadMyContentsLoading = false;
        draft.loadMyContentsDone = true;
        draft.myContents = action.data.data;
        draft.myContentsTotalCount = action.data.count;
        break;
      case MYPAGE.LOAD_MYCONTENTS_FAILURE:
        draft.loadMyContentsLoading = false;
        draft.loadMyContentsDone = false;
        draft.loadMyContentsError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
