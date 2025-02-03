import {createAsyncThunk} from "@reduxjs/toolkit";
import {headerImg, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../../app/providers/storeProvider";

import {oftenUsedDeviceAction} from "../slice/oftenUsedDeviceSlice";


export const oftenUsedDeviceListThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('deviceListSlice/oftenUsedDeviceListThunk', async (authData, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `device/get/list/`, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(oftenUsedDeviceAction.onGetDeviceList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});




