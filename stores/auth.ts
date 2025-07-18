import { defineStore } from "pinia";
import type { User } from "@/types/AuthUser";
import type { Database } from "@/supabase";
import type { RegisterData } from "~/types/RegisterData";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient<Database>();
  const supabaseUser = useSupabaseUser()

  const user = ref<User | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(true);
  const messageSuccess = ref<string | null>(null);

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
    isLoading.value = true;
    messageSuccess.value = null;
    error.value = null;

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        error.value = loginError.message;
        return error.value;
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
            return error.value;
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
        messageSuccess.value = "Connexion réussie !";
        return messageSuccess.value;
      }
          error.value = "Utilisateur non trouvé ou mot de passe incorrect.";
          return error.value;
    } catch (err) {
      error.value = "Erreur lors de la connexion : " + (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (userData: RegisterData) => {
   
    const { username, email, password } = userData;
    isLoading.value = true;
    error.value = null;
    messageSuccess.value = null;

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
    })

    if (signUpError) {
      error.value = signUpError.message;
      return error.value;
    }     
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        error.value = signInError.message;
        return error.value;
      }

     messageSuccess.value = "Inscription réussie !";
     return messageSuccess.value;

  } catch (err) {
    error.value = "Erreur lors de l'inscritpion : " + (err as Error).message;
    return error.value;
  } finally {
    isLoading.value = false;
  }
}


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

  return { user, error, messageSuccess, register, login, logout, isLoading, init };
});
