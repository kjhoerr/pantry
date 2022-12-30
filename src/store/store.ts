import { configureStore } from "@reduxjs/toolkit";
import { List } from "immutable";
import rootReducer from "./reducers";

// initial states here
const initalState = {
  items: List(),
};

// creating store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initalState,
});
