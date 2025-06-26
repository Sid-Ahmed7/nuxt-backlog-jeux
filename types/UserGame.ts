import type { Game } from "./Game";
import type { GameStatus } from "./enums";

export interface UserGame {
    game: Game;
    timeSpent?: number
    platform_choose?: string
    status: GameStatus
    started_at?: string 
    ended_at?: string
}