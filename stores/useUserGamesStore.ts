import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'



export const useUserGamesStore = defineStore('userGames', () => {
    const userGames = ref<(Game & { isFinished: boolean })[]>([])
    const supabase = useSupabaseClient()

    const fetchUserGames = async (userId :string) => {
        const {data, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', userId)

        if(error) {
            return 
        }

        const gamesFromIgdb = await Promise.all(
            data.map(async (game) => {
                try {
                    const gamesList = await $fetch(`/api/game/${game.id_game}`)
                    const gameData = gamesList[0]
                    return {
                        id:game.id_game,
                        name: gameData.name,
                        cover: gameData.cover ? {id: gameData.cover.id, image_id: gameData.cover.image_id} : undefined,
                        isFinished: game.isFinished,
                        platforms: gameData.platforms || [{name: game.platform_name}]
                    }
                } catch (err) {
                    return
                }
            })
        )
        userGames.value = gamesFromIgdb.filter(g => g !== undefined)
        
    }

    const addGameInUserList = async (game:Game, platformName: string) => {
        const platform = game.platforms?.find(p => p.name === platformName)
        
        if(!platform) {return}

        const {data : {user}} = await supabase.auth.getUser()
        if(!user) {
            return
        }

        const {error} = await supabase.from('games').insert([
            {
                user_id: user.id,
                id_game: game.id,
                platform_choose: platformName,
                isFinished: false,
            }
        ])


            userGames.value.push({
                id : game.id,
                cover: game.cover ? { id: game.cover.id, image_id: game.cover.image_id } : undefined,
                platforms: [platform],
                isFinished:false,
            })
        
    }

    const removeGameInUserList = async (gameId: number) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const {error} = await supabase.from('games').delete().eq('user_id', user.id).eq('id_game', gameId)
        
        userGames.value = userGames.value.filter(g => g.id !== gameId)
    }

    const toggleFinished = async (gameId : number) => {

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const game = userGames.value.find(g => g.id === gameId)
        if (!game) { return }

        const isGameFinished = !game.isFinished

        const {error} = await supabase
        .from('games')
        .update({isFinished: isGameFinished})
        .eq('user_id', user.id)
        .eq('id_game', gameId)

        if (error) {
            return
        }

        game.isFinished = isGameFinished
    }



    return { userGames, addGameInUserList, removeGameInUserList, toggleFinished,fetchUserGames}
})  