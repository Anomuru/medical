import {createAsyncThunk} from "@reduxjs/toolkit";
import {userActions} from "entities/user";
import {ThunkConfig} from "app/providers/storeProvider";
import {headers} from "shared/api/base";
import {LoginSchema} from "pages/logInPage/model/types/loginSchema";
import {USER_LOCALSTORAGE_REFRESH_TOKEN, USER_LOCALSTORAGE_TOKEN} from "shared/const/localstorage";

interface LoginProps {
    username: string;
    password: string;
}


export const loginThunk = createAsyncThunk<
    LoginSchema,
    LoginProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api({
            url: "token/", method: "POST", body: JSON.stringify(authData), headers: headers()
        })


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

        dispatch(userActions.setAuthData(response));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
