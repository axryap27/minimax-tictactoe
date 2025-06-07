import React, { useState, useEffect } from "react";
import "./styles/Game.css";

type Player = "X" | "O";
type GameMode = "pvp" | "pvc";
type Difficulty = "easy" | "medium" | "hard";

function App() {
  const [board, setBoard] = useState<Array<Player | null>>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [gameMode, setGameMode] = useState<GameMode>("pvp");
  const [winner, setWinner] = useState<Player | "tie" | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player>("X");
  const [computerSymbol, setComputerSymbol] = useState<Player>("O");
  const [showSymbolSelector, setShowSymbolSelector] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

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

  const minimax = (
    squares: Array<Player | null>,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number
  ): number => {
    const winner = calculateWinner(squares);
    if (winner === computerSymbol) return 10 - depth;
    if (winner === playerSymbol) return depth - 10;
    if (!squares.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = computerSymbol;
          const score = minimax(squares, depth + 1, false, alpha, beta);
          squares[i] = null;
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          squares[i] = playerSymbol;
          const score = minimax(squares, depth + 1, true, alpha, beta);
          squares[i] = null;
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, bestScore);
          if (beta <= alpha) break;
        }
      }
      return bestScore;
    }
  };

  const getComputerMove = (squares: Array<Player | null>): number => {
    switch (difficulty) {
      case "easy":
        // Completely random moves
        const availableMoves = squares
          .map((square, index) => (square === null ? index : null))
          .filter((index): index is number => index !== null);
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];

      case "medium":
        // 70% chance to use simple logic, 30% random
        if (Math.random() < 0.7) {
          // Try to win
          const winningMove = findWinningMove(squares, computerSymbol);
          if (winningMove !== null) return winningMove;

          // Block player's winning move
          const blockingMove = findWinningMove(squares, playerSymbol);
          if (blockingMove !== null) return blockingMove;

          // Take center if available
          if (squares[4] === null) return 4;
        }
        // Fall through to random move
        const mediumMoves = squares
          .map((square, index) => (square === null ? index : null))
          .filter((index): index is number => index !== null);
        const mediumRandomIndex = Math.floor(
          Math.random() * mediumMoves.length
        );
        return mediumMoves[mediumRandomIndex];

      case "hard":
        // Try to win
        const hardWinningMove = findWinningMove(squares, computerSymbol);
        if (hardWinningMove !== null) return hardWinningMove;

        // Block player's winning move
        const hardBlockingMove = findWinningMove(squares, playerSymbol);
        if (hardBlockingMove !== null) return hardBlockingMove;

        // Use minimax to find the best move
        let bestScore = -Infinity;
        let bestMove = -1;
        const hardMoves = squares
          .map((square, index) => (square === null ? index : null))
          .filter((index): index is number => index !== null);

        for (const move of hardMoves) {
          squares[move] = computerSymbol;
          const score = minimax(squares, 0, false, -Infinity, Infinity);
          squares[move] = null;
          if (score > bestScore) {
            bestScore = score;
            bestMove = move;
          }
        }
        return bestMove;
    }
  };

  const makeComputerMove = () => {
    if (gameMode === "pvc" && currentPlayer === computerSymbol && !winner) {
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
    if (gameMode === "pvp" || currentPlayer === playerSymbol) {
      handleMove(index);
    }
  };

  useEffect(() => {
    if (gameMode === "pvc" && currentPlayer === computerSymbol && !winner) {
      const timer = setTimeout(makeComputerMove, 500); // Add a small delay for better UX
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameStarted(false);
    // Reset player's symbol choice and show symbol selector after each game in PvC mode
    if (gameMode === "pvc") {
      setPlayerSymbol("X");
      setComputerSymbol("O");
      setShowSymbolSelector(true);
    }
  };

  const handleGameModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    resetGame();
    if (mode === "pvc") {
      setShowSymbolSelector(true);
    } else {
      setShowSymbolSelector(false);
      setPlayerSymbol("X");
      setComputerSymbol("O");
      setGameStarted(true);
    }
  };

  const handleSymbolSelect = (symbol: Player) => {
    setPlayerSymbol(symbol);
    setComputerSymbol(symbol === "X" ? "O" : "X");
    setShowSymbolSelector(false);
    setGameStarted(true);
    // Don't call resetGame here as it would create an infinite loop
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
  };

  // Add effect to make computer move first when player is O
  useEffect(() => {
    if (
      gameMode === "pvc" &&
      playerSymbol === "O" &&
      currentPlayer === "X" &&
      !winner &&
      gameStarted
    ) {
      const timer = setTimeout(makeComputerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [gameMode, playerSymbol, currentPlayer, winner, gameStarted]);

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const renderCell = (index: number) => (
    <button
      className={`cell ${board[index]?.toLowerCase() || ""}`}
      onClick={() => handleClick(index)}
      disabled={
        !!winner || (gameMode === "pvc" && currentPlayer === computerSymbol)
      }
    >
      {board[index]}
    </button>
  );

  const getStatus = () => {
    if (winner === "tie") return "Game ended in a tie!";
    if (winner) return `Player ${winner} wins!`;
    if (gameMode === "pvc" && currentPlayer === computerSymbol)
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
              onClick={() => handleGameModeSelect("pvp")}
            >
              Player vs Player
            </button>
            <button
              className={`mode-button ${gameMode === "pvc" ? "active" : ""}`}
              onClick={() => handleGameModeSelect("pvc")}
            >
              Player vs Computer
            </button>
          </div>
        </div>

        {gameMode === "pvc" && (
          <div className="difficulty-selector">
            <h2>Select Difficulty</h2>
            <div className="difficulty-buttons">
              <button
                className={`difficulty-button ${
                  difficulty === "easy" ? "active" : ""
                }`}
                onClick={() => handleDifficultySelect("easy")}
              >
                Easy
              </button>
              <button
                className={`difficulty-button ${
                  difficulty === "medium" ? "active" : ""
                }`}
                onClick={() => handleDifficultySelect("medium")}
              >
                Medium
              </button>
              <button
                className={`difficulty-button ${
                  difficulty === "hard" ? "active" : ""
                }`}
                onClick={() => handleDifficultySelect("hard")}
              >
                Hard
              </button>
            </div>
          </div>
        )}

        {showSymbolSelector && (
          <div className="symbol-selector">
            <h2>Choose Your Symbol</h2>
            <div className="symbol-buttons">
              <button
                className="symbol-button"
                onClick={() => handleSymbolSelect("X")}
              >
                X
              </button>
              <button
                className="symbol-button"
                onClick={() => handleSymbolSelect("O")}
              >
                O
              </button>
            </div>
          </div>
        )}

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
