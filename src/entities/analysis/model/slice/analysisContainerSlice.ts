import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisContainerSchema} from "../types/analysisContainerScheme";


const initialState : IAnalysisContainerSchema = {
    loading: false,
    data: [
        {
            id: 1,
            name: "test",
            size: "12",
            color: "#fff"
        }

    ],
    error: false
}

const analysisContainerSlice = createSlice({
    name: "analysisContainerSlice",
    initialState,
    reducers: {
        onAddAnalysis: (state, action) => {
            state.data = [...state.data, action.payload]

        },
        onEditAnalysis: (state, action) => {
            state.data =  state.data.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload.data
                }
                return item
            })
            console.log(action.payload)

        },
        onDeleteAnalysis: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload)

        },
    },
    extraReducers: builder => {}
})

export const {reducer: analysisContainerReducer} = analysisContainerSlice
export const {actions: analysisContainerActions} = analysisContainerSlice