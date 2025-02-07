import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider";
import {headers} from "../../../../shared/api/base";
import {profileAnalysisActions} from "../slice/profileAnalysisSlice";

export const fetchProfileAnalysis = createAsyncThunk<
    void,
    string,
    ThunkConfig<string>
>('profileAnalysisSlice/fetchProfileAnalysis', async (id, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `user/user_analysis_get/?user=${id}`, method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(profileAnalysisActions.onGetProfileAnalysis(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
