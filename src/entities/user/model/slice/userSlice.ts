import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserSchema} from "entities/user/model/types/userSchema";
import {fetchRefresh} from "../thunk/userThunk";

const initialState: UserSchema = {
    id: null,
    name: null,
    surname: null,
    branch: null,
    isLoading: false
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

        setAuthData: (state,action: PayloadAction<UserSchema>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.branch = action.payload.branch

        }




    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRefresh.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRefresh.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(fetchRefresh.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
