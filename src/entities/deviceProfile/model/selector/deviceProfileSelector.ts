import {StateSchema} from "app/providers/storeProvider";

export const getProfile = (state: StateSchema) =>
    state.deviceProfileSlice.data

export const getProfileUsers = (state: StateSchema) =>
    state.deviceProfileSlice.users

export const getUserAnalis = (state: StateSchema) =>
    state.deviceProfileSlice.analis