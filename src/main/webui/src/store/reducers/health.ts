import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SystemHealth } from "../../model";

type HealthState = SystemHealth;

const initialState: HealthState = { status: "STARTING", checks: [] };

const errorState: HealthState = { status: "DOWN", checks: [] };

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    healthUpdate: (_state, action: PayloadAction<HealthState | undefined>) =>
      action.payload ?? errorState,
  },
});

export const { healthUpdate } = healthSlice.actions;

export default healthSlice.reducer;
