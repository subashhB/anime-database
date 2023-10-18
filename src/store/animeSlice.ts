import { createSlice } from "@reduxjs/toolkit";

interface AnimeState {
  isSearch: boolean;
}

const initialState: AnimeState = {
  isSearch: false,
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
  },
});

export const { setFalse, setTrue } = animeSlice.actions;

export default animeSlice.reducer;
