import {OverheadFeature} from "features/overheadFeature";
import {OverheadHeader, overheadReducer} from "entities/overheadEntities";
import {Navigate, Outlet, Route, Routes} from "react-router";

import cls from "./overheadPage.module.sass"
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {overheadSlice} from "entities/overheadEntities/model/slice/overheadSlice";



const routes = [
    {
        name: "Qo’shimcha xarajatlar",
        path: "overhead",

    },{
        name: "ove23rhead",
        path: "over23head",

    },
]
const reducers: ReducersList = {
    overheadSlice: overheadReducer
}
export const OverheadPage = () => {

    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.overhead}>
                <div className={cls.overhead__filter}>
                    <OverheadHeader  routes={routes}/>
                </div>

                <Outlet/>

                <Routes>
                    <Route
                        index
                        element={<Navigate to={"overhead"}/>}
                    />
                    <Route path={"overhead"} element={<OverheadFeature/>}/>
                    <Route path={"ove23rhead"} element={"23232"}/>

                </Routes>


            </div>

        </DynamicModuleLoader>
    );
};

