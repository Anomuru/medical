import {StateSchema} from "app/providers/storeProvider";

export const getUserLoading = (state: StateSchema) =>
    state?.user?.isLoading
export const getUserError = (state: StateSchema) =>
    state?.user?.error