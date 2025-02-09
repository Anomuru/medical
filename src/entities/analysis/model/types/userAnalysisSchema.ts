import {IAnalysisProps} from "../../../pakets/model/paketsSchema";




interface IUserAnalysisPacket {
    packet_id: number;
    packet_name: string;
    analysis_list: IAnalysisProps[];
}

export interface IUserAnalysisData {
    packet: IUserAnalysisPacket[];
    analysis_list: IAnalysisProps[];
}

export interface IUserAnalysisSchema {
    info: IUserAnalysisData;
    loading: boolean;
    error?: string;
}