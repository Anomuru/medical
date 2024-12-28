import {createSlice} from "@reduxjs/toolkit";
import {LoginSchema} from "../types/loginSchema";
import {loginThunk} from "pages/logInPage/model/thunk/loginThunk";

const initialState: LoginSchema = {
    username: "",
    password: "",
    isLoading: false
}

const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginThunk.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
