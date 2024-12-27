
export interface DeviceAdd {
    id: number,
    name: string,
    img: string
}

export interface DeviceAddSchema {
    data?: DeviceAdd[],
    error?: "error",
    loading: boolean
}
