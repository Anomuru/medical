import {IAnalysisProps} from "entities/pakets";

export interface IPacketsData {
    packet_id: number;
    packet_name: string;
    total: number;
    isChecked?: boolean,
    analysis_list: IAnalysisProps[];
}

export interface IPacketsAnalysis {
    packet: IPacketsData[];
    analysis_list: IAnalysisProps[];
}

export interface IPacketsAnalysisSchema {
    data: IPacketsAnalysis;
    loading: boolean;
    error?: "error";
}