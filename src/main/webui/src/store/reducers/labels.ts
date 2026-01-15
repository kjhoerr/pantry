import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PantryItemLabel } from "../../model";

export type LabelState = Array<PantryItemLabel>;

const initialState: LabelState = [];

const labelsSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    setLabels: (_state, action: PayloadAction<Array<PantryItemLabel>>) =>
      action.payload,
    addLabel: (state, action: PayloadAction<PantryItemLabel>) => {
      state.push(action.payload);
    },
  },
});

export const { addLabel, setLabels } = labelsSlice.actions;

export default labelsSlice.reducer;
