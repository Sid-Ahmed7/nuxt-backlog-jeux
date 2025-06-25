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

<style scoped>

.edit-profile-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}
h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: var(--main-color);
}
</style>