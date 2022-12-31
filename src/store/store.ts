import { configureStore } from "@reduxjs/toolkit";
import { List, OrderedMap } from "immutable";
import rootReducer from "./reducers";

// initial states here
const initalState = {
  items: List(),
  toast: OrderedMap(),
};

// creating store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initalState,
});
