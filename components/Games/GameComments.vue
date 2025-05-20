<script setup lang="ts">

const props = defineProps<{
    gameId: number |undefined
}>()

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const newComment = ref('')
const comments = ref<Array<{id: string; userId: string; gameId: string; content: string; created_at: string}>>([]);

const fetchComments = async () => {
    if(!props.gameId) {
        return
    }

    const {data, error} = await supabase
        .from('comments')
        .select('*')
        .eq('game_id', props.gameId)
        .order('created_at', { ascending: false });

        if(!error) {
            comments.value = data
        } else {
            return error
        }
};

const submitComment = async () => {
    if(!newComment.value.trim() || !user.value || !props.gameId) {
        return
    }

    const {error} = await supabase
        .from('comments')
        .insert({
            content: newComment.value.trim(),
            user_id: user.value.id,
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
  <div class="comments-section">
    <h3>Commentaires</h3>

    <div v-if="user && props.gameId" class="comment-form">
      <textarea v-model="newComment" placeholder="Laisse ton avis..." rows="3" />
      <button @click="submitComment" :disabled="!newComment.trim()">
        Envoyer
    </button>
    </div>

    <div v-else class="login-info">
      Connecte-toi pour ajouter un commentaire.
    </div>

    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <p>{{ comment.content }}</p>
        <small>{{ new Date(comment.created_at).toLocaleString() }}</small>
      </div>
    </div>
  </div>

</template>
<style scoped>
.comments-section {
  padding: 1.25rem 1.875rem;
  background-color: #1e1e1e;
  border-radius: 0.75rem;
  margin: 2rem 0;
  color: white;
}
h3 {
  margin-bottom: 1rem;
  border-bottom: 2px solid #8e24aa;
  padding-bottom: 0.5rem;
}
.comment-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
}
textarea {
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: #2c2c2c;
  color: white;
  margin-bottom: 0.75rem;
}
button {
  align-self: flex-end;
  padding: 0.5rem 1rem;
  background: #8e24aa;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}
button[disabled] {
  background: #aaa;
  cursor: not-allowed;
}
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.comment-item {
  background-color: #2c2c2c;
  padding: 0.75rem;
  border-radius: 0.5rem;
}
.comment-item small {
  color: #ccc;
  font-size: 0.75rem;
}
.login-info {
  color: #ccc;
  font-style: italic;
}
</style>