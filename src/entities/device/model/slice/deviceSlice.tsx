import {createSlice} from "@reduxjs/toolkit";
import {deviceThunk} from "../thunk/deviceThunk";
import {DeviceAddSchema} from "../types/deviceSchema";


const initialState: DeviceAddSchema = {
    loading: false,
    data: [],
    error: undefined
}

const deviceSlice = createSlice({
    name: 'deviceSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(deviceThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceThunk.fulfilled, (state,action) => {
                state.loading = false
                state.data = action.payload
                state.error = "error"
            })
            .addCase(deviceThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
})

export default deviceSlice.reducer