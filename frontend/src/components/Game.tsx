import React, { useState } from "react";
import { GameState, Player, Board, GameMode } from "../types";
import BoardComponent from "./Board";
import GameModeSelector from "./GameModeSelector";

const initialBoard: Board = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: initialBoard,
    currentPlayer: "X",
    winner: null,
    isTie: false,
    gameMode: "1",
  });

  const handleCellClick = (row: number, col: number) => {
    if (gameState.winner || gameState.isTie || gameState.board[row][col]) {
      return;
    }

    const newBoard = gameState.board.map((row) => [...row]);
    newBoard[row][col] = gameState.currentPlayer;

    const winner = checkWinner(newBoard);
    const isTie = !winner && isBoardFull(newBoard);

    setGameState((prev) => ({
      ...prev,
      board: newBoard,
      currentPlayer: prev.currentPlayer === "X" ? "O" : "X",
      winner,
      isTie,
    }));
  };

  const checkWinner = (board: Board): Player => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] &&
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2]
      ) {
        return board[i][0];
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] &&
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i]
      ) {
        return board[0][i];
      }
    }

    // Check diagonals
    if (
      board[0][0] &&
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2]
    ) {
      return board[0][0];
    }
    if (
      board[0][2] &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return board[0][2];
    }

    return null;
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every((row) => row.every((cell) => cell !== null));
  };

  const resetGame = () => {
    setGameState({
      board: initialBoard,
      currentPlayer: "X",
      winner: null,
      isTie: false,
      gameMode: gameState.gameMode,
    });
  };

  const handleGameModeChange = (mode: GameMode) => {
    setGameState((prev) => ({
      ...prev,
      gameMode: mode,
      board: initialBoard,
      currentPlayer: "X",
      winner: null,
      isTie: false,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Tic Tac Toe
        </h1>

        <GameModeSelector
          currentMode={gameState.gameMode}
          onModeChange={handleGameModeChange}
        />

        <div className="mb-6">
          <BoardComponent
            board={gameState.board}
            onCellClick={handleCellClick}
            currentPlayer={gameState.currentPlayer}
          />
        </div>

        <div className="text-center mb-6">
          {gameState.winner ? (
            <p className="text-2xl font-bold text-primary">
              Player {gameState.winner} wins! 🎉
            </p>
          ) : gameState.isTie ? (
            <p className="text-2xl font-bold text-gray-600">It's a tie! 😕</p>
          ) : (
            <p className="text-xl text-gray-700">
              Current Player: {gameState.currentPlayer}
            </p>
          )}
        </div>

        <button
          onClick={resetGame}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Game;
