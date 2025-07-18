import defaultCover from '@/assets/images/default_cover.png'
import defaultBanner from '@/assets/images/default_banner.png'
import type { Game } from '@/types/Game'
import type { UserGame } from '~/types/UserGame'
import { GameStatus } from '~/types/enums'

export function useGameUtils() {
  const getCoverUrl = (cover: string | undefined): string => {
    return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
  }

  const getArtworkUrl = (artwork: string | undefined): string => {
    return artwork ? `https://images.igdb.com/igdb/image/upload/t_screenshot_med_2x/${artwork}.jpg` : defaultBanner  
  }

  const getScreenshotUrl = (screenshot: string | undefined): string => {
    return screenshot ? `https://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot}.jpg` : defaultCover  
  }

  const getLogoUrl = (logo: string | undefined): string => {
    return logo ? `https://images.igdb.com/igdb/image/upload/t_logo_med/${logo}.jpg` : defaultCover
  }
  const formatReleaseDate = (releaseDates: number | undefined): string => {
    if (releaseDates) {
      const releaseDate = new Date(releaseDates * 1000)
      return releaseDate.toLocaleDateString()
    }
    return 'Date inconnue'
  }

  const formatRating = (rating: number | undefined): string => {
    if (rating) {
      const ratingOn = (rating / 10).toFixed(1)
      return `${ratingOn} ★`
    }
    return 'Pas de note'
  }

  const transformGameData = (game: any): Game => {
    return {
    id: game.id,
              name: game.name,
              cover: game.cover ? { id: game.cover.id, image_id: game.cover.image_id } : undefined,
              slug: game.slug || '',
              summary: game.summary,
              genres: game.genres || [],
              involved_companies: game.involved_companies || [],
              first_release_date: game.first_release_date || 0,
              artworks: game.artworks || [],
              dlcs: game.dlcs || [],
              similar_games: game.similar_games || [],
              expanded_games: game.expanded_games || [],
              expansions: game.expansions || [],
              screenshots: game.screenshots || [],
              game_modes: game.game_modes || [],
              themes: game.themes || [],
              total_rating_count: game.total_rating_count || 0,
              platforms: game.platforms || [],
              multiplayer_modes: game.multiplayer_modes || [],
              videos: game.videos || [],
              year: game.first_release_date
                ? new Date(game.first_release_date * 1000).getFullYear()
                : 0,
  }
}


const transformUserGame = (userGameRecord: any , igdbGameData: any) :UserGame => {
    
    return {
      game: {
        id: igdbGameData.id,
        name: igdbGameData.name,
        cover: igdbGameData.cover ? {id: igdbGameData.cover.id, image_id: igdbGameData.cover.image_id} : undefined
      },
      platform_choose: userGameRecord.platform_choose ?? undefined,
      status: userGameRecord.status ?? GameStatus.NotStarted,
      started_at: userGameRecord.started_at ?? undefined,
      ended_at: userGameRecord.ended_at ?? undefined,
      timeSpent: userGameRecord.timeSpent ?? undefined
    }
}

  return { getCoverUrl, getArtworkUrl, getScreenshotUrl, getLogoUrl,formatReleaseDate, formatRating, transformGameData, transformUserGame}
}
