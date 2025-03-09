import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientInfo: {},
  treatedPatientInfo: {},
};

const patientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    showPatientInfo: (state, action) => {
      state.patientInfo = action.payload.patientInfo;
    },
    treatingThePatient: (state, action) => {
      //   state.backdrop = action.payload.backdrop;
    },
  },
});

export default patientSlice.reducer;
export const { showPatientInfo } = patientSlice.actions;
