import React, { useState, useEffect } from "react";
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

  const findWinningMove = (
    squares: Array<Player | null>,
    player: Player
  ): number | null => {
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
      if (squares[a] === player && squares[b] === player && squares[c] === null)
        return c;
      if (squares[a] === player && squares[c] === player && squares[b] === null)
        return b;
      if (squares[b] === player && squares[c] === player && squares[a] === null)
        return a;
    }
    return null;
  };

  const getComputerMove = (squares: Array<Player | null>): number => {
    // 70% chance to make a strategic move
    if (Math.random() < 0.7) {
      // Try to win
      const winningMove = findWinningMove(squares, "O");
      if (winningMove !== null) return winningMove;

      // Block player's winning move
      const blockingMove = findWinningMove(squares, "X");
      if (blockingMove !== null) return blockingMove;

      // Take center if available
      if (squares[4] === null) return 4;
    }

    // 30% chance to make a random move, or if no strategic move was found
    const availableMoves = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index): index is number => index !== null);

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  };

  const makeComputerMove = () => {
    if (gameMode === "pvc" && currentPlayer === "O" && !winner) {
      const computerMove = getComputerMove(board);
      handleMove(computerMove);
    }
  };

  const handleMove = (index: number) => {
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

  const handleClick = (index: number) => {
    if (gameMode === "pvp" || currentPlayer === "X") {
      handleMove(index);
    }
  };

  useEffect(() => {
    if (gameMode === "pvc" && currentPlayer === "O" && !winner) {
      const timer = setTimeout(makeComputerMove, 500); // Add a small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  const renderCell = (index: number) => (
    <button
      className={`cell ${board[index]?.toLowerCase() || ""}`}
      onClick={() => handleClick(index)}
      disabled={!!winner || (gameMode === "pvc" && currentPlayer === "O")}
    >
      {board[index]}
    </button>
  );

  const getStatus = () => {
    if (winner === "tie") return "Game ended in a tie!";
    if (winner) return `Player ${winner} wins!`;
    if (gameMode === "pvc" && currentPlayer === "O")
      return "Computer is thinking...";
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
              onClick={() => {
                setGameMode("pvp");
                resetGame();
              }}
            >
              Player vs Player
            </button>
            <button
              className={`mode-button ${gameMode === "pvc" ? "active" : ""}`}
              onClick={() => {
                setGameMode("pvc");
                resetGame();
              }}
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
