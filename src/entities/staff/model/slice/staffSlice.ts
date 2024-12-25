import {createSlice} from "@reduxjs/toolkit";

import {StaffListSchema} from "../types/staffSchema";
import {fetchStaffListData} from "../thunk/staffThunk";

const initialState: StaffListSchema = {
    loading: false,
    data: [],
    detail: {
        id: NaN,
        name: "",
        surname: "",
        image: "",
        job: "",
        age: NaN,
        phone_number: "",
        sex: "",
        birth_date: "",
        address: "",
        branch: NaN,
        email: "",
        passport_number: "",
        passport_series: "",
        password: "",
        username: ""
    },
    error: undefined
}

const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        addStaff: (state, action) => {
            state.data = state.data && [action.payload, ...state.data]
        }
    },
    extraReducers: builder =>
        builder
            .addCase(fetchStaffListData.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(fetchStaffListData.fulfilled, (state, action) => {
                console.log(action.payload)
                state.data = action.payload?.results
                state.loading = false
                state.error = undefined
            })
            .addCase(fetchStaffListData.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export const {reducer: staffReducer} = staffSlice
export const {actions: staffActions} = staffSlice
