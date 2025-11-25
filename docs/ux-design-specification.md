# Connect4 - UX Design Specification

## Design Philosophy
Create a clean, intuitive, and joyful gaming experience that feels natural on a tablet. The design should disappear into the background, allowing players to focus on the game itself.

## Visual Design System

### Color Palette

#### Primary Game Colors
- **Player 1 (Red):** `#E74C3C` - Warm, vibrant red
- **Player 2 (Yellow):** `#F39C12` - Rich golden yellow
- **Alternative (High Contrast):** Red `#C0392B` / Yellow `#F1C40F`

#### UI Colors
- **Background:** `#ECF0F1` - Light, neutral gray
- **Board:** `#3498DB` - Classic Connect4 blue
- **Grid Lines:** `#2C3E50` - Dark blue-gray (20% opacity)
- **Text Primary:** `#2C3E50` - Dark blue-gray
- **Text Secondary:** `#7F8C8D` - Medium gray
- **Success:** `#27AE60` - Green for wins
- **Error:** `#E74C3C` - Red for errors
- **Disabled:** `#BDC3C7` - Light gray

#### Accessibility Colors (Color-Blind Mode)
- **Player 1:** Red with diagonal stripes pattern
- **Player 2:** Yellow with dots pattern

### Typography
- **Primary Font:** SF Pro (iOS) / Roboto (Android)
- **Headings:** 32-48px, Bold
- **Body Text:** 18-24px, Regular
- **Button Text:** 20px, Medium
- **Score Display:** 28px, Bold

### Spacing System
- **Base Unit:** 8px
- **Small:** 8px
- **Medium:** 16px
- **Large:** 24px
- **XLarge:** 32px
- **XXLarge:** 48px

## Layout Structure

### Landscape Mode (Primary)
```
+----------------------------------------------------+
|  [Menu]              CONNECT 4           [Score]  |
|                                                    |
|                   Red: 3 | Yellow: 2              |
|                                                    |
|              +----------------------+              |
|              |   GAME BOARD 7x6    |              |
|              |                      |              |
|              |   [Grid Layout]      |              |
|              |                      |              |
|              |                      |              |
|              +----------------------+              |
|                                                    |
|              Current Turn: [Red Piece]            |
|                                                    |
|    [Undo]      [Restart]      [New Game]         |
+----------------------------------------------------+
```

### Portrait Mode (Secondary)
```
+---------------------------+
|    [Menu]    CONNECT 4   |
|                           |
|    Red: 3 | Yellow: 2     |
|                           |
|   +-------------------+   |
|   |   GAME BOARD     |   |
|   |      7x6         |   |
|   |                   |   |
|   |   [Grid Layout]   |   |
|   |                   |   |
|   |                   |   |
|   +-------------------+   |
|                           |
| Current Turn: [Red Piece] |
|                           |
|   [Undo]    [Restart]     |
|         [New Game]         |
+---------------------------+
```

## Screen Components

### 1. Header Section
- **Height:** 80px
- **Contents:**
  - Menu button (left): 48x48px icon button
  - Title "CONNECT 4" (center): 36px bold
  - Settings button (right): 48x48px icon button

### 2. Score Display
- **Position:** Below header, centered
- **Format:** "Red: X | Yellow: Y"
- **Font Size:** 28px bold
- **Player Names:** Use colored circles next to names
- **Spacing:** 24px from header

### 3. Game Board
- **Dimensions:** 7 columns × 6 rows
- **Board Size:** Maximum 80% of viewport width/height (maintain aspect ratio)
- **Cell Size:** Calculated dynamically, minimum 60x60px
- **Board Color:** Classic blue (#3498DB)
- **Piece Size:** 85-90% of cell size
- **Cell Border:** 2px dark blue (#2C3E50, 20% opacity)
- **Corner Radius:** 8px for board container
- **Shadow:** Subtle drop shadow for depth
- **Padding:** 16px inside board

### 4. Turn Indicator
- **Position:** Below game board, centered
- **Format:** "Current Turn: [Colored Piece Icon]"
- **Size:** 48x48px piece icon
- **Animation:** Gentle pulse (scale 1.0 to 1.1, 1s duration, infinite)
- **Spacing:** 32px from board

### 5. Control Buttons
- **Layout:** Horizontal row below turn indicator
- **Button Size:** 140x56px minimum
- **Spacing:** 16px between buttons
- **Style:** Rounded corners (8px), flat design
- **Colors:**
  - Undo: Light gray background, dark text
  - Restart: Medium gray background, white text
  - New Game: Primary blue background, white text

### 6. Column Preview
- **Trigger:** Touch/hover over any cell in column
- **Visual:** Translucent piece (40% opacity) at top of column
- **Animation:** Fade in 150ms
- **Feedback:** Column background highlight (10% white overlay)

### 7. Win Animation
- **Winning Line:** Highlight four pieces with pulsing glow
- **Duration:** 2 seconds
- **Overlay:** Semi-transparent backdrop (black, 50% opacity)
- **Winner Announcement:**
  - Modal centered on screen
  - Size: 400x250px
  - Background: White with colored border matching winner
  - Text: "[Color] Wins!" in 48px bold
  - Icon: Large trophy or celebration emoji
  - Buttons: "New Game" (primary) and "Close" (secondary)

## Interaction Design

### Touch Interactions

#### Piece Placement
1. **Touch Down:** Show column preview
2. **Touch Move:** Update preview if moving between columns
3. **Touch Up:** Drop piece in current column
4. **Validation:** If column full, shake animation + red flash
5. **Animation:** Piece drops with easing (400ms)
6. **Sound:** (Optional) Satisfying "drop" sound

#### Column Preview
- **Activation:** Touch or hover over column
- **Visual:** Ghost piece at top of column (40% opacity)
- **Highlight:** Column background highlight
- **Response Time:** < 16ms (1 frame at 60fps)

#### Button Presses
- **Touch Down:** Button scales down to 95%
- **Touch Up:** Button scales back to 100% + action
- **Disabled State:** 50% opacity, no interaction
- **Feedback:** Subtle haptic feedback (if available)

### Animations

#### Piece Drop
- **Duration:** 300-400ms (varies by distance)
- **Easing:** Ease-in (gravity effect)
- **Bounce:** Subtle bounce on landing (optional)
- **Frame Rate:** 60 FPS

#### Win Celebration
- **Phase 1:** Winning pieces pulse/glow (300ms)
- **Phase 2:** Winner overlay fades in (200ms)
- **Phase 3:** Confetti animation (optional, 1s)
- **Total Duration:** ~2 seconds before showing modal

#### Turn Transition
- **Duration:** 200ms
- **Effect:** Turn indicator color change + scale pulse
- **Smoothness:** Ease-in-out

#### Invalid Move
- **Duration:** 300ms
- **Effect:** Horizontal shake + red flash
- **Feedback:** Brief haptic vibration

## Responsive Behavior

### Tablet Size Adaptations

#### Small Tablets (7-9 inches)
- Cell size: 60-70px
- Font sizes: 90% of base
- Button padding: Reduced to 12px
- Margins: 16px

#### Medium Tablets (10-11 inches)
- Cell size: 75-85px
- Font sizes: 100% of base (standard)
- Button padding: 16px
- Margins: 24px

#### Large Tablets (12-13 inches)
- Cell size: 85-95px
- Font sizes: 110% of base
- Button padding: 20px
- Margins: 32px

### Orientation Changes
- **Landscape → Portrait:** Reflow buttons to vertical stack
- **Portrait → Landscape:** Reflow buttons to horizontal row
- **Transition:** Smooth, 300ms animation
- **Game State:** Preserved during orientation change

## Accessibility Features

### Visual Accessibility
- **High Contrast Mode:** Toggle in settings
  - Increased contrast ratios (7:1 minimum)
  - Bolder outlines on pieces and grid
- **Color-Blind Support:** Pattern overlays on pieces
  - Player 1: Diagonal stripes
  - Player 2: Dots pattern
- **Large Text Mode:** 120% font scaling option
- **Focus Indicators:** 3px outline on focused elements

### Assistive Technology
- **Screen Reader Support:**
  - "Column [1-7], [Empty/Filled]" announcements
  - "[Color] placed piece in column [X]"
  - "[Color] wins!" or "It's a draw!"
  - Button labels clearly announced
- **Haptic Feedback:**
  - Piece placed: Light impact
  - Win detected: Medium impact
  - Invalid move: Warning impact
- **Semantic HTML:** Proper ARIA labels and roles

### Motor Accessibility
- **Large Touch Targets:** Minimum 60x60px
- **Forgiving Touch Areas:** Tapping anywhere in column works
- **Undo Feature:** Allows correction of accidental moves
- **No Time Pressure:** No turn timers (Phase 1)

## Edge Cases & Error States

### Full Column
- **Visual:** Column shake + red flash on border
- **Message:** Toast notification "Column is full!"
- **Duration:** 2 seconds, auto-dismiss

### Game Complete
- **State:** Board becomes non-interactive
- **Visual:** Winning line highlighted
- **Options:** Only "New Game" and "Restart" active

### App Backgrounding
- **Behavior:** Game state saved automatically
- **Resume:** Return to exact game position
- **Message:** None (seamless experience)

### Orientation Change During Animation
- **Behavior:** Complete current animation before reflow
- **State:** Preserve game board state
- **Experience:** Smooth, no jarring jumps

## User Flows

### Primary Flow: Quick Game
1. App opens → Game board ready
2. Player 1 (Red) taps column
3. Piece drops with animation
4. Turn indicator switches to Player 2
5. Player 2 (Yellow) taps column
6. Continue until win/draw
7. Winner announcement appears
8. Tap "New Game" to play again

### Secondary Flow: Mistake Correction
1. Player makes a move
2. Realizes mistake immediately
3. Taps "Undo" button
4. Last piece removed with animation
5. Turn reverts to previous player
6. Player makes correct move

### Settings Flow
1. Tap menu button
2. Settings panel slides in from side
3. Toggle options:
   - High contrast mode
   - Color-blind patterns
   - Haptic feedback
   - Reset all scores
4. Close settings to return to game

## Technical Design Notes

### Performance Targets
- **Render Time:** < 16ms per frame (60 FPS)
- **Touch Response:** < 50ms
- **Animation:** Hardware-accelerated (GPU)
- **Memory:** < 100MB RAM usage

### Asset Requirements
- **Piece Graphics:** SVG or high-res PNG (2x, 3x for retina)
- **Icons:** Vector format (SVG preferred)
- **Fonts:** System fonts (no custom font loading)
- **Images:** Optimized, lazy-loaded where possible

### State Management
- **Game State:** Current board, current player, scores
- **UI State:** Selected column preview, animation status
- **Persistence:** Game state in local storage
- **Reset:** Clear state on explicit user action

## Design Deliverables Checklist
- [x] Color palette definition
- [x] Typography specifications
- [x] Layout wireframes (landscape & portrait)
- [x] Component specifications
- [x] Interaction patterns
- [x] Animation specifications
- [x] Accessibility requirements
- [x] Responsive behavior rules
- [ ] High-fidelity mockups (see design/ folder)
- [ ] Interactive prototype (optional)
- [ ] Asset library (icons, images)
