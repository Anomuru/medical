import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";

import {overheadAction} from "entities/overheadEntities/model/slice/overheadSlice";

export const fetchOverheadSelectType = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('overheadSlice/getOverheadSelectType', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "overhead-types/", method: "GET", body: null, headers: headers()
        })


        if (!response) {
            throw new Error();
        }
        dispatch(overheadAction.onGetOverheadType(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});


export const fetchOverheadData = createAsyncThunk<
    void,
    {branchId: number , type: string},
    ThunkConfig<string>
>('overheadSlice/getOverheadSelectType', async ({branchId, type}, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: `overheads/?branch=${branchId}${type ? `&type=${type}` : ""}`, method: "GET", body: null, headers: headers()
        })

        if (!response) {
            throw new Error();
        }
        dispatch(overheadAction.onGetOverhead(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
