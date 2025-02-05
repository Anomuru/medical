import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserSchema} from "entities/user/model/types/userSchema";
import {fetchRefresh} from "../thunk/userThunk";

const initialState: UserSchema = {
    user_id: null,
    role: null,
    name: null,
    surname: null,
    branch: null,
    isLoading: false,
    error: undefined
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {

        setAuthData: (state, action: PayloadAction<UserSchema>) => {
            console.log(action.payload,"action.payload")
            state.user_id = action.payload.user_id
            state.name = action.payload.name
            state.surname = action.payload.surname
            state.branch = action.payload.branch
            state.role = action.payload.role
            state.error = undefined
        }


    },
    extraReducers: builder =>
        builder
            .addCase(fetchRefresh.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRefresh.fulfilled, (state) => {
                state.isLoading = false;
                state.error = undefined
            })
            .addCase(fetchRefresh.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

})

export const {actions: userActions} = userSlice;
export const {reducer: userReducer} = userSlice;
