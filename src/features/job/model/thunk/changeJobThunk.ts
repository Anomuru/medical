import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {jobsListActions} from "entities/jobList";
import {alertAction} from "features/alert/model/slice/alertSlice";

interface changeJobThunkProps {
     data:  {
        name: string,
        has_client: boolean
    }
        id: number
}


export const changeJobThunk = createAsyncThunk<
    void,
    changeJobThunkProps,
    ThunkConfig<string>
>('job/changeJob', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `job_info/job_crud/update/${authData.id}`,
            method: "PUT",
            body: JSON.stringify(authData.data),
            headers: headers()
        })


        if (!response) {
            throw new Error();
        }



        dispatch(jobsListActions.changeJob(response));
        dispatch(alertAction.onAddAlertOptions({
            type: "success",
            status: true,
            msg: "Muvaffaqiyatli o'zgartirildi"
        }))
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
