import type { Game } from "./Game";
import type { UserGame } from "./UserGame";

export interface UserProfile {
    id: string; 
    username: string;
    avatarUrl: string;
    bannerUrl: string;
    bio: string;
    game: UserGame[];
  }
  