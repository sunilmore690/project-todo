import { combineReducers } from "redux";
import counterReducers from "./counter";
import userReducer from "./user";
import projectsReducers from "./projects";
const allReducers = combineReducers({
  // counter: counterReducers,
  user: userReducer,
  // movies: movieReducers
  projects: projectsReducers
});
export default allReducers;
