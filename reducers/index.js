const initState = {
  name: "zozo",
  age: 27,
  password: "babo",
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
