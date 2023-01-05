import { createWrapper } from "next-redux-wrapper";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";

import { store } from "./store";

// wrapper for Redux setup with NextJS
export const wrapper = createWrapper(() => store);

// state and dispatch types
export type Dispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// typed hooks for interacting with Redux store
export const useDispatch: () => Dispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
