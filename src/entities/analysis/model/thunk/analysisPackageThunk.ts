import {AsyncThunk, createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../../app/providers/storeProvider";

import {analysisPackageAction} from "../slice/analysisPackageSlice";



interface IAnalysisPackageThunkProps {
    branch: number
}

export const fetchAnalysisPackageList = createAsyncThunk<
    void,
    IAnalysisPackageThunkProps,
    ThunkConfig<string>
>('analysisPackageSlice/fetchAnalysisPackageList', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `packet/get/list/?branch=${authData?.branch}`, method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(analysisPackageAction.onAnalysisPackage(response));
        return response.data;
    } catch (e) {

        return rejectWithValue('error');
    }
});
