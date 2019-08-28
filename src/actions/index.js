import { axiosInstance } from '../Utils/handlerequest';

export const FETCH_REPOS = 'fetch_repos'
export const FETCH_USERS = 'fetch_users'
export const UPDATE_SORT_TYPE = 'update_sort_type'


export const fetchRepos = async (user) => {
  const request = await axiosInstance.get(`users/${user}/repos`)
    .catch(err => { return err.message })
  return {
    type: FETCH_REPOS,
    payload: {
     data : request.data,
     name : user
  }
}
}

export const UpdateSortType=(sortType)=>{
  return {
    type : UPDATE_SORT_TYPE,
    payload : sortType
  }
}

export const fetchUsers = (login) => {
  const request = axiosInstance.get(`search/users?q=${login}`)
    .catch(err => { return err.message })
  return {
    type: FETCH_USERS,
    payload: request
  }
}

