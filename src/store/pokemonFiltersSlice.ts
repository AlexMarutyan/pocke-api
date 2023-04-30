import { createSlice } from "@reduxjs/toolkit";

export interface AppSliceType {
  count: number;
  search: string;
  types: string[];
  perPage: number;
}

const initialState: AppSliceType = {
  count: 0,
  types: [],
  search: "",
  perPage: 20,
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setType: (state, action) => {
      state.types = action.payload;
    },
    setPerPage: (state, action) => {
      state.perPage = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setSearch, setType, setCount, setPerPage } =
  filtersSlice.actions;

export default filtersSlice.reducer;
