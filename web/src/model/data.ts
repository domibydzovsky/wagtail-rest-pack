

export interface OpenPage {
  url: string
  title: string
}

export interface PageTransition {
  openPage: (data: OpenPage) => void
}
