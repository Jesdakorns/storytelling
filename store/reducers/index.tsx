import { combineReducers } from "redux";
// COMBINED REDUCERS
import productsReducer from "./productsReducer";


export const reducers = combineReducers({
  data: productsReducer,
});