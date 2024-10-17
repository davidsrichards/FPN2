import { createSlice } from "@reduxjs/toolkit";

const downloadslice = createSlice({
    name: "download",
    initialState: {
        admissionId: null,
        facultyId: null,
        departmentId: null,
        programmeId: null,
       download: false,

    },
    reducers: ({
        addAdmissionId: (state, action)=>{
            state.admissionId = action.payload
        },
        addFacultyId: (state, action)=>{
            state.facultyId = action.payload
        },
        addDepartmentId: (state, action)=>{
            state.departmentId = action.payload
        },
        addprogrammeId: (state, action)=>{
            state.programmeId = action.payload
        },
        handleDownload: (state, action) =>{
            state.download = action.payload
        }
    })
})


export const {addAdmissionId, addFacultyId,  addDepartmentId, addprogrammeId,  handleDownload} = downloadslice.actions;
export default downloadslice.reducer