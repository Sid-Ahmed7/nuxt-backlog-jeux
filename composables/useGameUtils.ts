import defaultCover from '@/assets/images/default_cover.png'

export function useGameUtils() {
  const getCoverUrl = (cover: string | undefined): string => {
    return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
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

  return { getCoverUrl, formatReleaseDate, formatRating }
}
