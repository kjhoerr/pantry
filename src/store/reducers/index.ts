import { combineReducers } from "redux";
import itemsReducer from "./items";
import toastReducer from "./toast";

export default combineReducers({
  items: itemsReducer,
  toast: toastReducer,
});
