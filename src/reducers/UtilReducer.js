import { UPDATE_PAGE_COUNT, UPDATE_SORT_TYPE } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_SORT_TYPE:
      return { ...state, sortType: action.payload };

    case UPDATE_PAGE_COUNT:
      return { ...state, pageCount: action.payload };

    default:
      return state;
  }
}
