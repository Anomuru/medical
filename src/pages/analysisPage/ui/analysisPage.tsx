import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router';

import {AnalysisAnalysis, AnalysisContainerModal, AnalysisGroupModal, AnalysisPackageModal} from "features/analysis";
import {AnalysisHeader, analysisReducer} from "entities/analysis";

import cls from "./analysisPage.module.sass";
import {
    DynamicModuleLoader,
    ReducersList
} from "../../../shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {analysisContainerReducer} from "entities/analysis/model/slice/analysisContainerSlice";
import {analysisGroupReducer} from "entities/analysis/model/slice/analysisGroupSlice";
import {analysisPackageReducer} from "entities/analysis/model/slice/analysisPackageSlice";
import {useSelector} from "react-redux";
import {getUserBranch} from "../../../entities/user";


const reducers: ReducersList = {
    analysisSlice: analysisReducer,
    analysisContainerSlice: analysisContainerReducer,
    analysisGroupSlice: analysisGroupReducer,
    analysisPackageSlice: analysisPackageReducer
    // userSlice:
};
export const AnalysisPage = () => {
    const route = localStorage.getItem("route")



    return (
        <DynamicModuleLoader reducers={reducers}>
            <div className={cls.analysis}>
                <AnalysisHeader/>
                <Outlet/>
                <Routes>
                    <Route path={"package"} element={<AnalysisPackageModal/>}/>
                    <Route path={"group"} element={<AnalysisGroupModal/>}/>
                    <Route path={"container"} element={<AnalysisContainerModal/>}/>
                    <Route path={"analysisGroup"} element={<AnalysisAnalysis/>}/>

                    <Route index element={<Navigate to={`${route}`}/>}/>
                </Routes>
            </div>
        </DynamicModuleLoader>

    );
}