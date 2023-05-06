import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import healthReducer from "./reducers/health";
import itemsReducer from "./reducers/items";
import labelsReducer from "./reducers/labels";
import toastReducer from "./reducers/toast";

// creating store
export const store = configureStore({
  reducer: {
    health: healthReducer,
    items: itemsReducer,
    labels: labelsReducer,
    toast: toastReducer,
  },
});

// state and dispatch types
export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// typed hooks for interacting with Redux store
export const useDispatch: () => Dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
