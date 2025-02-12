import React from 'react';
import {Outlet} from "react-router";

import {MenuBar} from "widgets/menuBar";
import {Header} from "widgets/header";

import cls from "./layout.module.sass";
import {Alert} from "features/alert/ui/alert";

export const Layout = () => {
    return (

        <div className={cls.layout}>
            <Alert/>
            {/*<div style={{display: "flex" , flexDirection: "column"}}>*/}
                {/*<Header/>*/}
                <MenuBar/>
            {/*</div>*/}
            <main className={cls.layout__content}>
                {/*<Header/>*/}
                <div className={cls.wrapper}>
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
