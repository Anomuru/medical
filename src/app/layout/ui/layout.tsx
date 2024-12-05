import React from 'react';
import {Outlet} from "react-router";

import {MenuBar} from "widgets/menuBar";
import {Header} from "widgets/header";

import cls from "./layout.module.sass";

export const Layout = () => {
    return (
        <div className={cls.layout}>
            <MenuBar/>
            <main className={cls.layout__content}>
                <Header/>
                <Outlet/>
            </main>
        </div>
    );
}
