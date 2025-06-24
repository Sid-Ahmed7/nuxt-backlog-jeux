import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { User } from "@/types/AuthUser";
import type { Database } from "@/supabase";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient<Database>();
  const supabaseUser = useSupabaseUser();

  const user = ref<User | null>(null);
  const error = ref<string | null>(null);

  const login = async (email: string, password: string) => {
    error.value = null;
    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        error.value = loginError.message;
        user.value = null;
        return;
      }
      const authUser = data.user;

      if (authUser) {
        const { data: userProfile, error: profilError } = await supabase
          .from("user_profiles")
          .select("username")
          .eq("user_id", data.user.id)
          .maybeSingle<{ username: string }>();

        if (!userProfile) {
          const username = authUser.user_metadata.username || "Utilisateur";
          const { error: insertError } = await supabase
            .from("user_profiles")
            .insert([
              {
                user_id: data.user.id,
                username: username,
              },
            ]);

          if (insertError) {
            error.value = insertError.message;
            user.value = null;
            return;
          }
          user.value = {
            id: authUser.id,
            email: authUser.email ? authUser.email : "",
            username,
          };
          if (profilError) {
            error.value = profilError.message;
            user.value = null;
            return;
          }
          user.value = {
            id: authUser.id,
            email: authUser.email ?? "",
            username: userProfile.username,
          };
        }
      }
    } catch (err) {
      error.value = "Erreur lors de la connexion : " + (err as Error).message;
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

  watch(supabaseUser, async (newUser) => {
    if (newUser) {
      const { data: userProfile } = await supabase
        .from("user_profiles")
        .select("username")
        .eq("user_id", newUser.id)
        .maybeSingle<{ username: string }>();
      user.value = {
        id: newUser.id,
        email: newUser.email ? newUser.email : "",
        username: userProfile?.username,
      };
    } else {
      user.value = null;
    }
  });

  return { user, error, login, logout };
});
