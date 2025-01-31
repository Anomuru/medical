import {StateSchema} from "app/providers/storeProvider";

export const getAnalysisData = (state: StateSchema) =>
    state.analysisSlice?.data
export const getAnalysisLoading = (state: StateSchema) =>
    state.analysisSlice?.loading
export const getAnalysisError = (state: StateSchema) =>
    state.analysisSlice?.error
