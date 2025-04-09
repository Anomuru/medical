import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {oftenUsedActions} from "entities/oftenUsed";
import {groupListActions} from "entities/group/model/slice/groupListSlice";

export const fetchGroupListData = createAsyncThunk<
    void,
    { branchId: number, type?: number | string},
    ThunkConfig<string>
>('groupListSlice/fetchGroupListData', async ({branchId, type}, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `analysis/laboratory/list/?branch=${branchId}${type ? `&status=${type}` : ""}`,
            method: "GET",
            body: null,
            headers: headers()
        })


        if (!response) {
            throw new Error();
        }


        dispatch(groupListActions.getGroupList(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});