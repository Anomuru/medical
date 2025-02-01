import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisSchema} from "../types/analysisSchema";

const initialState: IAnalysisSchema = {
    data: [
        {
            name: "Analiz nomi",
            code_name: 34,
            group: "Group tr",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        },
        {
            name: "Analiz nomi",
            code_name: 35,
            group: "Group gh",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        },
        {
            name: "Analiz nomi",
            code_name: 36,
            group: "Group asd",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        }
    ],
    loading: false,
    error: undefined
}

const analysisSlice = createSlice({
    name: "analysisSlice",
    initialState,
    reducers: {
        onGetAnalysis: (state, action) => {
            state.data = action.payload
        },

        createAnalysis: (state, action) => {
            state.data = [action.payload, ...state?.data]
        }
    }
})

export const {reducer: analysisReducer} = analysisSlice
export const {actions: analysisActions} = analysisSlice
