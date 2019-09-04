import { FETCH_REPOS, FETCH_USERS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USERS:
      return [...action.payload.data.items];

    case FETCH_REPOS:
      const users = state.map(user => {
        if (action.payload.name == user.login) {
          return { ...user, repos: action.payload.data };
        }
        return user;
      });
      return users;

    default:
      return state;
  }
}
