import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {IPacketsAnalysis} from "./paymentPacketsSchema";

export const fetchPacketsAnalysis = createAsyncThunk<
    IPacketsAnalysis,
    { userId: number | string },
    ThunkConfig<string>
>('paymentPacketsSlice/fetchPacketsAnalysis', async ({userId}, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `user/user_analysis_get/?user=${userId}&paid=false`,
            method: "GET",
            body: null,
            headers: headers()
        })
        if (!response) {
            throw new Error()
        }

        return response.info;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error')
    }
})