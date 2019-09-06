import { UPDATE_PAGE_COUNT, UPDATE_SORT_TYPE, FETCH_USERS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case UPDATE_SORT_TYPE:
      return { ...state, sortType: action.payload };

    case UPDATE_PAGE_COUNT:
      return { ...state, pageCount: action.payload };

    case FETCH_USERS:
      return { ...state, totalCount: action.payload.data.total_count };

    default:
      return state;
  }
}
