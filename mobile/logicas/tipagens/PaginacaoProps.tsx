
export type MetaProps = {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export type LinkProps = {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
}

export type Paginacao<T> = {
    data: T[]

    meta: MetaProps

    links: LinkProps
} 