import {createSlice} from "@reduxjs/toolkit";
import {UserSchema} from "entities/user/model/types/userSchema";

const initialState: UserSchema = {
    user: {},
    userId: 1,
    loading: false,
    error: ""
}

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {






    }
})

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
