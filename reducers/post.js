export const initState = {
  posts: [
    {
      id: 1,
      user: {
        id: 1,
        nickname: "동그리",
      },
      boardTitle: "ddd",
      writeCategory: "디지털/가전",
      boardContents: "제품 너무 좋습니다.",
      suggestPrice: 3000,
      startDate: "2020-01-01",
      endDate: "2020-01-05",
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {};
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [dummyPost, ...state.posts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
