import {JSX} from "react";

interface IRouterConfigProfiles {
    name: string,
    path: (arg?: string) => string,
    element: JSX.Element
}

export const routersConfigProfile: IRouterConfigProfiles[] = []