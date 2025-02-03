export interface Branch {
    id: number,
    name: string,
    starts: string,
    ends: string,
    phone_number: string,
    ip_address: string,
    main: boolean,
    location: string

}


export interface BranchProps {
    results?: Branch[]
    count?: number
    next?: string
    previous?: string
}

export interface BranchSchema {
    data?: BranchProps,
    error?: "error",
    loading: boolean
}