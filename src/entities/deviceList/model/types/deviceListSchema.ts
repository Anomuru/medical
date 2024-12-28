export interface Device {
    id: number,
    name: string,
    image: string
}



export interface DeviceProps {
    results?: Device[]
    count?: number
    next?: string
    previous?: string
}

export interface DeviceListSchema {
    data?: DeviceProps,
    error?: "error",
    loading: boolean
}