

export interface Staff {
    id: number,
    name: string,
    surname: string
    image: string,
    job: string,
    age: number,
    phone: string
}

export interface StaffSchema {
    data?: Staff[],
    error?: "error",
    loading: boolean
}