import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers} from "shared/api/base";
import {ThunkConfig} from "app/providers/storeProvider";
import {Staff} from "../types/staffSchema";
import {staffProfileActions, staffProfileReducer} from "../slice/staffProfileSlice";

interface IChangeStaff {
    username: string,
    name: string,
    surname: string,
    email: string,
    phone_number: string,
}

export const fetchStaffProfileData = createAsyncThunk<
    Staff,
    string,
    ThunkConfig<string>
>('staffProfileSlice/fetchStaffProfileData', async (authData, thunkApi) => {
    const { extra, dispatch , rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `user/staff/crud/get_detail/${authData}`,
            method: "GET",
            body: null,
            headers: headers()
        })

        if (!response) {
            throw new Error();
        }
        dispatch(staffProfileActions.onEditProfile(response))
        return response.results;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
})

export const changeStaffDetails = createAsyncThunk<
    Staff,
    {staffId: string, data:IChangeStaff},
    ThunkConfig<string>
>('staffProfileSlice/changeStaffDetails', async (authData, thunkApi) => {
    const { extra,  dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `user/staff/crud/update_password/${authData.staffId}`,
            method: "PATCH",
            body: JSON.stringify(authData.data),
            headers: headers()
        })

        if (!response) {
            throw new Error();
        }
        dispatch(staffProfileActions.onEditProfile(response))
        return response.results;
    } catch (e) {
        console.log(e);

        return rejectWithValue('error');
    }
})
