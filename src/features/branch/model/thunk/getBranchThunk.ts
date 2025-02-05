import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {branchAction} from "../slice/getBranchSlice";

export const getBranchThunk = createAsyncThunk<
    void,
    number | void,
    ThunkConfig<string>
    >('getBranchSlice/getBrnachThunk', async (page, thunkApi) => {
        const {extra, dispatch, rejectWithValue} = thunkApi;
        try {
            const response = await extra.api({
                url: `branch_info/branch_get/`,
                method: "GET",
                body: null,
                headers: headers()
            })
            if (!response) {
                throw new Error()
            }

            dispatch(branchAction.onGetBranch(response));
            return response.data
        }catch (e) {
            console.log(e);
            return rejectWithValue('error')
        }
})