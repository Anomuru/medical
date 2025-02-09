
export interface JobSchema {
    id: number,
    name: string,
    has_client: boolean,
    can_delete: boolean
}





export interface DoctorSchema {
    img: string,
    id: number,
    name: string,
    jobs: JobSchema[]
}
