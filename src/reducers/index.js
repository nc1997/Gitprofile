import { combineReducers } from 'redux'
import FetchRepos from './repos'
import FetchUser from './users'


const rootReducer = combineReducers({
  repos: FetchRepos,
  users: FetchUser
})

export default rootReducer