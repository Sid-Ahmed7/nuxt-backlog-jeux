import type { Game } from "./Game";

export interface UserProfile {
    id: string; 
    username: string;
    avatarUrl: string;
    bannerUrl: string;
    bio: string;
    game: Game;
  }
  