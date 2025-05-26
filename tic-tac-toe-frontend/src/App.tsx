import React, { useState } from "react";
import "./styles/Game.css";

type Player = "X" | "O";
type GameMode = "pvp" | "pvc";

function App() {
  const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const [winner, setWinner] = useState<Player | "tie" | null>(null);

  const calculateWinner = (squares: Array<Player | null>): Player | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!newBoard.includes(null)) {
      setWinner("tie");
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderCell = (index: number) => (
    <button
      className={`cell ${board[index]?.toLowerCase() || ""}`}
      onClick={() => handleClick(index)}
      disabled={!!winner}
    >
      {board[index]}
    </button>
  );

  const getStatus = () => {
    if (winner === "tie") return "Game ended in a tie!";
    if (winner) return `Player ${winner} wins!`;
    return `Current player: ${currentPlayer}`;
  };

  return (
    <div className="game-container">
      <div className="game-board">
        <h1 className="game-title">Tic Tac Toe</h1>

        <div className="mode-selector">
          <h2>Select Game Mode</h2>
          <div className="mode-buttons">
            <button
              className={`mode-button ${gameMode === "pvp" ? "active" : ""}`}
              onClick={() => setGameMode("pvp")}
            >
              Player vs Player
            </button>
            <button
              className={`mode-button ${gameMode === "pvc" ? "active" : ""}`}
              onClick={() => setGameMode("pvc")}
            >
              Player vs Computer
            </button>
          </div>
        </div>

        <div className="board-grid">
          {Array(9)
            .fill(null)
            .map((_, index) => renderCell(index))}
        </div>

        <div
          className={`game-status ${
            winner ? (winner === "tie" ? "tie" : "win") : ""
          }`}
        >
          {getStatus()}
        </div>

        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
