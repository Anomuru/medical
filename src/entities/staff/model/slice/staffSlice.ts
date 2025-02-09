import {createSlice} from "@reduxjs/toolkit";

import {StaffListSchema} from "../types/staffSchema";
import {fetchStaffListData} from "../thunk/staffThunk";

const initialState: StaffListSchema = {
    loading: false,
    data: undefined,
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
        username: "",
        role: ""
    },
    error: undefined
}

const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        deleteStaff: (state, action) => {
            state.data = {
                count: state.data?.count,
                next: state.data?.next,
                previous: state.data?.previous,
                results: state.data?.results?.filter(item => item.id !== action.payload)
            }
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
                state.data = action.payload
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
