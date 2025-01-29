import React from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router';

import {AnalysisPackageModal} from "features/analysis";
import {AnalysisHeader, AnalysisPackage} from "entities/analysis";

import cls from "./analysisPage.module.sass";

export const AnalysisPage = () => {
    return (
        <div className={cls.analysis}>
            <AnalysisHeader/>
            <Outlet/>
            <Routes>
                <Route path={"package"} element={<AnalysisPackageModal/>}/>

                <Route index element={<Navigate to={"package"}/>}/>
            </Routes>
        </div>
    );
}