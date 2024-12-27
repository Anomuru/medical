import {WorkTableSchema} from "entities/workTable";
// import {StaffSchema} from "entities/staff";
// import {OftenUsedSchemas} from "entities/oftenUsed";
import {userReducer, UserSchema} from "entities/user";
import {EnhancedStore, Reducer, ReducersMapObject} from "@reduxjs/toolkit";
import {OftenUsedSchemas} from "entities/oftenUsed";
import {StaffListSchema, StaffProfileSchema} from "entities/staff";
import {DeviceListSchema} from "../../../../entities/deviceList";
import {LoginSchema} from "pages/logInPage";


export interface StateSchema {

    user: UserSchema;
    oftenUsedSlice: OftenUsedSchemas;

    workTableSlice?: WorkTableSchema;
    staffSlice? : StaffListSchema;
    staffProfileSlice?: StaffProfileSchema;
    deviceListSlice?: DeviceListSchema;
    loginForm?: LoginSchema;







}

// export interface ReducerManager {
//     getReducerMap: () => ReducersMapObject<StateSchema>;
//     reduce: (
//         state: StateSchema,
//         action: AnyAction,
//     ) => CombinedState<StateSchema>;
//     add: (key: StateSchemaKey, reducer: Reducer) => void;
//     remove: (key: StateSchemaKey) => void;
//     // true - вмонтирован, false - демонтирован
//     getMountedReducers: () => MountedReducers;
// }


export type StateSchemaKey = keyof StateSchema;

type CustomCombinedState<T> = {
    [K in keyof T]: Exclude<T[K], undefined>;  // Remove `undefined` from each slice's type
};

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;  // Retrieves the map of reducers
    reduce: (state: StateSchema , action: any) => CustomCombinedState<StateSchema>;  // Reducer function
    add: (key: StateSchemaKey, reducer: Reducer) => void;  // Adds a reducer
    remove: (key: StateSchemaKey) => void;  // Removes a reducer
    getMountedReducers: () => MountedReducers;  // Gets the mounted reducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: any;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: any;
    state: StateSchema;
}
