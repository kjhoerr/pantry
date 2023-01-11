import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";

import { ToastMessage } from "../../model";

export type ToastState = Record<string, ToastMessage>;

const initialState: ToastState = {};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    toastMessage: (
      state,
      { payload: message }: PayloadAction<ToastMessage>,
    ) => {
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
});

export const { toastMessage, closeMessage } = toastSlice.actions;

export default toastSlice.reducer;
