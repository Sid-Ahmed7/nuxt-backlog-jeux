<script setup lang="ts">
import BacklogTrack from '@/components/Home/BacklogTrack.vue'
import UpcomingGames from '@/components/Home/UpcomingGames.vue'
import LastOuting from '@/components/Home/LastOuting.vue'
import RatingGames from '@/components/Home/RatingGames.vue'
</script>

<template>
    <BacklogTrack />
    <section class="game-recommendations">
      <UpcomingGames />
      <LastOuting />
      <RatingGames />
    </section>
</template>

<style scoped lang="css">

.game-recommendations {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 100%;
}
</style>