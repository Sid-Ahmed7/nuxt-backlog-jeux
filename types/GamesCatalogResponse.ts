import type { Game } from "./Game";



export interface GamesCatalogResponse {
    games: Game[];
    totalCount: number;
    }