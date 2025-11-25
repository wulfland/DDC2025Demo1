# Connect4 - Technical Specifications for Developers

## Technology Stack Recommendations

### Frontend Framework Options
1. **React Native** (Recommended)
   - Cross-platform (iOS + Android)
   - Large community and ecosystem
   - Good performance with proper optimization
   - Excellent animation libraries (Reanimated 2)

2. **Flutter**
   - High performance
   - Beautiful default UI
   - Single codebase
   - Excellent animation support

3. **Native Development**
   - Swift/SwiftUI (iOS)
   - Kotlin/Jetpack Compose (Android)
   - Best performance
   - Platform-specific optimizations

### State Management
- **React Native:** Redux Toolkit or Zustand
- **Flutter:** Provider or Riverpod
- **Native:** SwiftUI State / Jetpack Compose State

## Architecture

### Recommended Pattern: MVVM (Model-View-ViewModel)

```
┌─────────────────┐
│      View       │ ← User Interface (React Components/Flutter Widgets)
│   (Screens)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   ViewModel     │ ← Business Logic & State
│   (Hooks/BLoC)  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│     Model       │ ← Data Models & Game Logic
│  (Game Engine)  │
└─────────────────┘
```

## Core Components

### 1. Game State Model

```typescript
interface GameState {
  board: CellState[][];           // 6x7 grid
  currentPlayer: Player;          // 'red' | 'yellow'
  gameStatus: GameStatus;         // 'playing' | 'won' | 'draw'
  winner: Player | null;
  winningCells: Position[] | null;
  scores: Score;
  moveHistory: Move[];
  canUndo: boolean;
}

interface CellState {
  player: Player | null;
  row: number;
  column: number;
}

interface Position {
  row: number;
  column: number;
}

interface Score {
  red: number;
  yellow: number;
}

interface Move {
  player: Player;
  column: number;
  row: number;
  timestamp: number;
}

type Player = 'red' | 'yellow';
type GameStatus = 'playing' | 'won' | 'draw';
```

### 2. Game Engine (Core Logic)

**File:** `gameEngine.ts` or `game_engine.dart`

```typescript
class GameEngine {
  private board: CellState[][];
  private readonly ROWS = 6;
  private readonly COLS = 7;
  
  // Initialize empty board
  constructor() {
    this.board = this.createEmptyBoard();
  }
  
  // Create 6x7 empty grid
  createEmptyBoard(): CellState[][] {
    return Array(this.ROWS).fill(null).map((_, row) =>
      Array(this.COLS).fill(null).map((_, col) => ({
        player: null,
        row,
        column: col
      }))
    );
  }
  
  // Check if column has space
  isValidMove(column: number): boolean {
    return this.board[0][column].player === null;
  }
  
  // Get lowest available row in column
  getLowestRow(column: number): number | null {
    for (let row = this.ROWS - 1; row >= 0; row--) {
      if (this.board[row][column].player === null) {
        return row;
      }
    }
    return null;
  }
  
  // Place piece in column
  makeMove(column: number, player: Player): Position | null {
    if (!this.isValidMove(column)) return null;
    
    const row = this.getLowestRow(column);
    if (row === null) return null;
    
    this.board[row][column].player = player;
    return { row, column };
  }
  
  // Check for winner after move
  checkWin(lastMove: Position, player: Player): Position[] | null {
    const directions = [
      { dr: 0, dc: 1 },   // Horizontal
      { dr: 1, dc: 0 },   // Vertical
      { dr: 1, dc: 1 },   // Diagonal /
      { dr: 1, dc: -1 }   // Diagonal \
    ];
    
    for (const dir of directions) {
      const line = this.getLine(lastMove, dir, player);
      if (line.length >= 4) {
        return line.slice(0, 4); // Return winning 4 cells
      }
    }
    
    return null;
  }
  
  // Get continuous line of pieces in direction
  private getLine(start: Position, direction: {dr: number, dc: number}, player: Player): Position[] {
    const line: Position[] = [start];
    
    // Check forward direction
    let r = start.row + direction.dr;
    let c = start.column + direction.dc;
    while (this.isInBounds(r, c) && this.board[r][c].player === player) {
      line.push({ row: r, column: c });
      r += direction.dr;
      c += direction.dc;
    }
    
    // Check backward direction
    r = start.row - direction.dr;
    c = start.column - direction.dc;
    while (this.isInBounds(r, c) && this.board[r][c].player === player) {
      line.unshift({ row: r, column: c });
      r -= direction.dr;
      c -= direction.dc;
    }
    
    return line;
  }
  
  // Check if board is full (draw)
  isBoardFull(): boolean {
    return this.board[0].every(cell => cell.player !== null);
  }
  
  // Check if position is within bounds
  private isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.ROWS && col >= 0 && col < this.COLS;
  }
  
  // Get current board state (immutable copy)
  getBoardState(): CellState[][] {
    return JSON.parse(JSON.stringify(this.board));
  }
  
  // Reset board
  reset(): void {
    this.board = this.createEmptyBoard();
  }
}
```

### 3. Game Controller/ViewModel

**File:** `gameController.ts` or `game_controller.dart`

```typescript
class GameController {
  private engine: GameEngine;
  private state: GameState;
  private listeners: ((state: GameState) => void)[] = [];
  
  constructor() {
    this.engine = new GameEngine();
    this.state = this.getInitialState();
  }
  
  // Initialize game state
  private getInitialState(): GameState {
    return {
      board: this.engine.getBoardState(),
      currentPlayer: 'red',
      gameStatus: 'playing',
      winner: null,
      winningCells: null,
      scores: { red: 0, yellow: 0 },
      moveHistory: [],
      canUndo: false
    };
  }
  
  // Handle player move
  placePiece(column: number): boolean {
    if (this.state.gameStatus !== 'playing') return false;
    if (!this.engine.isValidMove(column)) return false;
    
    const position = this.engine.makeMove(column, this.state.currentPlayer);
    if (!position) return false;
    
    // Record move
    this.state.moveHistory.push({
      player: this.state.currentPlayer,
      column,
      row: position.row,
      timestamp: Date.now()
    });
    this.state.canUndo = true;
    
    // Check for win
    const winningLine = this.engine.checkWin(position, this.state.currentPlayer);
    if (winningLine) {
      this.handleWin(winningLine);
    } else if (this.engine.isBoardFull()) {
      this.handleDraw();
    } else {
      this.switchPlayer();
    }
    
    this.updateState();
    return true;
  }
  
  // Handle win condition
  private handleWin(winningCells: Position[]): void {
    this.state.gameStatus = 'won';
    this.state.winner = this.state.currentPlayer;
    this.state.winningCells = winningCells;
    this.state.scores[this.state.currentPlayer]++;
    this.state.canUndo = false;
  }
  
  // Handle draw condition
  private handleDraw(): void {
    this.state.gameStatus = 'draw';
    this.state.canUndo = false;
  }
  
  // Switch current player
  private switchPlayer(): void {
    this.state.currentPlayer = this.state.currentPlayer === 'red' ? 'yellow' : 'red';
  }
  
  // Undo last move
  undoLastMove(): boolean {
    if (!this.state.canUndo || this.state.moveHistory.length === 0) {
      return false;
    }
    
    const lastMove = this.state.moveHistory.pop()!;
    this.engine.makeMove(lastMove.column, null as any); // Remove piece
    this.state.currentPlayer = lastMove.player;
    this.state.canUndo = false;
    this.updateState();
    return true;
  }
  
  // Start new game (preserve scores)
  newGame(): void {
    this.engine.reset();
    const startingPlayer = this.getAlternatingStartPlayer();
    this.state = {
      ...this.getInitialState(),
      scores: this.state.scores, // Preserve scores
      currentPlayer: startingPlayer
    };
    this.updateState();
  }
  
  // Restart current game (same starting player)
  restartGame(): void {
    const startingPlayer = this.state.moveHistory.length > 0 
      ? this.state.moveHistory[0].player 
      : 'red';
    this.engine.reset();
    this.state = {
      ...this.getInitialState(),
      scores: this.state.scores,
      currentPlayer: startingPlayer
    };
    this.updateState();
  }
  
  // Reset scores
  resetScores(): void {
    this.state.scores = { red: 0, yellow: 0 };
    this.updateState();
  }
  
  // Get alternating start player
  private getAlternatingStartPlayer(): Player {
    const totalGames = this.state.scores.red + this.state.scores.yellow;
    return totalGames % 2 === 0 ? 'red' : 'yellow';
  }
  
  // Subscribe to state changes
  subscribe(listener: (state: GameState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  // Notify listeners of state change
  private updateState(): void {
    this.state.board = this.engine.getBoardState();
    this.listeners.forEach(listener => listener(this.state));
  }
  
  // Get current state
  getState(): GameState {
    return { ...this.state };
  }
}
```

## UI Components Structure

### Component Hierarchy
```
App
├── GameScreen
│   ├── Header
│   │   ├── MenuButton
│   │   ├── Title
│   │   └── SettingsButton
│   ├── ScoreDisplay
│   ├── GameBoard
│   │   ├── BoardContainer
│   │   ├── Cell (42 instances: 6x7)
│   │   ├── Piece (dynamic)
│   │   └── ColumnPreview (dynamic)
│   ├── TurnIndicator
│   └── ControlPanel
│       ├── UndoButton
│       ├── RestartButton
│       └── NewGameButton
├── WinModal
├── DrawModal
└── SettingsPanel
```

### Key Component Specs

#### GameBoard Component
```typescript
interface GameBoardProps {
  board: CellState[][];
  onColumnTap: (column: number) => void;
  winningCells: Position[] | null;
  isInteractive: boolean;
}

// Responsibilities:
// - Render 7x6 grid
// - Handle touch events
// - Show piece drop animations
// - Highlight winning cells
// - Show column preview on hover/touch
```

#### Cell Component
```typescript
interface CellProps {
  row: number;
  column: number;
  player: Player | null;
  isWinning: boolean;
  onPress: () => void;
}

// Responsibilities:
// - Render single cell
// - Show piece if occupied
// - Highlight if part of winning line
// - Handle touch events
```

#### Piece Component
```typescript
interface PieceProps {
  player: Player;
  isWinning: boolean;
  animateEntry: boolean;
}

// Responsibilities:
// - Render colored circle
// - Animate drop (if new)
// - Pulse/glow if winning
// - Apply patterns if color-blind mode
```

## Animation Specifications

### Piece Drop Animation
```typescript
// React Native with Reanimated
const dropPiece = (targetRow: number) => {
  const startY = -cellSize;
  const endY = targetRow * cellSize;
  const distance = endY - startY;
  const duration = Math.min(400, 200 + distance * 0.5);
  
  return {
    translateY: {
      from: startY,
      to: endY,
      duration: duration,
      easing: Easing.in(Easing.cubic)
    }
  };
};
```

### Win Pulse Animation
```typescript
const winPulse = {
  scale: {
    from: 1,
    to: 1.15,
    duration: 500,
    repeat: true,
    reverse: true,
    easing: Easing.inOut(Easing.ease)
  },
  opacity: {
    from: 1,
    to: 0.7,
    duration: 500,
    repeat: true,
    reverse: true
  }
};
```

## Performance Optimization

### Best Practices
1. **Memoization:** Use React.memo / useMemo for board cells
2. **Virtualization:** Not needed (only 42 cells)
3. **Animation:** Use native driver for transforms/opacity
4. **Avoid Re-renders:** Optimize state updates
5. **Image Optimization:** Use vector graphics (SVG)

### Performance Metrics
```typescript
// Monitor these metrics
const performanceTargets = {
  touchToResponse: 50,      // ms
  frameRate: 60,            // fps
  animationDuration: 400,   // ms
  winDetection: 100,        // ms
  appLaunch: 2000,          // ms
  memoryUsage: 100          // MB
};
```

## Testing Requirements

### Unit Tests
- Game engine logic (100% coverage required)
- Win detection algorithm
- Board state management
- Move validation
- Undo functionality

### Integration Tests
- Complete game flow
- Score tracking across games
- State persistence
- Orientation changes

### UI Tests
- Button interactions
- Column selection
- Animations complete
- Modal displays
- Error states

### Example Test Cases
```typescript
describe('GameEngine', () => {
  test('detects horizontal win', () => {
    const engine = new GameEngine();
    engine.makeMove(0, 'red');
    engine.makeMove(1, 'red');
    engine.makeMove(2, 'red');
    const position = engine.makeMove(3, 'red');
    const winning = engine.checkWin(position!, 'red');
    expect(winning).toHaveLength(4);
  });
  
  test('detects full column', () => {
    const engine = new GameEngine();
    for (let i = 0; i < 6; i++) {
      engine.makeMove(0, i % 2 === 0 ? 'red' : 'yellow');
    }
    expect(engine.isValidMove(0)).toBe(false);
  });
  
  test('detects draw', () => {
    const engine = new GameEngine();
    // Fill board without winner
    // ... test logic
    expect(engine.isBoardFull()).toBe(true);
  });
});
```

## Build & Deployment

### Development Setup
```bash
# React Native
npm install
npm run ios     # iOS simulator
npm run android # Android emulator

# Flutter
flutter pub get
flutter run
```

### Build Commands
```bash
# React Native
npm run build:ios
npm run build:android

# Flutter
flutter build ios --release
flutter build appbundle --release
```

### CI/CD Pipeline
1. Lint code
2. Run unit tests
3. Run integration tests
4. Build release
5. Run UI tests
6. Deploy to stores

## Accessibility Implementation

### Screen Reader Support
```typescript
// Example accessibility labels
<TouchableOpacity
  accessible={true}
  accessibilityLabel={`Column ${column + 1}, ${
    isOccupied ? 'occupied' : 'empty'
  }`}
  accessibilityRole="button"
  accessibilityHint="Tap to place your piece"
/>
```

### Haptic Feedback
```typescript
import { Haptics } from 'react-native';

const provideFeedback = (type: 'success' | 'warning' | 'error') => {
  if (Platform.OS === 'ios') {
    if (type === 'success') Haptics.notificationAsync('success');
    if (type === 'warning') Haptics.notificationAsync('warning');
    if (type === 'error') Haptics.notificationAsync('error');
  } else {
    Haptics.impactAsync(type === 'error' ? 'heavy' : 'light');
  }
};
```

## State Persistence

### Save Game State
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveGameState = async (state: GameState) => {
  try {
    await AsyncStorage.setItem('gameState', JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save game state', error);
  }
};

const loadGameState = async (): Promise<GameState | null> => {
  try {
    const data = await AsyncStorage.getItem('gameState');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load game state', error);
    return null;
  }
};
```

## Deployment Checklist

- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] Performance benchmarks met
- [ ] Accessibility audit passed
- [ ] Tested on multiple tablet sizes
- [ ] Tested in both orientations
- [ ] Memory leaks checked
- [ ] Battery usage optimized
- [ ] App icons created (all sizes)
- [ ] Screenshots for store listings
- [ ] Privacy policy created
- [ ] Terms of service created
- [ ] Store listings written
- [ ] Beta testing completed
- [ ] Analytics integrated (optional)
- [ ] Crash reporting configured

## Development Timeline Estimate

| Phase | Duration | Tasks |
|-------|----------|-------|
| Setup | 1 day | Project scaffolding, dependencies |
| Game Engine | 2-3 days | Core logic, tests |
| UI Components | 3-4 days | Board, pieces, controls |
| Animations | 2-3 days | Drop, win, transitions |
| State Management | 2 days | Controller, persistence |
| Polish | 2-3 days | Accessibility, performance |
| Testing | 2-3 days | Unit, integration, UI tests |
| Bug Fixes | 2-3 days | Issue resolution |
| **Total** | **16-24 days** | **Full development cycle** |

## Code Quality Standards

- **Test Coverage:** Minimum 80% for game logic
- **Linting:** ESLint / Dart analyzer with strict rules
- **Type Safety:** TypeScript strict mode / Dart strong mode
- **Documentation:** JSDoc / DartDoc for public APIs
- **Code Review:** All PRs require review
- **Performance:** Meet all performance targets
- **Accessibility:** WCAG 2.1 AA compliance
