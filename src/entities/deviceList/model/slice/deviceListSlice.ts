import {createSlice} from "@reduxjs/toolkit";
import {DeviceListSchema} from "../types/deviceListSchema";
import {deviceListThunk} from "../thunk/deviceListThunk";


const initialState: DeviceListSchema = {
    loading: false,
    data: [],
    error: undefined
}

const deviceListSlice = createSlice({
    name: "deviceListSlice",
    initialState,
    reducers: {
        addDevice: (state, action) => {
            state.data = state.data && [action.payload, ...state.data]
        }
    },
    extraReducers: builder => {
        builder
            .addCase(deviceListThunk.pending, (state) => {
                state.loading = true
                state.error = undefined
            })
            .addCase(deviceListThunk.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
                state.error = "error"
            })
            .addCase(deviceListThunk.rejected, (state) => {
                state.loading = false
                state.error = "error"
            })
    }
})

export default deviceListSlice.reducer