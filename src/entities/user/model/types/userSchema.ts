



export interface UserSchema {
    user_id: number | null,
    name: string | null,
    role: string | null,
    surname: string | null,
    branch: number | null,
    isLoading: boolean,
    error?: string,
}

