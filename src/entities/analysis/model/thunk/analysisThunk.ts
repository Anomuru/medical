import {createAsyncThunk} from "@reduxjs/toolkit";
import {headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "app/providers/storeProvider";
import {analysisActions} from "../slice/analysisSlice";
import {data} from "react-router";

export const analysisThunk = createAsyncThunk<
    void,
    number, // Thunk argument sifatida `page` qabul qilinadi
    ThunkConfig<string>
>('analysisSlice/analysisThunk', async (page, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `analysis/analysis/crud/create/?offset=${(page - 1) * 50}`,
            method: "GET",
            body: null,
            headers: headers()
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

// export const analysisThunk = createAsyncThunk<
//     void,
//     number
//     ThunkConfig<string>
// >('analysisSlice/analysisThunk', async (currentPage, thunkApi) => {
//
