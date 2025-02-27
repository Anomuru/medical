import {Suspense} from 'react';
import {createRoutesFromElements, Route, RouterProvider} from "react-router";
import {createBrowserRouter, Navigate} from "react-router-dom";

import {Layout} from "app/layout";
import {routersConfigProfile} from "../config/routerConfigProfiles";

import {LogInPage} from "pages/logInPage";
import {RequireAuth} from "./RequireAuth";

export const AppRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={"login"}
                    element={<LogInPage/>}
                />
                <Route element={<RequireAuth/>}>
                    <Route element={<Layout/>} path={"platform"}>
                        {
                            routersConfigProfile.map(item => {
                                return (
                                    <Route
                                        id={item.name}
                                        path={item.path}
                                        element={item.element}
                                    />
                                )
                            })
                        }
                    </Route>


                </Route>


                <Route
                    index
                    element={<Navigate to={"platform"}/>}
                />
            </>
        )
    );

    return (
        <Suspense>
            <RouterProvider router={router}/>
        </Suspense>
    );
};
