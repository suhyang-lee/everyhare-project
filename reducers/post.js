import {
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  ZZIM_POST_REQUEST,
  ZZIM_POST_SUCCESS,
  ZZIM_POST_FAILURE,
  NOT_ZZIM_POST_REQUEST,
  NOT_ZZIM_POST_SUCCESS,
  NOT_ZZIM_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_IMAGE,
} from "../actions/postAction";

import produce from "immer";

export const initState = {
  posts: [],

  post: {
    User: [],
    Images: [],
    Comments: [],
    Basketer: [],
  },

  ImagePaths: [],
  Comments: [],

  hasMorePost: true,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,

  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,

  zzimPostLoading: false,
  zzimPostDone: false,
  zzimPostError: null,

  notZzimPostLoading: false,
  notZzimPostDone: false,
  notZzimPostError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

//Reducer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지켜야함)
const reducer = (state = initState, action) => {
  //Immer 사용
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.posts = draft.posts.concat(action.data);
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.posts.unshift(action.data);
        draft.ImagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        draft.ImagePaths = action.data.concat(draft.ImagePaths);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case REMOVE_IMAGE:
        draft.ImagePaths = draft.ImagePaths.filter(
          (image, index) => index !== action.data,
        );
        break;

      case ZZIM_POST_REQUEST:
        draft.zzimPostLoading = true;
        draft.zzimPostDone = false;
        draft.zzimPostError = null;
        break;
      case ZZIM_POST_SUCCESS:
        draft.post.Basketer.push({
          id: action.data.UserId,
        });
        draft.zzimPostLoading = false;
        draft.zzimPostDone = true;
        break;
      case ZZIM_POST_FAILURE:
        draft.zzimPostLoading = false;
        draft.zzimPostError = action.error;
        break;

      case NOT_ZZIM_POST_REQUEST:
        draft.notZzimPostLoading = true;
        draft.notZzimPostDone = false;
        draft.notZzimPostError = null;
        break;
      case NOT_ZZIM_POST_SUCCESS:
        draft.post.Basketer = draft.post.Basketer.filter(
          (v) => v.id !== action.data.UserId,
        );
        draft.notZzimPostLoading = false;
        draft.notZzimPostDone = true;
        break;
      case NOT_ZZIM_POST_FAILURE:
        draft.notZzimPostLoading = false;
        draft.notZzimPostError = action.error;
        break;

      case LOAD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.post = action.data;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addPostError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        draft.post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addPostError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
