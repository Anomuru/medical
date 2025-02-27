export {userReducer, userActions} from './model/slice/userSlice';

export type {UserSchema} from "./model/types/userSchema"

export {
    getUserRole,
    getUserId,
    getUserName,
    getUserSurname,
    getUserBranch,
    getUserLoading,
    getUserError
} from "./model/selector/userSelector"


export {fetchRefresh} from "./model/thunk/userThunk"


