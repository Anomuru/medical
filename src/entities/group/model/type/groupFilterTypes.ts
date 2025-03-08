
export interface FilterSelectResearch{
    id: number,
    name: string
}

export interface FilterSelectWorkplace{
    id: number,
    name: string
}
export interface FilterRadioItem{
    id: number,
    name: string
}

export interface GroupFilterTypes {
    filterSelectResearch: FilterSelectResearch[],
    filterSelectWorkplace: FilterSelectWorkplace[],
    filterRadioItem: FilterRadioItem[],
    loading: boolean,
    error: string | undefined
}