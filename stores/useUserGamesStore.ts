import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'
import type { UserGame } from '~/types/UserGame'



export const useUserGamesStore = defineStore('userGames', () => {
    const userGames = ref<UserGame[]>([])
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
            data.map(async (game: any ) => {
                try {
                    const gamesList = await $fetch<Game[]>(`/api/game/${game.id_game}`)
                    const gameData = gamesList[0]
                    console.log('Game Data',gameData)

                    return {
                         game: {
                            id: game.id_game,
                            name: gameData.name,
                            cover: gameData.cover ? { id: gameData.cover.id, image_id: gameData.cover.image_id } : undefined,
                        },
                        isFinished: game.isFinished,
                        platform_choose: game.platform_choose || game.platform_name,  // string ici
                        timeSpent: game.timeSpent,
                    } as UserGame

                } catch (err) {
                    return
                }
            })
        )
        userGames.value = gamesFromIgdb.filter(g => g !== undefined)
        console.log(userGames.value)
    }

    const addGameInUserList = async (game:Game, platformName: string) => {
 
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
                game,
                isFinished:false,
                platform_choose: platformName,
                timeSpent: 0
            })
        
    }

    const removeGameInUserList = async (gameId: number) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const {error} = await supabase.from('games').delete().eq('user_id', user.id).eq('id_game', gameId)
        
        userGames.value = userGames.value.filter(g => g.game.id !== gameId)
    }

    const toggleFinished = async (gameId : number) => {

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const game = userGames.value.find(g => g.game.id === gameId)
        if (!game) { return }

        game.isFinished = !game.isFinished

        const {error} = await supabase
        .from('games')
        .update({isFinished:  game.isFinished})
        .eq('user_id', user.id)
        .eq('id_game', gameId)

        if (error) {
            return
        }

    }

    const updateGameTime = async(gameId: number, timeSpent: number) => {
        const { data: {user} } = await supabase.auth.getUser()
        if(!user) {
            return
        }
        const {error} = await supabase
        .from('games')
        .update({timeSpent})
        .eq('user_id', user.id)
        .eq('id_game', gameId)

        if(error) {
            console.log(error)
            return
        }

        const game = userGames.value.find(g => g.game.id === gameId)
        if(game) {
            game.timeSpent = timeSpent
        }


    }



    return { userGames, addGameInUserList, removeGameInUserList, toggleFinished,fetchUserGames, updateGameTime}
})  