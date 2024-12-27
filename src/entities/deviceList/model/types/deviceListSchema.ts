export interface Device {
    id: number,
    name: string,
    image: string
}



export interface DeviceListSchema {
    data?: Device[],
    error?: "error",
    loading: boolean
}