import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userId: null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {}
})

export default userSlice.reducer

