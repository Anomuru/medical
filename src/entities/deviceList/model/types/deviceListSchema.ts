export interface Device {
    id: number,
    name: string,
    image: string
}



export interface DeviceProps {
    results: Device[]
    count?: number
    next?: string
    previous?: string
}

export interface DeviceListSchema {
    data: DeviceProps,
    list?: DeviceAdd[],
    error?: "error",
    loading: boolean
}

export interface DeviceAdd {
    id: number,
    name: string,
    img: string
}
