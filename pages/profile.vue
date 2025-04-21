<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { UserProfile } from '@/types/UserProfile';
import ProfileHeader from '@/components/Profile/ProfileHeader.vue';
import NavBar from '@/components/Profile/NavBar.vue';
import UserGameCard from '@/components/Games/UserGameCard.vue';
import { useUserGamesStore } from '@/stores/useUserGamesStore';


const userGameStore = useUserGamesStore();
const userProfile = ref<UserProfile | null>(null);

const supabase = useSupabaseClient()
const router = useRouter()

const user = ref<UserProfile |  null>(null)


const { data, error } = await supabase.auth.getUser()
if( error || !data.user) {
 router.push('/login')
} 

const { data: profile, error: profileError } = await supabase
  .from('user_profiles')
  .select('*')
  .eq('user_id', data.user?.id || '')
  .single<UserProfile>()

  if(profile) {
    user.value = {
      ...data.user,
      ...profile,
    } } else {
      router.push('/login')
    }
</script>

<template>

<div v-if="user" class="profile-container">
<ProfileHeader :user="user"  />
<NavBar />

<div>
        <UserGameCard
            v-for="userGame in userGameStore.userGames"
            :key="userGame.id"
            :game="userGame"
            :platform="userGame.platforms"
            ></UserGameCard>
    </div>
</div>

<div v-else class="loading">
  <p>Chargement du profil...</p>
</div>
</template>

<style scoped>



.loading {
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
}
</style>
