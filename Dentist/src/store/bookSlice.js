import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openBookForm: false,
  bookFormAnimation: "animate__animated animate__zoomIn",
};

const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setOpenBookForm: (state, action) => {
      state.openBookForm = action.payload.openBookForm;
    },
    setBookFormAnimation: (state, action) => {
      state.bookFormAnimation = action.payload.bookFormAnimation;
    },
  },
});

export default bookSlice.reducer;
export const { setOpenBookForm, setBookFormAnimation } = bookSlice.actions;
