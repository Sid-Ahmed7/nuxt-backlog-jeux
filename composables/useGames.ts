export function useGames() {
  const { data: gameData, error: fetchError } =  useAsyncData('games', () => $fetch('/api/games'))

  return {
    gameData: gameData,
    fetchError
  }
}
