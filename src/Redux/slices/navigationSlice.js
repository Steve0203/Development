import { createSlice } from "@reduxjs/toolkit";
import { goTo, doSearch, resetFilter } from "../globalActions";
import { initStore } from "./azelis/azelisSlice";

import BoxResults from "../../component/boxresults/BoxResults";
import FilterBoxPage from "../../component/FilterBoxPage";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    previous: null,
    page: null,
    validPages: [],
    atResults: false,
    isSearching: false,
  },
  reducers: {
    showResults: (state, action) => {
      state.atResults = action.payload;
      if (action.payload === false) state.isSearching = false;
    },
    goBack: (state) => {
      if (!state.previous) return;
      state.page = state.previous;
      state.previous = null;

      state.atResults = false;
      state.isSearching = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(goTo, (state, action) => {
      if (!state.validPages.includes(action.payload)) return;

      state.atResults = false;
      state.isSearching = false;
      state.previous = state.page;
      state.page = action.payload;
    });
    builder.addCase(doSearch, (state) => {
      state.atResults = true;
      state.isSearching = true;
    });
    builder.addCase(resetFilter, (state) => {
      state.isSearching = false;
    });
    builder.addCase(initStore.fulfilled, (state, action) => {
      const pages = Object.values(action.payload.post_types);
      state.validPages = pages;
      state.page = pages[0];
    });
  },
});

export const { showResults, goBack } = navigationSlice.actions;

export default navigationSlice.reducer;

export const selectPage = (state) => state.navigation.page;
export const selectPreviousPage = (state) => state.navigation.previous;
export const selectAtResults = (state) => state.navigation.atResults;
export const selectIsSearching = (state) => state.navigation.isSearching;
export const selectDisplayComponent = (state) => {
  if (!state.navigation.page) return () => null;

  const currentCategory = state.navigation.page;
  const categoryData = state.azelis.categories[currentCategory];

  const { displayType } = categoryData;

  if (displayType === "oneStage" || state.navigation.atResults)
    return BoxResults;
  else return FilterBoxPage;
};
