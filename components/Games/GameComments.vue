<script setup lang="ts">

import  type { Database } from '@/supabase'
import type { UserComment } from '@/types/UserComment';


const props = defineProps<{
    gameId: number |undefined
}>()

const supabase = useSupabaseClient<Database>()
const authStore = useAuthStore()
const user = authStore.user

const newComment = ref('')
const comments = ref<UserComment[]>([])

const fetchComments = async () => {
    if(!props.gameId) {
        return
    }

    const {data, error} = await supabase
        .from('comments')
        .select('*')
        .eq('game_id', props.gameId)
        .order('created_at', { ascending: false });

        if(!error && data) {
            comments.value = data.map((comment:any) => ({
                id: comment.id,
                userId: comment.user_id ?? '',
                gameId: comment.game_id.toString(),
                content: comment.content ?? '',
                created_at: comment.created_at
            }))
        } else {
            return error
        }
};

const submitComment = async () => {
    if(!newComment.value.trim() || !authStore.user || !props.gameId) {
        return
    }

    const {error} = await supabase
        .from('comments')
        .insert({
            content: newComment.value.trim(),
            user_id: authStore.user.id,
            game_id: props.gameId,
            parent_id: null
        });

        if(!error) {
            newComment.value ='';
            fetchComments();
        } else {
            return error
        }
}

onMounted(() => {
    fetchComments()
});
</script>

<template>
  <div class="px-6 py-5 bg-zinc-900 rounded-2xl my-8 text-white">
    <h3 class="mb-4 pb-2 border-b-2 border-purple-700 text-xl font-semibold">Commentaires</h3>

    <div v-if="user && gameId" class="flex flex-col mb-6">
      <textarea v-model="newComment" placeholder="Laisse ton avis..." rows="3"  class="p-3 rounded-lg border-none bg-zinc-800 text-white mb-3 resize-none" />
      <button @click="submitComment" :disabled="!newComment.trim()"   class="self-end px-4 py-2 bg-main text-white rounded-lg disabled:bg-main disabled:cursor-not-allowed">
        Envoyer
    </button>
    </div>

    <div v-else class="text-gray-400 italic mb-4">
      Connecte-toi pour ajouter un commentaire.
    </div>

    <div class="flex flex-col gap-4">
      <div v-for="comment in comments" :key="comment.id" class="bg-zinc-500 p-3 rounded-lg">
        <p>{{ comment.content }}</p>
        <small class="text-gray-400 text-sm">{{ new Date(comment.created_at).toLocaleString() }}</small>
      </div>
    </div>
  </div>

</template>