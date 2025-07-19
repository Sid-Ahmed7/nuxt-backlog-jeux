<script setup lang="ts">
import type { UserProfile } from '@/types/UserProfile'
import defaultAvatar from '@/assets/images/spidey.jpg'

const props = defineProps<{
  user: UserProfile
}>()

const bio = computed(() => props.user.bio || '')
</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-12 mb-8">

    <div class="flex items-center gap-6">
      <img
        :src="defaultAvatar"
        :alt="`Avatar de ${user.username}`"
        class="w-36 h-36 rounded-full border-4 border-main object-cover"
      />
      <div>
        <h1 class="text-3xl font-bold text-white">
          {{ user.username }}
        </h1>
        <p class="mt-1 text-indigo-400 text-base">
          {{ bio }}
        </p>
      </div>
    </div>
    <NuxtLink
      :to="`/edit-profile/${user.id}`"
      class="self-start md:self-auto px-6 py-2 bg-main rounded-xl text-white font-medium hover:bg-indigo-700 transition"
    >
      Éditer profil
    </NuxtLink>
  </div>
</template>
