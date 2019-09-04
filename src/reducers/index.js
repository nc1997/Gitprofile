import { combineReducers } from "redux";
import UserReducer from "./UserReducer";
import SortTypeReducer from "./UtilReducer";

const rootReducer = combineReducers({
  users: UserReducer,
  utilities: SortTypeReducer
});

export default rootReducer;
