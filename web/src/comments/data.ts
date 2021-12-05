

export interface CreateComment {
    id?: number;
    parent_id?: number;
    body: string;
}

export interface UpdateComment {
    id?: number
    body: string
}

export interface CommentAuthor {
    is_staff: boolean
    is_superuser: boolean
    first_name: string
    username: string
    last_name: string
    profile: {
        avatar?: string | null
    }
}

export interface GetComment {
    id?: number
    parent?: number // todo really number?
    created_on: string
    author?: CommentAuthor,
    updated_on?: string | null,
    updated_by?: CommentAuthor | null,
    body: string,
    children: GetComment[]
}