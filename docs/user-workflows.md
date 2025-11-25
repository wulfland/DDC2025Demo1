# Connect4 - User Workflows

## Overview
This document describes the key user workflows for the Connect4 tablet game, ensuring smooth and intuitive user experiences.

## Primary Workflows

### Workflow 1: Starting a New Game Session

**Actors:** Two players with tablet device

**Preconditions:** App installed on tablet

**Steps:**
1. Player picks up tablet
2. Taps Connect4 app icon
3. App launches directly to game board (< 2 seconds)
4. Game board appears with empty grid
5. Turn indicator shows "Red's Turn"
6. Players begin playing immediately

**Postconditions:** Game ready for first move, Red player to start

**Success Criteria:**
- Zero friction to start playing
- No login, tutorial, or setup screens
- Game ready in under 3 seconds from app tap

**Error Scenarios:**
- App fails to load: Display error message with retry option
- Device orientation wrong: Auto-rotate or prompt user

---

### Workflow 2: Playing a Standard Game

**Actors:** Two players (Red and Yellow)

**Preconditions:** Game board is active and ready

**Main Flow:**

#### Move Sequence (Red's Turn)
1. Red player reviews board state
2. Red player decides on column
3. Red player taps any cell in desired column
4. System shows column preview (ghost piece)
5. Red player confirms by completing tap
6. Piece drops with animation (400ms)
7. Piece lands in lowest available position
8. System checks for win/draw
   - **If win:** Go to "Win Detection Workflow"
   - **If draw:** Go to "Draw Detection Workflow"
   - **If continue:** Switch to Yellow's turn
9. Turn indicator updates to "Yellow's Turn"

#### Move Sequence (Yellow's Turn)
10. Yellow player reviews board state
11. Yellow player decides on column
12. Yellow player taps any cell in desired column
13. System shows column preview (ghost piece)
14. Yellow player confirms by completing tap
15. Piece drops with animation (400ms)
16. Piece lands in lowest available position
17. System checks for win/draw
   - **If win:** Go to "Win Detection Workflow"
   - **If draw:** Go to "Draw Detection Workflow"
   - **If continue:** Switch to Red's turn
18. Repeat steps 1-17 until game concludes

**Postconditions:** Game concludes with win or draw

**Success Criteria:**
- Turns alternate smoothly
- Each move takes 1-3 seconds
- Win/draw detected immediately
- No confusion about whose turn it is

**Error Scenarios:**
- Full column selected: See "Invalid Move Workflow"
- Accidental tap: See "Undo Move Workflow"

---

### Workflow 3: Win Detection

**Trigger:** Player places piece that creates four-in-a-row

**Steps:**
1. System detects winning condition (< 100ms)
2. Winning four pieces highlight with glow animation
3. Board becomes non-interactive
4. Win celebration animation plays (2 seconds)
5. Winner modal appears:
   - "[Color] Wins!" message
   - Trophy/celebration icon
   - Updated score display
   - "New Game" button (primary)
   - "Close" button (secondary)
6. Player taps "New Game" or "Close"
7. If "New Game": Go to "Starting New Game Workflow"
8. If "Close": Modal dismisses, winning board visible

**Postconditions:** 
- Winner recorded in score
- Board locked until new game started
- Starting player alternates for next game

**Success Criteria:**
- Win detected within 100ms of piece placement
- Winner clearly announced
- Score updated correctly
- Easy to start next game

---

### Workflow 4: Draw Detection

**Trigger:** Board is full with no winner

**Steps:**
1. System detects board is full (last piece placed)
2. System confirms no winner exists
3. Board becomes non-interactive
4. Draw announcement appears:
   - "It's a Draw!" message
   - Handshake or neutral icon
   - Current score displayed (no change)
   - "New Game" button (primary)
   - "Close" button (secondary)
5. Player taps "New Game" or "Close"
6. If "New Game": Go to "Starting New Game Workflow"
7. If "Close": Modal dismisses, full board visible

**Postconditions:**
- No score change
- Board locked until new game started
- Starting player alternates for next game

**Success Criteria:**
- Draw detected immediately
- Clear announcement
- Easy to start next game

---

### Workflow 5: Undo Last Move

**Actors:** Current player who just moved

**Preconditions:** 
- A move was just completed
- Next player hasn't moved yet
- Undo button is active

**Steps:**
1. Player taps "Undo" button
2. System removes last placed piece
3. Removed piece animates upward and fades (300ms)
4. Turn indicator reverts to previous player
5. Undo button becomes disabled (grayed out)
6. Previous player can now make their move again

**Postconditions:**
- Board state reverted to before last move
- Turn returned to previous player
- Undo no longer available until next move

**Success Criteria:**
- Undo available immediately after move
- Clear visual feedback of piece removal
- Only one undo allowed (not multiple)
- Undo disabled after used

**Error Scenarios:**
- Undo pressed after opponent moved: Button disabled, no action
- Undo pressed at game start: Button disabled, no pieces to undo

---

### Workflow 6: Invalid Move Handling

**Trigger:** Player attempts to place piece in full column

**Steps:**
1. Player taps cell in full column
2. System detects column is full
3. Column shakes with animation (300ms)
4. Column border flashes red briefly
5. Haptic warning feedback (if available)
6. Toast message appears: "Column is full!"
7. Message auto-dismisses after 2 seconds
8. Board remains in same state
9. Same player's turn continues

**Postconditions:**
- No change to game state
- Player understands error
- Player can select different column

**Success Criteria:**
- Clear visual feedback
- Error message easy to understand
- No confusion or frustration
- Quick recovery to valid action

---

### Workflow 7: Starting New Game (Mid-Session)

**Actors:** Either player

**Preconditions:** Game in progress or completed

**Steps:**
1. Player taps "New Game" button
2. System clears current board with animation (500ms)
3. All pieces fade out simultaneously
4. Score remains displayed
5. Starting player alternates from previous game
6. Turn indicator updates to new starting player
7. Empty board appears, ready for play
8. New game begins

**Postconditions:**
- Empty board ready for play
- Session score maintained
- Starting player alternated

**Success Criteria:**
- Quick transition (< 1 second)
- Score preserved
- Clear which player starts
- Smooth, polished animation

---

### Workflow 8: Restarting Current Game

**Actors:** Either player

**Preconditions:** Game in progress

**Steps:**
1. Player taps "Restart" button
2. Confirmation modal appears (optional):
   - "Restart current game?"
   - "Yes" and "No" buttons
3. If "No": Modal dismisses, game continues
4. If "Yes": 
   - System clears current board
   - All pieces fade out (500ms)
   - Score remains unchanged
   - Starting player remains same as current game
   - Turn indicator resets to starting player
   - Empty board appears
5. Game begins fresh

**Postconditions:**
- Empty board with same starting player
- Score unchanged
- Undo history cleared

**Success Criteria:**
- Clear distinction from "New Game"
- Same starting player
- Quick execution

**Alternative:** Skip confirmation if game just started (< 2 moves)

---

### Workflow 9: Multi-Game Tournament

**Actors:** Two players playing multiple games

**Preconditions:** App open, first game may or may not be completed

**Steps:**
1. Players complete Game 1
2. Winner announced, score updates (e.g., Red: 1, Yellow: 0)
3. Players tap "New Game"
4. Game 2 begins with Yellow starting (alternated)
5. Players complete Game 2
6. Winner announced, score updates (e.g., Red: 1, Yellow: 1)
7. Players tap "New Game"
8. Game 3 begins with Red starting (alternated)
9. Players complete Game 3
10. Winner announced, score updates (e.g., Red: 2, Yellow: 1)
11. Players continue or stop as desired
12. Score persists throughout session

**Postconditions:**
- Score tracks all games in session
- Starting player alternates each game
- Players can see win/loss record

**Success Criteria:**
- Score accurately tracks wins
- Starting player alternates automatically
- Easy to play many games in a row
- Score remains visible at all times

---

### Workflow 10: Score Reset

**Actors:** Either player

**Preconditions:** Scores exist from previous games

**Steps:**
1. Player opens Settings/Menu
2. Player taps "Reset Score" option
3. Confirmation dialog appears:
   - "Reset all scores to 0?"
   - Current scores displayed
   - "Reset" and "Cancel" buttons
4. If "Cancel": Dialog dismisses, scores unchanged
5. If "Reset":
   - Both scores set to 0
   - Update displayed immediately
   - Confirmation message: "Scores reset"
   - Dialog dismisses
6. Menu closes, return to game

**Postconditions:**
- Both scores at 0
- Game state unchanged
- Ready to track new tournament

**Success Criteria:**
- Clear confirmation before reset
- Immediate visual update
- No accidental resets

---

## Edge Case Workflows

### Workflow E1: App Backgrounding During Game

**Trigger:** User switches to another app or locks device

**Steps:**
1. User switches away from Connect4 app
2. System automatically saves current game state
3. App moves to background
4. (Time passes)
5. User returns to Connect4 app
6. App resumes to exact same game state
7. Turn indicator still shows correct player
8. Score preserved
9. No loading or splash screen
10. Game continues seamlessly

**Success Criteria:**
- Zero data loss
- Seamless resume experience
- No interruption to gameplay

---

### Workflow E2: Orientation Change During Game

**Trigger:** User rotates tablet

**Steps:**
1. User rotates device
2. System detects orientation change
3. If animation in progress: Complete animation first
4. Layout smoothly transitions (300ms)
5. Game board resizes proportionally
6. All UI elements reposition
7. Game state fully preserved
8. No visual glitches or jumps
9. Game continues normally

**Success Criteria:**
- Smooth transition
- No state loss
- No layout breaks
- Playable in both orientations

---

### Workflow E3: First-Time App Launch

**Trigger:** User opens app for first time

**Steps:**
1. App launches
2. (Optional) Brief splash screen (< 1 second)
3. Quick tips overlay appears (dismissible):
   - "Tap any column to drop your piece"
   - "Get four in a row to win!"
   - "Tap anywhere to start"
4. User taps anywhere
5. Tips dismiss
6. Game board appears ready to play
7. Normal gameplay begins

**Alternative:** Skip tips entirely, rely on intuitive design

**Success Criteria:**
- Minimal onboarding
- Tips optional and dismissible
- Fast time-to-play (< 5 seconds)

---

## Workflow Summary

| Workflow | Frequency | Priority | Complexity |
|----------|-----------|----------|------------|
| Starting New Game Session | Every session | Critical | Low |
| Playing Standard Game | Every game | Critical | Medium |
| Win Detection | ~50% of games | Critical | Low |
| Draw Detection | ~10% of games | High | Low |
| Undo Last Move | Occasional | Medium | Low |
| Invalid Move Handling | Occasional | Medium | Low |
| Starting New Game | Every game | Critical | Low |
| Restarting Current Game | Rare | Low | Low |
| Multi-Game Tournament | Common | High | Low |
| Score Reset | Rare | Low | Low |
| App Backgrounding | Common | High | Medium |
| Orientation Change | Occasional | Medium | Medium |
| First-Time Launch | Once | Medium | Low |

## Design Principles Applied

1. **Zero Friction:** Minimize steps between app launch and playing
2. **Clear Feedback:** Every action has immediate visual response
3. **Error Prevention:** Design prevents most errors (full columns obvious)
4. **Error Recovery:** Easy undo for mistakes
5. **Consistency:** Similar actions work the same way throughout
6. **Efficiency:** Support rapid consecutive games
7. **Forgiveness:** Allow undo, confirmation on destructive actions
8. **Transparency:** Always clear whose turn, what happened, who's winning
