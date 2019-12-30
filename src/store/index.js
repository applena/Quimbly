import { createStore, combineReducers } from "redux";

import reducer from "./reducer.js";

let myStore = combineReducers({ calendars: reducer });

const store = () =>
  createStore(myStore);

export default store;
