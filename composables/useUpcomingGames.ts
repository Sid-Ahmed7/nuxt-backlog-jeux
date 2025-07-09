import { useGamesStore } from '@/stores/useGamesStore'
import type { Game } from '@/types/Game'


export function useUpcomingGames() {

    const gamesStore = useGamesStore()
    const upComingGames = ref<Game[]>([])
    const selectedGenres = ref<string[]>([]);
    const selectedPlatforms = ref<string[]>([]);
    const selectedGameModes = ref<string[]>([]);
    const selectedThemes = ref<string[]>([]);
    const searchQuery = ref<string>("");
    const error = ref<string | null>(null);
    const currentPage = ref(1);
    const gamesPerPage = 50;

    const filteredGames = computed(() => {
        return gamesStore.upComingGames.filter((game) => {
        const matchesSearch = game.name?.toLowerCase().includes(searchQuery.value.toLowerCase());

        const matchesPlatform = selectedPlatforms.value.length === 0 || (Array.isArray(game.platforms) && game.platforms.some((platform) =>
                selectedPlatforms.value.includes(platform.name)
            ));

        const matchesGenre = selectedGenres.value.length === 0 || (Array.isArray(game.genres) && game.genres.some((genre) =>
                selectedGenres.value.includes(genre.name)
            ));

        const matchesGameMode = selectedGameModes.value.length === 0 || (Array.isArray(game.game_modes) && game.game_modes.some((gameMode) =>
                selectedGameModes.value.includes(gameMode.name)
            ));

        const matchesTheme = selectedThemes.value.length === 0 || (Array.isArray(game.themes) && game.themes.some((theme) =>
                selectedThemes.value.includes(theme.name)
            ));

        return ( matchesSearch && matchesPlatform && matchesGenre && matchesGameMode && matchesTheme);
        });
    });
    const onSearch = (query: string) => {
        searchQuery.value = query.toLowerCase();
    };
    const noResults = computed(() => {
        return filteredGames.value.length === 0;
    });

    const paginatedGames = computed(() => {
        const start = (currentPage.value - 1) * gamesPerPage;
        const end = start + gamesPerPage;
        return filteredGames.value.slice(start, end);
    });

    const totalPages = computed(() => {
        return Math.ceil((filteredGames.value ?? []).length / gamesPerPage);
    });




    
  watch([filteredGames, currentPage], () => {
    const maxPage = Math.ceil((filteredGames.value ?? []).length / gamesPerPage);
    if (currentPage.value > maxPage) {
      currentPage.value = maxPage || 1;
    }
  });
    return {
        upComingGames,
        error,
            selectedGenres,
    selectedPlatforms,
    selectedGameModes,
    selectedThemes,
    searchQuery,
    filteredGames,
    paginatedGames,
    currentPage,
    totalPages,
    noResults,
    onSearch,
    gamesPerPage,
    gamesStore,
    }
}