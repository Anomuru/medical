import React, {Suspense} from 'react';
import {createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router";
import {createBrowserRouter} from "react-router-dom";
import classNames from "classnames";

import {LogInPage} from "pages/logInPage";

export const AppRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={"login"}
                    element={<LogInPage/>}
                />
            </>
        )
    );

    return (
        <div className={classNames("app")}>
            <Suspense>
                <RouterProvider router={router}/>
            </Suspense>
        </div>
    );
};
