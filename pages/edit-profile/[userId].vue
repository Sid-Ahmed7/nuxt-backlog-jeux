<script setup lang="ts">
import ProfileInfo from '@/components/Edit/ProfileInfo.vue';

const route = useRoute();
const userId = route.params.userId as string;

</script>

<template>
    <div class="edit-profile-container">
        <h1>Modifier le profil</h1>
    
    <ProfileInfo :userId="userId"/>
    
    </div>

</template>