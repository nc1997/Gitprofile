import { axiosInstance } from '../config';

export const FETCH_REPOS = 'fetch_repos'
export const FETCH_USERS = 'fetch_users'
export const SORT_USERS = 'sort_users'


export const fetchRepos = (user) => {
  const request = axiosInstance.get(`users/${user}/repos`)
    .catch(err => { return err.message })
  return {
    type: FETCH_REPOS,
    payload: request
  }
}

export const sortUsers = (id) => {
  return {
    type: SORT_USERS,
    payload: id
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

