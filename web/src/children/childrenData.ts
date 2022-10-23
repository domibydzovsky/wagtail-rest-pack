
export interface PageChild {
    id: number,
    slug: string,
    url: string,
    last_published_at: string,
    keywords?: string[],
    banner: {
        "title": string,
        "subtitle": string,
        "image": {
            "url": string,
            "width": number,
            "height": number,
            "alt": string
        }
    }
    extra?: object
}

export interface RelationPage {
    relations: PageChild[]
}

export interface PageChildrenPage {
    children: PageChild[]
}