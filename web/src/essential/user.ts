

export interface User {
    is_staff?: boolean
    is_superuser?: boolean
    first_name?: string
    last_name?: string
    username: string
    id?: number
    profile?: {
        avatar: string
    }
}