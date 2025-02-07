import {StateSchema} from "app/providers/storeProvider";

export const getUserRole = (state: StateSchema) =>
    state.user.role
export const getUserId = (state: StateSchema) =>
    state.user.user_id
export const getUserName = (state: StateSchema) =>
    state.user.name
export const getUserSurname = (state: StateSchema) =>
    state.user.surname
export const getUserBranch = (state: StateSchema) =>
    state.user.branch
export const getUserLoading = (state: StateSchema) =>
    state.user.isLoading
export const getUserError = (state: StateSchema) =>
    state.user.error