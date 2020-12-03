import shortid from "shortid";
import faker from "faker";

import {
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  READ_POST_REQUEST,
  READ_POST_SUCCESS,
  READ_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
} from "../actions/postAction";

import produce from "immer";

export const initState = {
  posts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "동그리",
      },
      postType: "owner",
      Images: [
        {
          id: shortid.generate(),
          src:
            "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: shortid.generate(),
          src:
            "https://images.unsplash.com/photo-1534131707746-25d604851a1f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: shortid.generate(),
          src:
            "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: shortid.generate(),
          src:
            "https://images.unsplash.com/photo-1602524208604-cf16e56f05db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          id: shortid.generate(),
          src:
            "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "nero",
          },
          contents: "혹시 불발되면 연락주세요",
          date: "2020-01-01",
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: "donggle",
          },
          contents: "제가 살게욥",
          date: "2020-01-02",
        },
      ],
      category: "디지털/가전",
      title: "캐논 700D 대여 해 드립니다",
      contents: "제품 너무 좋습니다.",
      rentalFee: 0.6,
      deposit: 3,
    },
  ],
  Images: [
    {
      id: shortid.generate(),
      src:
        "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: shortid.generate(),
      src:
        "https://images.unsplash.com/photo-1534131707746-25d604851a1f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: shortid.generate(),
      src:
        "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: shortid.generate(),
      src:
        "https://images.unsplash.com/photo-1602524208604-cf16e56f05db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
    {
      id: shortid.generate(),
      src:
        "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
  ],
  Comments: [
    {
      id: shortid.generate(),
      User: {
        nickname: "nero",
      },
      contents: "혹시 불발되면 연락주세요",
      date: "2020-01-01",
    },
    {
      id: shortid.generate(),
      User: {
        nickname: "donggle",
      },
      contents: "제가 살게욥",
      date: "2020-01-02",
    },
  ],

  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,

  addPostLoading: false,
  addPostDone: false,
  addPostError: null,

  readPostLoading: false,
  readPostDone: false,
  readPostError: null,

  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      postType: "owner",
      Images: [
        {
          id: shortid.generate(),
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: faker.name.findName(),
          },
          contents: faker.lorem.paragraph(),
          date: "2020-01-01",
        },
      ],
      category: "디지털/가전",
      title: faker.lorem.sentences(),
      contents: faker.lorem.sentence(),
      rentalFee: faker.commerce.price(),
      deposit: faker.commerce.price(),
    }));

const dummyPost = (data) => ({
  id: shortid.generate(),
  User: {
    id: 1,
    nickname: "동그리",
  },
  category: data.category,
  postType: data.postType,
  title: data.title,
  contents: data.contents,
  rentalFee: data.retalFee,
  deposit: data.deposit,
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  User: {
    id: 3,
    nickname: "초코하임",
  },
  contents: data.comment,
  date: "2020-01-01",
});

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const readPost = (data) => ({
  type: READ_POST_REQUEST,
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
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.posts = draft.posts.concat(action.data);
        draft.hasMorePost = draft.posts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.posts = [dummyPost(action.data), ...state.posts];
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case READ_POST_REQUEST:
        draft.readPostLoading = true;
        draft.readPostDone = false;
        draft.readPostError = null;
        break;
      case READ_POST_SUCCESS:
        draft.readPostLoading = false;
        draft.readPostDone = true;
        draft.posts.find((v) => v.id === action.data.postId);
        break;
      case READ_POST_FAILURE:
        draft.readPostLoading = false;
        draft.readPostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addPostError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        const post = draft.posts.find(
          (v) => v.id === parseInt(action.data.postId),
        );

        post.Comments.shift(dummyComment(action.data));
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
