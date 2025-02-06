import {createAsyncThunk} from "@reduxjs/toolkit";
import {header, headers, ParamUrl, useHttp} from "shared/api/base";
import {ThunkConfig} from "app/providers/storeProvider";
import {DoctorSchema} from "shared/types/oftenUsedTypes";

export const fetchJobsData = createAsyncThunk(
    "oftenUsedSlice/fetchJobsData",
    () => {
        const {request} = useHttp()
        return request({url: "job_info/job_get/job_list/", body: undefined, headers: header()})
    }
)

export const fetchLocationData = createAsyncThunk(
    "oftenUsedSlice/fetchLocationData",
    () => {
        const {request} = useHttp()
        return request({url: "branch_info/location/get/"})
    }
)

// export const fetchBranchData = createAsyncThunk(
//     "oftenUsedSlice/fetchBranchData",
//     () => {
//         const {request} = useHttp()
//         return request({url: "branch_info/branch_get/"})
//     }
// )

interface IBranchThunkProps {
    id: number
}

export const fetchBranchData = createAsyncThunk<
    void,
    IBranchThunkProps,
    ThunkConfig<string>
>('oftenUsedSlice/fetchBranchData', async (authData, thunkApi) => {
    const { extra,  rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `branch_info/branch_get/?${ParamUrl({location: authData.id})}`,
            method: "GET",
            body: null,
            headers: headers()
        })

        if (!response) {
            throw new Error();
        }
        return response.results;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});








interface getDoctorsThunkProps {
    job?: number
}


export const getDoctorsThunk = createAsyncThunk<
    DoctorSchema[],
    getDoctorsThunkProps,
    ThunkConfig<string>
>('oftenUsedSlice/getDoctorsThunk', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `job_info/job_get/doctor_list/?${ParamUrl({job: authData.job})}`, method: "GET", body: null, headers: headers()
        })

        if (!response) {
            throw new Error();
        }
        return response.results;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});



