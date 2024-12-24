import {createSlice} from "@reduxjs/toolkit";
import {StaffProfileSchema} from "../types/staffSchema";

const initialState: StaffProfileSchema = {
    id: NaN,
    details: undefined,
    error: undefined,
    loading: false
}

const staffProfileSlice = createSlice({
    name: "staffProfileSlice",
    initialState,
    reducers: {
        getStaffProfileId: (state, action) => {
            state.loading = true
            state.id = action.payload
        }
    }
})

export default staffProfileSlice.reducer
export const {
    getStaffProfileId
} = staffProfileSlice.actions

