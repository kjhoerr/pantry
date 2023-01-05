import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import itemsReducer from "./reducers/items";
import toastReducer from "./reducers/toast";

// creating store
export const store = configureStore({
  reducer: combineReducers({
    items: itemsReducer,
    toast: toastReducer,
  }),
});
