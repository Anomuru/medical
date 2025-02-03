import {IAnalysis} from "../../analysis";

export interface IPackets {
    id: number,
    title: string | null,
    price: number | null,
    packages: IAnalysis[] | []
}

export interface IPacketsSchema {
    data: IPackets[] | [],
    loading: boolean,
    error?: "error"
}