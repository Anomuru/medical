import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {jobsListActions} from "entities/jobList";



interface deleteJobThunkProps {
    reason: string,
    id: number,
}


export const deleteJobThunk = createAsyncThunk<
    void,
    deleteJobThunkProps,
    ThunkConfig<string>
>('job/deleteJob', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {


        const response = await extra.api({
            url: `job_info/job_crud/delete/${authData.id}`, method: "DELETE", body: JSON.stringify({reason: authData.reason}), headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(jobsListActions.deleteJob(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
