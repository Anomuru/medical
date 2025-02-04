import {IAnalysis} from "../../analysis";

export interface IPackets {
    id: number,
    extra?: boolean,
    name: string | null,
    price: number | null,
    analysis: IAnalysis[]
}

export interface IPacketsSchema {
    data: IPackets[] | [],
    loading: boolean,
    error?: "error"
}