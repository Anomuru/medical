interface IAnalysis {
    id: number;
    name: string;
    packet: IPacket | null;
}

interface IPacket {
    id: number;
    name: string;
}

interface IUserAnalysis {
    id: number;
    user: number;
    analysis: IAnalysis;
    status: boolean;
    expected_result: string;
    result: string;
    paid: boolean;
    price: number
}

interface IUserAnalysisPacket {
    packet_id: number;
    packet_name: string;
    total: number;
    analysis_list: IUserAnalysis[];
}

interface IUserAnalysisData {
    packet: IUserAnalysisPacket[];
    analysis_list: IUserAnalysis[];
}

export interface IUserProfileAnalysisSchema {
    info: IUserAnalysisData;
    loading: boolean;
    error?: string;
}