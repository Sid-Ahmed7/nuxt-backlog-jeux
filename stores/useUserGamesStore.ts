
import type { Game } from '@/types/Game'


export const useUserGamesStore = defineStore('userGames', () => {
    const userGames = ref<Game[]>([])


    const addGame = (game: Game, platformId: number) => {
        
        const platform = game.platforms?.find(p => p.id === platformId)
        
        if(!platform) { return}

        const isGameInUserList = userGames.value.find(g => g.id === game.id)
        
        if(!isGameInUserList) {
            userGames.value.push({
                id: game.id,
                name: game.name,
                cover: game.cover ? { id: game.cover.id, image_id: game.cover.image_id } : undefined,
                genres: game.genres || [],
                platforms: [platform],
            })
        }
    }

    const removeGame = (gamedId: number) => {
        userGames.value = userGames.value.filter(game => game.id !== gamedId)
    }

return { userGames, addGame, removeGame }
})