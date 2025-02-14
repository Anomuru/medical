import {StateSchema} from "../../../../app/providers/storeProvider";

export const getProfileAnalysis = (state: StateSchema) => state.profileAnalysisSlice?.info
export const getProfilePaymentsData = (state: StateSchema) => state.profileAnalysisSlice?.paymentsData