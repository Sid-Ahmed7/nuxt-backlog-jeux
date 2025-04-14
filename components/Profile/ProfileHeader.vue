<script setup lang="ts">
import type { UserProfile } from '@/types/UserProfile'
import defaultAvatar from '@/assets/images/spidey.jpg'
import defaultBanner from '@/assets/images/default_banner.png'

defineProps<{
  user: UserProfile
}>()
</script>

<template>
  <div class="profile-header">
    <div class="banner">

        <img :src="user.bannerUrl || defaultBanner" alt="Banner" class="banner-image" />
    </div>
    <div class="avatar">
      <img :src="user.avatarUrl || defaultAvatar" alt="Avatar" class="avatar-image" />
    </div>
    <div class="user-details">
      <div class="user-status">
        <h1>{{ user.username }}</h1>
        <span class="status"></span>
        <button class="edit-btn">Éditer profil</button>
      </div>
      <div class="user-bio">
        <p>{{ user.bio || '' }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 1.5rem;
  margin: 0 auto;
  position: relative;
}

.banner {
height: 35vh;
  width: 100%;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar {
  position: absolute;
  top: 4rem;
  left: 2rem;
  width: 20%;
  height: 45vh;
  z-index: 10;
}

.avatar-image {
  width: 80%;
  height: 100%;
  border-radius: 20%;
  object-fit: cover;
}

.user-details {
  padding:  2rem;
  margin-left: 20rem;
}

.user-status {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  column-gap: 1rem;
  margin-bottom: 1rem;
}

.user-status h1 {
  font-size: 1.75rem;
  margin: 0;
}

.status {
  width: 15px;
  height: 15px;
  background-color: #4caf50;
  border-radius: 50%;
}

.edit-btn {
  justify-self: end;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.user-bio p {
  margin: 0;
  color: #555;
}
@media (max-width: 768px) {
  .avatar {
    position: static;
    margin: 0 auto;
    width: 120px;
    height: 120px;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .user-details {
    margin-left: 0;
    padding: 1rem;
    text-align: center;
  }

  .user-status {
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    justify-items: center;
  }

  .edit-btn {
    justify-self: center;
  }
}

@media (max-width: 480px) {
  .user-status h1 {
    font-size: 1.5rem;
  }

  .edit-btn {
    font-size: 0.9rem;
    padding: 0.3rem 0.8rem;
  }

  .user-bio p {
    font-size: 0.95rem;
  }
}

</style>
