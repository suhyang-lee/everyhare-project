import POST from "../actions/postAction";

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
  type: POST.ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: POST.ADD_COMMENT_REQUEST,
  data,
});

//Reducer : 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지켜야함)
const reducer = (state = initState, action) => {
  //Immer 사용
  return produce(state, (draft) => {
    switch (action.type) {
      case POST.LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;
      case POST.LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.posts = draft.posts.concat(action.data);
        draft.hasMorePost = action.data.length === 10;
        break;
      case POST.LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;

      case POST.ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case POST.ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.posts.unshift(action.data);
        draft.ImagePaths = [];
        break;
      case POST.ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;

      case POST.UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;
      case POST.UPLOAD_IMAGES_SUCCESS:
        draft.ImagePaths = action.data.concat(draft.ImagePaths);
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        break;
      case POST.UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;

      case POST.REMOVE_IMAGE:
        draft.ImagePaths = draft.ImagePaths.filter(
          (image, index) => index !== action.data,
        );
        break;

      case POST.ZZIM_POST_REQUEST:
        draft.zzimPostLoading = true;
        draft.zzimPostDone = false;
        draft.zzimPostError = null;
        break;
      case POST.ZZIM_POST_SUCCESS:
        draft.post.Basketer.push({
          id: action.data.UserId,
        });
        draft.zzimPostLoading = false;
        draft.zzimPostDone = true;
        break;
      case POST.ZZIM_POST_FAILURE:
        draft.zzimPostLoading = false;
        draft.zzimPostError = action.error;
        break;

      case POST.NOT_ZZIM_POST_REQUEST:
        draft.notZzimPostLoading = true;
        draft.notZzimPostDone = false;
        draft.notZzimPostError = null;
        break;
      case POST.NOT_ZZIM_POST_SUCCESS:
        draft.post.Basketer = draft.post.Basketer.filter(
          (v) => v.id !== action.data.UserId,
        );
        draft.notZzimPostLoading = false;
        draft.notZzimPostDone = true;
        break;
      case POST.NOT_ZZIM_POST_FAILURE:
        draft.notZzimPostLoading = false;
        draft.notZzimPostError = action.error;
        break;

      case POST.LOAD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case POST.LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.post = action.data;
        break;
      case POST.LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;

      case POST.ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addPostError = null;
        break;
      case POST.ADD_COMMENT_SUCCESS:
        draft.post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case POST.ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addPostError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
