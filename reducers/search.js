import SEARCH from "../actions/searchAction";

import produce from "immer";

export const initState = {
  searchs: [],

  hasMoreSearch: true,
  loadSearchLoading: false,
  loadSearchDone: false,
  loadSearchError: null,
};

const reducer = (state = initState, action) => {
  //Immer 사용
  return produce(state, (draft) => {
    switch (action.type) {
      case SEARCH.LOAD_SEARCH_REQUEST:
        draft.loadSearchLoading = true;
        draft.loadSearchDone = false;
        draft.loadSearchError = null;
        break;
      case SEARCH.LOAD_SEARCH_SUCCESS:
        draft.loadSearchLoading = false;
        draft.loadSearchDone = true;
        draft.searchs = draft.searchs.concat(action.data);
        draft.hasMoreSearch = action.data.length === 10;
        break;
      case SEARCH.LOAD_SEARCH_FAILURE:
        draft.loadSearchLoading = false;
        draft.loadSearchError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
