import {createAsyncThunk} from "@reduxjs/toolkit";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {USER_LOCALSTORAGE_REFRESH_TOKEN, USER_LOCALSTORAGE_TOKEN} from "shared/const/localstorage";
import {userActions} from "entities/user/model/slice/userSlice";



interface RefreshProps {
    refresh: string | null;
}




export const fetchRefresh = createAsyncThunk<
    void,
    RefreshProps,
    ThunkConfig<string>
>('user/fetchRefresh', async (data, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "token/refresh/", method: "POST", body: JSON.stringify(data), headers: headers()
        })

        console.log(response, "response")
        if (!response) {
            throw new Error();
        }

        sessionStorage.setItem(
            USER_LOCALSTORAGE_TOKEN,
            response.access,
        );
        sessionStorage.setItem(
            USER_LOCALSTORAGE_REFRESH_TOKEN,
            response.refresh,
        );

        dispatch(userActions.setAuthData(response.user));

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
