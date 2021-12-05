
export interface Breadcrump {
    icon?: any
    id: string
    url: string
    slug: string
    title: string
}

export interface BreadcrumpPage {
    breadcrumps: Breadcrump[]
}