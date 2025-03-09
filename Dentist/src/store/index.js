import { configureStore } from "@reduxjs/toolkit";
import patientSlice from "./patientSlice";
const store = configureStore({
  reducer: {
    patient: patientSlice,
  },
});
export default store;
