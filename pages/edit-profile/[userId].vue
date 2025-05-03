<script setup lang="ts">
import AvatarUpload from '@/components/Edit/AvatarUpload.vue';
import PasswordChange from '@/components/Edit/PasswordChange.vue';
import BannerUpload from '@/components/Edit/BannerUpload.vue';
import ProfileInfo from '@/components/Edit/ProfileInfo.vue';

const route = useRoute();
const userId = route.params.userId as string;

</script>

<template>
    <div class="edit-profile-container">
        <h1>Modifier le profil</h1>
        <AvatarUpload :userId="userId" />
    </div>

</template>