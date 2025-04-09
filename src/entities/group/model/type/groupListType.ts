interface Packet {
    id: number;
    name: string;
    branch: number;
}

interface Container {
    branch: number;
    color: string;
    id: number;
    name: string;
    size: string;
}

interface Device {
    branch: number
    can_delete: boolean
    id: number
    img: string
    ip_address: number
    name: number
}

interface Analysis {
    code_name: string;
    container: Container;
    device: Device;
    id: number;
    name: string;
    packet: Packet;
    price: number;
}

export interface GroupListInterface {
    id: number;
    name: string;
    surname: string;
    status: number | string;
    expected_result: any;
    paid: boolean;
    by_packet: boolean;
    date: string;
    urgent: boolean;
    user: number;
    request: number;
    payment: number | null;
    branch: number;
    start_branch: string;
    end_branch: string;

    analysis: Analysis;
}
interface GroupListItemData {
    name: string
}
export interface GroupListType{
    groupListData: GroupListInterface[],
    loading: boolean,
    error: boolean,

    groupListItemData: GroupListItemData[]
}