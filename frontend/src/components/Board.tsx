import React from "react";
import { Board as BoardType, Player } from "../types";

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  currentPlayer: Player;
}

const BoardComponent: React.FC<BoardProps> = ({
  board,
  onCellClick,
  currentPlayer,
}) => {
  return (
    <div className="grid grid-cols-3 gap-2 aspect-square">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            className={`
              aspect-square text-4xl font-bold rounded-lg
              ${cell ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100"}
              ${
                cell === "X"
                  ? "text-primary"
                  : cell === "O"
                  ? "text-secondary"
                  : ""
              }
              transition-colors duration-200
              flex items-center justify-center
              border-2 border-gray-200
            `}
            disabled={!!cell}
          >
            {cell}
          </button>
        ))
      )}
    </div>
  );
};

export default BoardComponent;
