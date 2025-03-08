import {StateSchema} from "app/providers/storeProvider";

export const getFilterSelectResearch = (state: StateSchema) => state.groupFilterSlice?.filterSelectResearch
export const getFilterSelectWorkplace = (state: StateSchema) => state.groupFilterSlice?.filterSelectWorkplace
export const getFilterRadioItem = (state: StateSchema) => state.groupFilterSlice?.filterRadioItem