import produce from "immer";
import MYPAGE from "actions/mypageAction";

export const initState = {
  loadMyContentsLoading: false,
  loadMyContentsDone: false,
  loadMyContentsError: null,

  loadMyZzimListLoading: false,
  loadMyZzimListDone: false,
  loadMyZzimListError: null,

  loadMyOwnerItemLoading: false,
  loadMyOwnerItemDone: false,
  loadMyOwnerItemError: null,

  loadMyRentalItemLoading: false,
  loadMyRentalItemDone: false,
  loadMyRentalItemError: null,

  myContents: [],
  myZzimList: [],
  myOwnerList: [],
  myRentalList: [],
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

      case MYPAGE.LOAD_MY_ZZIM_LIST_REQUEST:
        draft.loadMyZzimListLoading = true;
        draft.loadMyZzimListDone = false;
        draft.loadMyZzimListError = null;
      case MYPAGE.LOAD_MY_ZZIM_LIST_SUCCESS:
        draft.loadMyZzimListLoading = false;
        draft.loadMyZzimListDone = true;
        draft.myZzimList = action.data;
        break;
      case MYPAGE.LOAD_MY_ZZIM_LIST_FAILURE:
        draft.loadMyZzimListLoading = false;
        draft.loadMyZzimListDone = false;
        draft.loadMyZzimListError = action.error;
        break;

      case MYPAGE.LOAD_MY_OWNER_ITEM_REQUEST:
        draft.loadMyOwnerItemLoading = true;
        draft.loadMyOwnerItemDone = false;
        draft.loadMyOwnerItemError = null;
      case MYPAGE.LOAD_MY_OWNER_ITEM_SUCCESS:
        draft.loadMyOwnerItemLoading = false;
        draft.loadMyOwnerItemDone = true;
        draft.myOwnerList = action.data;
        break;
      case MYPAGE.LOAD_MY_OWNER_ITEM_FAILURE:
        draft.loadMyOwnerItemLoading = false;
        draft.loadMyOwnerItemDone = false;
        draft.loadMyOwnerItemError = action.error;
        break;

      case MYPAGE.LOAD_MY_RENTAL_ITEM_REQUEST:
        draft.loadMyRentalItemLoading = true;
        draft.loadMyRentalItemDone = false;
        draft.loadMyRentalItemError = null;
      case MYPAGE.LOAD_MY_RENTAL_ITEM_SUCCESS:
        draft.loadMyRentalItemLoading = false;
        draft.loadMyRentalItemDone = true;
        draft.myRentalList = action.data;
        break;
      case MYPAGE.LOAD_MY_RENTAL_ITEM_FAILURE:
        draft.loadMyRentalItemLoading = false;
        draft.loadMyRentalItemDone = false;
        draft.loadMyRentalItemError = action.error;
        break;

      default:
        break;
    }
  });
};

export default reducer;
