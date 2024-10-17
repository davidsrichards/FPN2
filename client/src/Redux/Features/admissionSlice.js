import { createSlice } from "@reduxjs/toolkit";

const admissionSlice = createSlice({
  name: "admin",
  initialState: {
    showDialog: false,
    showside: true,
    programmeType: [],
    admissions: [],
    faculties: [],
    departments: [],

  },
  reducers: {
    controlDialogAction: (state, action) => {
      state.showDialog = action.payload;
    },
    controlSideAction: (state, action) => {
      state.showside = action.payload;
    },
    addProgrammeType: (state, action) =>{
      state.programmeType = action.payload
    },
    addAdmissions: (state, action) =>{
      state.admissions = action.payload
    },
    addFaculty: (state, action) =>{
      state.faculties = action.payload
    },
    addDepartment: (state, action) =>{
      state.departments = action.payload
    },
  },
});

export const { controlDialogAction, controlSideAction,  addProgrammeType, addAdmissions, addFaculty,  addDepartment, } =
  admissionSlice.actions;
export default admissionSlice.reducer;
