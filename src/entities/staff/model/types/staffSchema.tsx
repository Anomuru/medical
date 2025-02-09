export interface Staff {
    id: number,
    username: string,
    name: string,
    surname: string
    image?: string,
    job: string,
    age?: number | string,
    phone_number: string,
    sex: string | number,
    birth_date: string,
    address: string,
    password: string,
    branch: number,
    email: string,
    passport_series: string,
    passport_number: string,
    role: string
}

export interface StaffListSchema {
    data?: {
        results?: Staff[]
        count?: number,
        previous?: number,
        next?: number
    },
    detail?: Staff,
    error?: "error",
    loading: boolean
}

export interface StaffProfileSchema {
    id: number,
    details?: Staff,
    error?: "error",
    loading: boolean
}

