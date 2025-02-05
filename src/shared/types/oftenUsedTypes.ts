
export interface JobSchema {
    id: number,
    name: string
}





export interface DoctorSchema {
    img: string,
    id: number,
    name: string,
    jobs: JobSchema[]
}
