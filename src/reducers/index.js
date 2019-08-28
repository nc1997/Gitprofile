import { combineReducers } from 'redux'
import UserReducer from './users'
import SortTypeReducer from './Utils'


const rootReducer = combineReducers({
  users: UserReducer,
  utilities: SortTypeReducer
})

export default rootReducer