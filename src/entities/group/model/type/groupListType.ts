interface Packet {
    id: number;
    name: string;
    branch: number;
}

interface Container {
    branch: number
    color: string
    id: number
    name: string
    size: string
}

interface Analysis {
    code_name: string
    container: Container
    id: number
    name: string
    packet: Packet
    price: number
}

interface AnalysisDetail {
    name: string;
    surname: string;
    analysis: Analysis;
}

export interface GroupListInterface {
    id: number;
    analysis_details: AnalysisDetail[];
    status: number;
    expected_result: any;
    paid: boolean;
    by_packet: boolean;
    date: string;
    urgent: boolean;
    user: number;
    request: number;
    payment: number;
    branch: number;
    analysis: number[];
}

export interface GroupListType{
    groupListData: GroupListInterface[],
    loading: boolean,
    error: boolean
}