import {createAsyncThunk} from "@reduxjs/toolkit";
import {headerImg, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "app/providers/storeProvider";

import {groupFilterActions} from "entities/group/model/slice/groupFilterSlice";

export const fetchFilterSelectResearch = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('groupFilterSlice/fetchFilterSelectResearch', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `device/get /list/`, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(groupFilterActions.getFilterSelectResearch(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
export const fetchFilterSelectWorkplace = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('groupFilterSlice/fetchFilterSelectResearch', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `device/get /list/`, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(groupFilterActions.getFilterSelectWorkplace(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
export const fetchFilterRadioItem = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('groupFilterSlice/fetchFilterSelectResearch', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `device/get /list/`, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(groupFilterActions.getFilterRadioItem(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});