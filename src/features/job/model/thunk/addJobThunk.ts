import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {jobsListActions} from "entities/jobList";

interface addJobProps {
    data: FormData
}


export const addJobThunk = createAsyncThunk<
    void,
    addJobProps,
    ThunkConfig<string>
>('job/addJob', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "job_info/job_crud/create/", method: "POST", body: authData.data, headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(jobsListActions.addJob(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
