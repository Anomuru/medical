import { ReactNode} from "react";
import {Provider} from "react-redux";

// import {store} from "../../../store";
import {StateSchema} from "../config/stateSchema";
import {ReducersMapObject} from "@reduxjs/toolkit";
import {createReduxStore} from "../config/store";

// export const StoreProvider = ({children}: { children: JSX.Element }) => {
//     return (
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// }
//
//


interface StoreProviderProps {
    children?: ReactNode;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState, asyncReducers } = props;

    // const navigate = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
        // navigate,
    );



    return <Provider store={store}>{children}</Provider>;
};
