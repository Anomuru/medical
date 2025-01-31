import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: null,
    loading: false,
    error: null
}

const paketsSlice = createSlice({
    name: "paketsSlice",
    initialState,
    reducers: {}
})

export const {reducer: paketsReducer} = paketsSlice
export const {actions: paketsActions} = paketsSlice