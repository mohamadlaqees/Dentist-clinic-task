import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientInfo: {},
  patientAnimation: "animate__animated animate__zoomIn",
};

const patientSlice = createSlice({
  name: "patientSlice",
  initialState,
  reducers: {
    showPatientInfo: (state, action) => {
      state.patientInfo = action.payload.patientInfo;
    },
    setPatientAnimation: (state, action) => {
      state.patientAnimation = action.payload.patientAnimation;
    },
  },
});

export default patientSlice.reducer;
export const { showPatientInfo, setPatientAnimation } = patientSlice.actions;
