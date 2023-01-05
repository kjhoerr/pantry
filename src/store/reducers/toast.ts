import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { v4 } from "uuid";

import { ToastMessage } from "../../model";

export type ToastState = Record<string, ToastMessage>;

const initialState: ToastState = {};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastMessage: (state, { payload: message }: PayloadAction<ToastMessage>) => {
      const key = message.key ?? v4();
      state[key] = {
        open: true,
        ...message,
        key,
      };
    },
    closeMessage: (state, { payload: key }: PayloadAction<string>) => {
      state[key].open = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});

export const { toastMessage, closeMessage } = toastSlice.actions;

export default toastSlice.reducer;
