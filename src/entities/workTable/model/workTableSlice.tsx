import {createSlice} from "@reduxjs/toolkit";
import {WorkTableSchema} from "./config/workTableSchema";

const initialState: WorkTableSchema = {
    data: [],
    loading: false,
    error: null
}

const workTableSlice = createSlice({
    name: "workTableSlice",
    initialState,
    reducers: {}
})

export const { actions: workTableActions } = workTableSlice;
export const { reducer: workTableReducer } = workTableSlice;
