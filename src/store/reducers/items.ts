import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { PantryItem } from "../../model";

export type ItemState = Array<PantryItem>;

const initialState: ItemState = [];

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (_state, action: PayloadAction<Array<PantryItem>>) => action.payload,
    addItem: (state, action: PayloadAction<PantryItem>) => {
      state.push(action.payload);
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

export const { addItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
