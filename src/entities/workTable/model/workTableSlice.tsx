import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: [],
    loading: false,
    error: null
}

const workTableSlice = createSlice({
    name: "workTableSlice",
    initialState,
    reducers: {}
})

export default workTableSlice.reducer

