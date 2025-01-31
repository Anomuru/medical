import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisSchema} from "../types/analysisSchema";

const initialState: IAnalysisSchema = {
    data: [
        {
            name: "Analiz nomi",
            code_name: 33,
            group: "Group Name",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        }, {
            name: "Analiz nomi",
            code_name: 33,
            group: "Group Name",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        }, {
            name: "Analiz nomi",
            code_name: 33,
            group: "Group Name",
            package: "КОАГУЛОЛОГИЯ",
            device: "Device nomi",
            container: "Container nomi"
        }
    ],
    loading: false,
    error: null
}

const analysisSlice = createSlice({
    name: "analysisSlice",
    initialState,
    reducers: {}
})

export const {reducer: analysisReducer} = analysisSlice
export const {actions: analysisActions} = analysisSlice
