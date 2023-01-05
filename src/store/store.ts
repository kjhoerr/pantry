import { configureStore } from "@reduxjs/toolkit";

import itemsReducer from "./reducers/items";
import toastReducer from "./reducers/toast";

// creating store
export const store = configureStore({
  reducer: {
    items: itemsReducer,
    toast: toastReducer,
  },
});
