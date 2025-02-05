import {StateSchema} from "app/providers/storeProvider";

export const getJobList = (state: StateSchema) =>
    state?.jobList?.jobs


