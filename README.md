# Tic Tac Toe Game

A modern, interactive Tic Tac Toe game built with React and TypeScript, featuring multiple game modes and difficulty levels.

## Features

### Game Modes

- **Player vs Player (PvP)**: Classic two-player gameplay
- **Player vs Computer (PvC)**: Play against an AI opponent with three difficulty levels

### Difficulty Levels (PvC Mode)

- **Easy**: Computer makes completely random moves
- **Medium**: Computer uses basic strategy 70% of the time (winning moves, blocking moves, center position) and random moves 30% of the time
- **Hard**: Computer uses the minimax algorithm with alpha-beta pruning for unbeatable play

### Game Features

- Clean, modern UI with smooth animations
- Responsive design that works on desktop and mobile
- Real-time game status updates
- Automatic computer moves with visual feedback
- Symbol selection (X or O) for PvC mode
- Game reset functionality

## Technologies Used

- **React 18**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **CSS3**: Modern styling with gradients and animations
- **Minimax Algorithm**: AI decision-making for hard difficulty

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ktpCapstone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to play the game

## How to Play

### Player vs Player Mode

1. Select "Player vs Player" from the game mode options
2. Players take turns clicking on empty cells to place their X or O
3. The first player to get three in a row (horizontally, vertically, or diagonally) wins
4. If all cells are filled without a winner, the game ends in a tie

### Player vs Computer Mode

1. Select "Player vs Computer" from the game mode options
2. Choose your preferred difficulty level:
   - **Easy**: Best for beginners or casual play
   - **Medium**: Balanced challenge with some strategic play
   - **Hard**: Maximum challenge - the computer is unbeatable
3. Select your symbol (X or O)
4. Play against the computer! X always goes first

## Game Rules

- Players take turns placing their symbol (X or O) on the 3x3 grid
- The first player to get three of their symbols in a row wins
- Rows can be horizontal, vertical, or diagonal
- If all nine cells are filled without a winner, the game is a tie
- In PvC mode, X always goes first regardless of which symbol you choose

## Technical Implementation

### AI Algorithm (Hard Difficulty)

The hard difficulty uses the minimax algorithm with alpha-beta pruning:

```typescript
const minimax = (
  squares: Array<Player | null>,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number => {
  // Recursive evaluation of all possible game states
  // Returns optimal score for the current player
};
```

**Key Features:**

- **Depth-first search**: Evaluates all possible future moves
- **Alpha-beta pruning**: Optimizes search by cutting off irrelevant branches
- **Depth consideration**: Prefers winning in fewer moves
- **Unbeatable play**: Always makes the optimal move

### State Management

The game uses React hooks for state management:

- `board`: Current game board state
- `currentPlayer`: Active player (X or O)
- `gameMode`: Selected game mode (pvp/pvc)
- `difficulty`: AI difficulty level (easy/medium/hard)
- `winner`: Game winner or tie status

## File Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main game component
│   ├── styles/
│   │   └── Game.css     # Game styling
│   └── index.tsx        # App entry point
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## Customization

### Styling

The game uses CSS custom properties and modern styling techniques. You can customize:

- Colors: Modify the CSS variables in `Game.css`
- Animations: Adjust transition durations and effects
- Layout: Modify grid and flexbox properties

### Game Logic

The game logic is modular and easily extensible:

- Add new difficulty levels by extending the `Difficulty` type
- Modify AI behavior by updating the `getComputerMove` function
- Add new game modes by extending the `GameMode` type

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Built with React and TypeScript
- AI implementation inspired by classic game theory algorithms
- UI design follows modern web development best practices

---

**Enjoy playing Tic Tac Toe!** 🎮
