
import { FETCH_USERS, SORT_USERS } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload.data

    case SORT_USERS:
        let items =[]
          if (action.payload === 'name_dsc') {
              items = state.items.sort((a, b) => a.login !== b.login ? a.login > b.login ? -1 : 1 : 0);
            } else if (action.payload === 'score_dsc') {
              items =  state.items.sort((a, b) => a.score !== b.score ? a.score > b.score ? -1 : 1 : 0);
            } else if (action.payload === 'score_asc') {
              items =  state.items.sort((a, b) => a.score !== b.score ? a.score < b.score ? -1 : 1 : 0);
            } else if (action.payload === 'name_asc') {
              items =  state.items.sort((a, b) => a.login !== b.login ? a.login < b.login ? -1 : 1 : 0);
            }
          return { ...state, items }
        
    default:
      return state
  }
}
