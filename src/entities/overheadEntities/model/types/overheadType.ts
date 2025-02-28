interface SelectType {
    id: number,
    name: string
}
export interface OverheadData {
    branch: string
    created: string
    deleted: boolean
    id: number
    name: string
    payment: string
    price: number
    type: string
}

export interface OverheadInterface {
    loading: boolean,
    selectType: SelectType[],
    error: boolean,
    overheadData: OverheadData[]
}