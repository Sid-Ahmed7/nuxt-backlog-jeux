<script setup lang="ts">
import { useRouter } from "vue-router";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import ProfileNavBar from "@/components/Profile/ProfileNavBar.vue";
import GameInProgress from "@/components/Chart/GameStatus.vue";
import GameByPlatform from "@/components/Chart/GameByPlatform.vue";
import UserGameCard from "@/components/Games/UserGameCard.vue";
import Pagination from "@/components/Pagination.vue";

import type { Game } from "@/types/Game";
import type { UserGame } from "@/types/UserGame";

const router = useRouter();
const supabase = useSupabaseClient();
const userGameStore = useUserGamesStore();
const authStore = useAuthStore();
const { transformUserGame } = useGameUtils();

const user = authStore.user;
const activeTab = ref<"all" | "stats">("all");
const currentPage = ref(1);
const gamesPerPage = 6;

if (!user) {
  router.push("/login");
}

const { data: res, error } = await useAsyncData("profile", async () =>
  supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", user?.id || "")
    .maybeSingle()
);

const profile = computed(() => res.value?.data ?? null);

const { data: gamesData } = await useAsyncData(
  "detailedUserGames",
  async () => {
    if (!user?.id) return [];

    await userGameStore.fetchUserGames(user.id);

    const gameData = await Promise.all(
      userGameStore.userGames.map(async (userGame: any) => {
        try {
          const game = await $fetch<Game[]>(
            `/api/userGames/${userGame.id_game}`
          );

          return transformUserGame(userGame, game[0]);
        } catch (e) {
          console.error(`Erreur lors du fetch du jeu ${userGame.id_game}`, e);
          return null;
        }
      })
    );

    return gameData.filter(Boolean) as UserGame[];
  }
);

watch(
  () => gamesData.value,
  (newVal) => {
    if (newVal) {
      userGameStore.setGames(newVal);
    }
  },
  { immediate: true }
);

const userGamesWithDetails = computed(() => userGameStore.userGames ?? []);

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * gamesPerPage;
  return userGamesWithDetails.value.slice(start, start + gamesPerPage);
});

const totalPages = computed(() => {
  return Math.ceil(userGamesWithDetails.value.length / gamesPerPage);
});
</script>

<template>
  <div v-if="profile" class="max-w-5xl mx-auto p-6 text-white min-h-screen">
    <ProfileHeader :user="profile" />

    <ProfileNavBar
      :selectTab="activeTab"
      @update:tab="activeTab = $event"
      class="mb-8"
    />

    <div v-if="activeTab === 'all'" class="mt-8">
      <div class="grid grid-cols-0 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <UserGameCard
          v-for="userGame in paginatedGames"
          :key="userGame.game.id"
          :games="userGame"
        />
      </div>

      <div
        v-if="userGamesWithDetails.length > 0"
        class="mt-8 flex justify-center space-x-3 px-4"
      >
        <Pagination
          :totalPages="totalPages"
          :currentPage="currentPage"
          @update:currentPage="currentPage = $event"
        />
      </div>
    </div>

    <div
      v-else-if="activeTab === 'stats'"
      class="mt-8 flex flex-wrap justify-center gap-6 px-4"
    >
      <section
        class="bg-card border border-card-hover rounded-2xl p-6 max-w-xl w-full shadow-lg backdrop-blur-sm"
      >
        <GameInProgress :games="userGamesWithDetails" />
      </section>

      <section
        class="bg-card border border-card-hover rounded-2xl p-6 max-w-xl w-full shadow-lg backdrop-blur-sm"
      >
        <GameByPlatform :games="userGamesWithDetails" />
      </section>
    </div>
  </div>

  <div v-else class="text-center mt-20 text-lg text-gray-400">
    Chargement du profil...
  </div>
</template>
