

export interface IDeviceProfile {
    id: number,
    name: string,
    ip_address: string,
    branch?: string
}

export interface IDeviceProfileUsers {
    id: number,
    name: string,
    surname: string,
    user_analysis: string
}

export interface IUserAnalis {
    expected_result: string,
    result: string
}


export interface DeviceProfileSchema {
    data?: IDeviceProfile[],
    users?: IDeviceProfileUsers[],
    analis?: IUserAnalis[],
    error?: "error",
    loading: boolean
}