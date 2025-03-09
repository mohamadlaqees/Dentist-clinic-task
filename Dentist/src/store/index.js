import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./patientSlice";
import bookSlice from "./bookSlice";
const store = configureStore({
  reducer: {
    patient: patientSlice,
    book: bookSlice,
  },
});
export default store;
