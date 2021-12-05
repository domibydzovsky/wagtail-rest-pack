export interface Paginated<T> {

    previous: string | null
    next: string | null
    count: number
    results: T[]
}