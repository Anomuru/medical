export {oftenUsedReducer, oftenUsedActions} from "./model/slice/oftenUsedSlice";

export {
    type OftenUsedSchemas
} from "./model/types/oftenUsedSchemas";

export {
    fetchJobsData
} from "./model/thunk/oftenUsedThunk";

export {
    getJobsData,
    getLoading,
    getError
} from "./model/selector/oftenUsedSelector";
