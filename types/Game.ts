export interface Game {
    id?: number
    name?: string
    cover?: {
      id: number
      image_id: string
    }
    genres?: {
      id: number
      name: string
    }[]
    platforms?: {
      id: number
      name: string
    }[]
    summary?: string
    artworks?: {
      id: number
      image_id: string
    }[]
    screenshots?: {
      id: number
      image_id: string
    }[]
    game_modes?: {
      id: number
      name: string
    }[]
    themes?: {
      id: number
      name: string
    }[]
    release_dates?: number[]
    first_release_date?: number
    invloved_companies?: {
      company: {
        id: number
        name: string
      }
    }
    total_rating_count?: number
    year?: number,
    dlcs? : {
      id: number
      name: string
    }[]
    expanded_games?: {
      id: number
      name: string
    }[]
    similar_games?: {
      id: number
      name: string
    }[]


  }
  