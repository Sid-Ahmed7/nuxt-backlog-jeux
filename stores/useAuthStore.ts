import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { User } from "@/types/AuthUser";
import type { Database } from "@/supabase";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient<Database>();
  const supabaseUser = useSupabaseUser();

  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(true);

  const fetchUserProfile = async (userId: string) => {
    const { data: userProfile, error: profilError } = await supabase
      .from("user_profiles")
      .select("username")
      .eq("user_id", userId)
      .maybeSingle<{ username: string }>();

    if (profilError) {
      error.value = profilError.message;
      return null;
    }
    return userProfile;
  };

  const init = async () => {
    isLoading.value = true;
    const session = supabase.auth.getSession();
    const currentUser = (await session).data.session?.user ?? null;

    if (currentUser) {
      const profile = await fetchUserProfile(currentUser.id);
      user.value = {
        id: currentUser.id,
        email: currentUser.email ?? "",
        username: profile?.username ?? "Utilisateur",
      };
    } else {
      user.value = null;
    }
    isLoading.value = false;
  };

  watch(supabaseUser, async (newUser) => {
    if (newUser) {
      const profile = await fetchUserProfile(newUser.id);
      user.value = {
        id: newUser.id,
        email: newUser.email ?? "",
        username: profile?.username ?? "Utilisateur",
      };
    } else {
      user.value = null;
    }
  });

  const login = async (email: string, password: string) => {
    error.value = null;
    isLoading.value = true;

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        error.value = loginError.message;
        user.value = null;
        isLoading.value = false;
        return;
      }

      if (data.user) {
        const profile = await fetchUserProfile(data.user.id);
        if (!profile) {
          // Si pas de profil, crée un profil par défaut
          const username = data.user.user_metadata?.username || "Utilisateur";
          const { error: insertError } = await supabase.from("user_profiles").insert([
            {
              user_id: data.user.id,
              username,
            },
          ]);
          if (insertError) {
            error.value = insertError.message;
            user.value = null;
            isLoading.value = false;
            return;
          }
          user.value = {
            id: data.user.id,
            email: data.user.email ?? "",
            username,
          };
        } else {
          user.value = {
            id: data.user.id,
            email: data.user.email ?? "",
            username: profile.username,
          };
        }
      }
    } catch (err) {
      error.value = "Erreur lors de la connexion : " + (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    error.value = null;
    try {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        error.value = logoutError.message;
      } else {
        user.value = null;
      }
    } catch (err) {
      error.value = "Erreur lors de la déconnexion : " + (err as Error).message;
    }
  };

  return { user, error, login, logout, isLoading, init };
});
