import { UPDATE_SORT_TYPE } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_SORT_TYPE:
      return { ...state, sortType: action.payload }
    default:
      return state
  }
}