import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router';

import {AnalysisContainerModal, AnalysisGroupModal, AnalysisPackageModal} from "features/analysis";
import { AnalysisHeader} from "entities/analysis";

import cls from "./analysisPage.module.sass";

export const AnalysisPage = () => {
    return (
        <div className={cls.analysis}>
            <AnalysisHeader/>
            <Outlet/>
            <Routes>
                <Route path={"package"} element={<AnalysisPackageModal/>}/>
                <Route path={"group"} element={<AnalysisGroupModal/>}/>
                <Route path={"container"} element={<AnalysisContainerModal/>}/>
                <Route path={"analysisGroup"} element={null}/>

                <Route index element={<Navigate to={"package"}/>}/>
            </Routes>
        </div>
    );
}