import {createAsyncThunk} from "@reduxjs/toolkit";
import {header, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../../app/providers/storeProvider";

import {oftenUsedActions} from "../slice/oftenUsedSlice";

export const fetchJobsData = createAsyncThunk(
    "oftenUsedSlice/fetchJobsData",
    () => {
        const {request} = useHttp()
        return request({url: "job_info/job_get/job_list/", body: undefined, headers: header()})
    }
)



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


        dispatch(oftenUsedActions.onGetDeviceList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
