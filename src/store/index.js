import { createStore, combineReducers } from "redux";

import reducer from "./reducer.js";

let myStore = combineReducers({ reduxData:reducer });

const store = () =>
  createStore(myStore);

export default store;
