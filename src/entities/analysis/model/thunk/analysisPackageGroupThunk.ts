import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "../../../../app/providers/storeProvider";
import {headers} from "../../../../shared/api/base";
import {analysisGroupActions} from "../slice/analysisGroupSlice";


export const fetchAnalysisPackageList = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('analysisGroupSlice/fetchAnalysisPackageList', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "packet/get/list/", method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(analysisGroupActions.onAnalysisPackage(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
