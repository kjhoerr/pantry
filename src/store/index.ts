import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import itemsReducer from "./reducers/items";
import toastReducer from "./reducers/toast";

// creating store
const store = configureStore({
  reducer: {
    items: itemsReducer,
    toast: toastReducer,
  },
});

// wrapper for Redux setup with NextJS
export const wrapper = createWrapper(() => store);

// state and dispatch types
export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// typed hooks for interacting with Redux store
export const useDispatch: () => Dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
