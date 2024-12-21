import {WorkTableSchema} from "entities/workTable";

export interface StateSchema {
    workTableSlice: WorkTableSchema
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

