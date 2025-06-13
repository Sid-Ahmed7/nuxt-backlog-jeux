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
      name: string,
      platform_logo?: {
        id: number
        image_id: string
      }
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

    first_release_date?: number
    involved_companies?: {
      company: {
        id: number
        name: string
      }
    
    }[]
    total_rating_count?: number
    year?: number
    dlcs? : {
      id: number
      name: string
      cover?: {
        id: number
        image_id: string
      }
    }[]
    expanded_games?: {
      id: number
      name: string
      cover?: {
        id: number
        image_id: string
      }
    }[]
    expansions?: {
      id: number
      name: string
      cover?: {
        id: number
        image_id: string
      }
    }[]
    similar_games?: {
      id: number
      name: string
      cover?: {
        id: number
        image_id: string
      }
    }[]
    multiplayer_modes?: {
      id:number
      campaigncoop?: boolean
      dropin?: boolean
      lancoop?: boolean
      offlinecoop?: boolean
      offlinecoopmax?: number
      offlinemax?: number
      onlinemax?: number
      splitscreen?: boolean
      splitsscreenonline?: boolean
    }[]
    videos?: {
      id: number
      name:string,
      video_id: string
    }[]


  }
  