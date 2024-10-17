import {createSlice} from '@reduxjs/toolkit'

const adminSlice = createSlice({
    name: "Admin",
    initialState: {
        jwt: ""
    },
    reducers: {
        addJwtToken: (state, action) =>{
            return{
                ...state,
                jwt: action.payload
            }
        }
    }
})

export const {addJwtToken} = adminSlice.actions
export default adminSlice.reducer