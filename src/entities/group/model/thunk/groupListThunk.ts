import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {oftenUsedActions} from "entities/oftenUsed";
import {groupListActions} from "entities/group/model/slice/groupListSlice";

export const fetchGroupListData = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>('groupListSlice/fetchGroupListData', async (branchId, thunkApi) => {
    const {extra, dispatch, rejectWithValue} = thunkApi;
    try {
        const response = await extra.api({
            url: `analysis/laboratory/list/?branch=${branchId}`, method: "GET", body: null, headers: headers()
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