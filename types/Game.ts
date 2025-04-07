export interface Game {
    id?: number
    name?: string
    cover?: {
      id: number
      image_id: string
    }
    genres?: string
    platforms?: {
      id: number
      name: string
    }[]
    summary?: string
    artworks?: {
      id: number
      image_id: string
    }
    screenshots?: {
      id: number
      image_id: string
    }
    release_dates?: number[]
    first_release_date?: number
    invloved_companies?: {
      company: {
        id: number
        name: string
      }
    }
    rating?: number
    year?: number
  }
  