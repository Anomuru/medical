import {createSlice} from "@reduxjs/toolkit";
import {IAnalysisContainerSchema} from "../types/analysisContainerScheme";
import {analysisContainerThunk} from "entities/analysis/model/thunk/analysisContainerThunk";


const initialState : IAnalysisContainerSchema = {
    loading: false,
    data: [],
}

const analysisContainerSlice = createSlice({
    name: "analysisContainerSlice",
    initialState,
    reducers: {

        onAddAnalysis: (state, action) => {
            state.data = [...state.data, action.payload]
        },
        onGetContainer: (state, action) => {
            state.data = action.payload.results
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
    extraReducers: (builder) => {
        builder
            .addCase(analysisContainerThunk.pending, (state) => {
                state.error = "";
                state.loading = true;
            })
            .addCase(analysisContainerThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(analysisContainerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const {reducer: analysisContainerReducer} = analysisContainerSlice
export const {actions: analysisContainerActions} = analysisContainerSlice