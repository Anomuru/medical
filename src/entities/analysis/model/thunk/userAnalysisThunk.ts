import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider";
import {headers} from "../../../../shared/api/base";
import {userAnalysisActions} from "../slice/userAnalysisSlice";

export const fetchUserAnalys = createAsyncThunk<
    void,
    {userId: number | string},
    ThunkConfig<string>
>('userAnalysisSlice/fetchUserAnalys', async ({userId}, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `user/user_analysis_get/?user=${userId}`, method: "GET", body: null, headers: headers()
        })
        if (!response){
            throw new Error()
        }
        dispatch(userAnalysisActions.onGetAnalysis(response));
        return response.data;
    }catch (e) {
        console.log(e);
        return rejectWithValue('error')
    }
})