import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {analysisContainerActions} from "../../model/slice/analysisContainerSlice";

export const analysisContainerThunk = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('analysisContainerSlice/analysisContainerThunk', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "", method: "GET", body: null, headers: headers()
        })
        if (!response) {
            throw new Error();
        }
        dispatch(analysisContainerActions.onGetContainer(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
