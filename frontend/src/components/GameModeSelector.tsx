import React from "react";
import { GameMode } from "../types";

interface GameModeSelectorProps {
  currentMode: GameMode;
  onModeChange: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Game Mode</h2>
      <div className="flex gap-4">
        <button
          onClick={() => onModeChange("1")}
          className={`
            flex-1 py-2 px-4 rounded-lg transition-colors
            ${
              currentMode === "1"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          Two Players
        </button>
        <button
          onClick={() => onModeChange("2")}
          className={`
            flex-1 py-2 px-4 rounded-lg transition-colors
            ${
              currentMode === "2"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          vs Computer
        </button>
      </div>
    </div>
  );
};

export default GameModeSelector;
