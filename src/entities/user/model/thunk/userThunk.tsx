import {createAsyncThunk} from "@reduxjs/toolkit";

interface LoginProps {
    email: string;
    password: string;
}

// export const login = createAsyncThunk<
//     User,
//     LoginProps,
//     ThunkConfig<string>
// >('login/loginByUsername', async (authData, thunkApi) => {
//     const { extra, dispatch, rejectWithValue } = thunkApi;
//
//     try {
//         const response = await extra.api.post<User>('/login', authData);
//
//         if (!response.data) {
//             throw new Error();
//         }
//
//         localStorage.setItem(
//             USER_LOCALSTORAGE_KEY,
//             JSON.stringify(response.data),
//         );
//         dispatch(userActions.setAuthData(response.data));
//         return response.data;
//     } catch (e) {
//         console.log(e);
//         return rejectWithValue('error');
//     }
// });
