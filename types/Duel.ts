import type { Game } from './Game'

export interface Duel {
  id: string
  game1: Game
  game2: Game
  votes?: {
    game1Votes: number
    game2Votes: number
  }
  createdAt: Date
}

export interface DuelResult {
  winnerId: number
  loserId: number
  timestamp: Date
}

export interface DuelStats {
  totalDuels: number
  gamesStats: {
    [gameId: number]: {
      wins: number
      losses: number
      winRate: number
    }
  }
} 