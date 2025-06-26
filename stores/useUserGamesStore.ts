import { defineStore } from 'pinia'
import type { Game } from '@/types/Game'
import type { UserGame } from '~/types/UserGame'
import  type { Database } from '@/supabase'
import { GameStatus } from '~/types/enums'



export const useUserGamesStore = defineStore('userGames', () => {
    const userGames = ref<UserGame[]>([])
    const supabase = useSupabaseClient<Database>()

    const fetchUserGames = async (userId :string) => {
        const {data, error } = await supabase
        .from('games')
        .select('*')
        .eq('user_id', userId)

        if(error) {
            return 
        }

        console.log('DB',data)

        const gamesFromIgdb = await Promise.all(
            data.map(async (game: any ) => {
                 console.log('Raw status from DB entry:', game.status)
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
                        platform_choose: game.platform_choose ?? game.platform_name,
                        status: game.status ?? GameStatus.NotStarted,
                        started_at: game.started_at ?? undefined,
                        ended_at: game.ended_at ?? undefined,
                        timeSpent: game.timeSpent ?? undefined,
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
                status: GameStatus.NotStarted
            }
        ])


            userGames.value.push({
                game,
                platform_choose: platformName,
                status: GameStatus.NotStarted,
                timeSpent: 0
            })
             console.log('Jeu ajouté à userGames.value:', userGames.value)
    }

    const removeGameInUserList = async (gameId: number) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          return
        }

        const {error} = await supabase.from('games').delete().eq('user_id', user.id).eq('id_game', gameId)
        
        userGames.value = userGames.value.filter(g => g.game.id !== gameId)
    }

    const updateStatus = async (gameId: number, newStatus: GameStatus, started_at?: string, ended_at?: string) => {
        
        const {data: {user}} = await supabase.auth.getUser()

        if(!user) {
            return
        }

        const updatesData: {status: GameStatus,started_at?: string, ended_at?: string} = {
            status: newStatus
        }

        if(started_at) {
            updatesData.started_at = started_at
        }

        if(ended_at) {
            updatesData.ended_at = ended_at
        }

        const {error} = await supabase
        .from('games')
        .update(updatesData)
        .eq('user_id', user.id)
        .eq('id_game', gameId)

        if(error) {
            console.error("Erreur lors de la modficiation du status", error.message)
            return
        }

        const game = userGames.value.find(g=> g.game.id === gameId)
        if(game) {

            game.status = newStatus
            
            if(started_at) {
                game.started_at = started_at
            }

            if(ended_at) {
                game.ended_at = ended_at
            }
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



    return { userGames, addGameInUserList, removeGameInUserList, updateStatus,fetchUserGames, updateGameTime}
})  