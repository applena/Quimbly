import { createStore, combineReducers } from "redux";

import someReducer from "./reducer.js";

let reducers = combineReducers({
  someData: someReducer
});

const store = () =>
  createStore(reducers);

export default store;
