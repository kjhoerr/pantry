import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SystemHealth } from "../../model";

type HealthState = SystemHealth;

const initialState: HealthState = { status: "UP", checks: [] };

const healthSlice = createSlice({
  name: "health",
  initialState,
  reducers: {
    healthUpdate: (
      _state,
      action: PayloadAction<HealthState>,
    ) => action.payload,
  },
});

export const { healthUpdate } = healthSlice.actions;

export default healthSlice.reducer;
