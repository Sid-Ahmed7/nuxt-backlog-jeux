<script setup lang="ts">
import ProfileInfo from '@/components/Edit/ProfileInfo.vue';

const route = useRoute();
const userId = route.params.userId as string;

</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
        <h1>Modifier le profil</h1>
    <ProfileInfo :userId="userId"/>
    
    </div>

</template>
