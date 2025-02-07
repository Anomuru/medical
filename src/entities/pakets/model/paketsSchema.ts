import {IAnalysis} from "../../analysis";

export interface IAnalysisProps {
    expected_result: string,
    id: number,
    paid: boolean,
    result: string,
    status: boolean,
    user: number,
    price: number,
    analysis: {
        id: number,
        name: string,
        packet: {
            branch: number,
            id: number,
            name: string
        }
    },
}

export interface IPackets {
    id: number,
    extra?: boolean,
    name: string | null,
    price: number | null,
    analysis: IAnalysis[]
}

export interface IUserPackets {
    packet_id?: number,
    packet_name?: string,
    total?: string,
    analysis_list: IAnalysisProps[] | []
}

export interface IPacketsSchema{
    data: IPackets[] | [],
    loading: boolean,
    error?: "error"
}