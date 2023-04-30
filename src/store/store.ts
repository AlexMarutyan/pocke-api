import { configureStore } from "@reduxjs/toolkit";

import pokemonFiltersSlice from "./pokemonFiltersSlice";

export const store = configureStore({
  reducer: {
    filters: pokemonFiltersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
