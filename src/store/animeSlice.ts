import { createSlice } from "@reduxjs/toolkit";

interface AnimeState {
  isSearch: boolean;
  search: string;
}

const initialState: AnimeState = {
  isSearch: false,
  search: "",
};
const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    setFalse: (state) => {
      state.isSearch = false;
    },
    setTrue: (state) => {
      state.isSearch = true;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { setFalse, setTrue, setSearch } = animeSlice.actions;

export default animeSlice.reducer;
