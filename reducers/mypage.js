import {
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_MYPOSTS_REQUEST,
  LOAD_MYPOSTS_SUCCESS,
  LOAD_MYPOSTS_FAILURE,
  LOAD_MYCOMMENTS_REQUEST,
  LOAD_MYCOMMENTS_SUCCESS,
  LOAD_MYCOMMENTS_FAILURE,
} from "../actions/mypageAction";

import produce from "immer";

export const initState = {
  loadMyPostsLoading: false,
  loadMyPostsDone: false,
  loadMyPostsError: null,

  loadMyCommentsLoading: false,
  loadMyCommentsDone: false,
  loadMyCommentsError: null,

  myPosts: [],
  myPostsTotalCount: 0,
  myComments: [],
  myCommentsTotalCount: 0,
};

const reducer = (state = initState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoadding = true;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoadding = false;
        draft.changeNicknameDone = false;
        draft.changeNicknameError = action.error;
        break;

      case LOAD_MYPOSTS_REQUEST:
        draft.loadMyPostsLoadding = true;
        draft.loadMyPostsDone = false;
        draft.loadMyPostsError = null;
        break;
      case LOAD_MYPOSTS_SUCCESS:
        const { data, count } = action.data;
        draft.loadMyPostsLoadding = false;
        draft.loadMyPostsDone = true;
        draft.myPosts = data;
        draft.myPostsTotalCount = count;
        break;
      case LOAD_MYPOSTS_FAILURE:
        draft.loadMyPostsLoadding = false;
        draft.loadMyPostsDone = false;
        draft.loadMyPostsError = action.error;
        break;

      case LOAD_MYCOMMENTS_REQUEST:
        draft.loadMyCommentsLoadding = true;
        draft.loadMyCommentsDone = false;
        draft.loadMyCommentsError = null;
        break;
      case LOAD_MYCOMMENTS_SUCCESS:
        draft.loadMyCommentsLoadding = false;
        draft.loadMyCommentsDone = true;
        draft.myComments = draft.myComments.concat(action.data);
        break;
      case LOAD_MYCOMMENTS_FAILURE:
        draft.loadMyCommentsLoadding = false;
        draft.loadMyCommentsDone = false;
        draft.loadMyCommentsError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
