export type Player = 'X' | 'O' | null;
export type Board = Player[][];
export type GameMode = '1' | '2';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  isTie: boolean;
  gameMode: GameMode;
} 