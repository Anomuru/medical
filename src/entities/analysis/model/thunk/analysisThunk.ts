import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "app/providers/storeProvider";
import {analysisActions} from "../slice/analysisSlice";

export const analysisThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('analysisSlice/analysisThunk', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "", method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(analysisActions.onGetAnalysis(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
