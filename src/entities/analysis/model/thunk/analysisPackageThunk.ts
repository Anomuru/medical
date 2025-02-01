import {AsyncThunk, createAsyncThunk} from "@reduxjs/toolkit";
import {API_URL, headers, useHttp} from "shared/api/base";
import {ThunkConfig} from "../../../../app/providers/storeProvider";

import {analysisPackageAction} from "../slice/analysisPackageSlice";

// export const fetchAnalysisPackageList = createAsyncThunk(
//     "analysisSlice/fetchAnalysisList",
//     () => {
//         const {request} = useHttp()
//         return request(
//             {
//                 url: "analysis/analysis_type/get/list/",
//                 method: "GET",
//                 body: undefined,
//                 headers: headers()
//             },
//         )
//     }
// )

export const fetchAnalysisPackageList = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('analysisPackageSlice/fetchAnalysisPackageList', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "/analysis/analysis_type/get/list/", method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(analysisPackageAction.onAnalysisPackage(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
