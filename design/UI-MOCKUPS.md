# Connect4 - UI Mockups and Visual Design

## Mockup Overview
This document describes the visual mockups for the Connect4 tablet game. Actual mockup images should be created using design tools (Figma, Sketch, Adobe XD) and placed in this directory.

## Required Mockups

### 1. Main Game Screen (Landscape)
**Filename:** `main-game-landscape.png`

**Description:**
- Full tablet view in landscape orientation
- Empty game board centered
- Red player's turn indicator
- Score display showing "Red: 0 | Yellow: 0"
- Three control buttons at bottom
- Clean, minimalist design

**Key Elements:**
- Header with menu button, "CONNECT 4" title, settings button
- Score counter prominently displayed
- 7x6 blue game board with circular cutouts
- Turn indicator: "Current Turn: 🔴"
- Control buttons: [Undo] [Restart] [New Game]

**Dimensions:** 2388 × 1668px (11" iPad Pro landscape)

---

### 2. Main Game Screen (Portrait)
**Filename:** `main-game-portrait.png`

**Description:**
- Full tablet view in portrait orientation
- Adjusted layout for vertical screen
- Buttons stacked or wrapped for better fit

**Key Differences from Landscape:**
- Board sized to fit available height
- Buttons may be in 2-1 or 3-row layout
- Header elements may be more compact

**Dimensions:** 1668 × 2388px (11" iPad Pro portrait)

---

### 3. Game in Progress
**Filename:** `game-in-progress.png`

**Description:**
- Board partially filled with red and yellow pieces
- Mix of pieces showing realistic gameplay
- Yellow player's turn
- Score showing Red: 2, Yellow: 1
- Undo button enabled

**Purpose:** Show active gameplay state

---

### 4. Column Preview/Hover State
**Filename:** `column-preview.png`

**Description:**
- Player touching column 4
- Ghost piece (40% opacity) at top of column
- Column background highlighted
- Clear indication of where piece will drop

**Purpose:** Demonstrate interactive feedback

---

### 5. Winning State
**Filename:** `winning-state.png`

**Description:**
- Four red pieces in a row (horizontal example)
- Winning pieces highlighted with glow effect
- Semi-transparent overlay
- Winner modal displayed: "Red Wins!"
- Trophy icon
- Updated score: Red: 3, Yellow: 1
- Two buttons: "New Game" (primary) and "Close" (secondary)

**Purpose:** Show win celebration and announcement

---

### 6. Winning State - Vertical
**Filename:** `winning-vertical.png`

**Description:**
- Four yellow pieces in vertical column
- Similar treatment to horizontal win

**Purpose:** Show vertical win detection

---

### 7. Winning State - Diagonal
**Filename:** `winning-diagonal.png`

**Description:**
- Four pieces in diagonal line (ascending or descending)
- Highlighted winning line

**Purpose:** Show diagonal win detection

---

### 8. Draw State
**Filename:** `draw-state.png`

**Description:**
- Full board with no winner
- All 42 cells filled
- Draw announcement modal
- "It's a Draw!" message
- Handshake icon
- Scores unchanged
- "New Game" button

**Purpose:** Show draw condition

---

### 9. Invalid Move Feedback
**Filename:** `invalid-move.png`

**Description:**
- Full column (6 pieces)
- Player attempting to place piece
- Column shaking animation (show with motion blur)
- Red border flash on column
- Toast message: "Column is full!"

**Purpose:** Demonstrate error feedback

---

### 10. High Contrast Mode
**Filename:** `high-contrast-mode.png`

**Description:**
- Same layout as main game
- Higher contrast colors
- Bolder outlines
- Darker borders
- Optimized for visibility in bright sunlight

**Purpose:** Show accessibility feature

---

### 11. Color-Blind Mode
**Filename:** `color-blind-mode.png`

**Description:**
- Red pieces with diagonal stripe pattern
- Yellow pieces with dot pattern
- Patterns clearly visible and distinct
- Same game layout

**Purpose:** Show accessibility for color-blind users

---

### 12. Settings Panel
**Filename:** `settings-panel.png`

**Description:**
- Side panel slid in from right
- Toggle switches:
  - High Contrast Mode [OFF]
  - Color-Blind Patterns [OFF]
  - Haptic Feedback [ON]
- Button: "Reset All Scores"
- Close button

**Purpose:** Show settings options

---

### 13. Multiple Screen Sizes
**Filename:** `responsive-layouts.png`

**Description:**
- Side-by-side comparison showing:
  - 7" tablet (small)
  - 10" tablet (medium)
  - 12" tablet (large)
- Demonstrate responsive scaling
- Same proportions, different sizes

**Purpose:** Show responsive design

---

### 14. Animation Sequence - Piece Drop
**Filename:** `animation-piece-drop.png`

**Description:**
- Sequential frames showing:
  - Frame 1: Piece at top of column
  - Frame 2: Piece mid-fall
  - Frame 3: Piece approaching bottom
  - Frame 4: Piece landed with subtle bounce
- Timing indicators (0ms, 100ms, 200ms, 400ms)

**Purpose:** Illustrate drop animation timing

---

### 15. Dark Mode (Future)
**Filename:** `dark-mode-concept.png`

**Description:**
- Dark background (#1A1A1A)
- Board still blue but darker shade
- Pieces maintain vibrant colors
- White text
- Modern, sleek appearance

**Purpose:** Concept for future enhancement

---

## Color Specifications for Designers

### Player Colors
```css
/* Player 1 - Red */
--player-red: #E74C3C;
--player-red-shadow: rgba(231, 76, 60, 0.3);

/* Player 2 - Yellow */
--player-yellow: #F39C12;
--player-yellow-shadow: rgba(243, 156, 18, 0.3);
```

### UI Colors
```css
/* Background & Board */
--background: #ECF0F1;
--board-blue: #3498DB;
--board-border: rgba(44, 62, 80, 0.2);

/* Text */
--text-primary: #2C3E50;
--text-secondary: #7F8C8D;

/* Buttons */
--button-primary: #3498DB;
--button-secondary: #95A5A6;
--button-danger: #E74C3C;
--button-text: #FFFFFF;

/* States */
--success: #27AE60;
--error: #E74C3C;
--warning: #F39C12;
--disabled: #BDC3C7;
```

### Shadows
```css
/* Component Shadows */
--shadow-small: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 4px 8px rgba(0, 0, 0, 0.15);
--shadow-large: 0 8px 16px rgba(0, 0, 0, 0.2);

/* Piece Shadows */
--piece-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
```

## Typography Specifications

### Font Families
- **iOS:** SF Pro Display / SF Pro Text
- **Android:** Roboto

### Font Sizes & Weights
```css
/* Headings */
--heading-xlarge: 48px / Bold (700)
--heading-large: 36px / Bold (700)
--heading-medium: 28px / Bold (700)

/* Body Text */
--body-large: 24px / Regular (400)
--body-medium: 20px / Regular (400)
--body-small: 18px / Regular (400)

/* UI Elements */
--button-text: 20px / Medium (500)
--score-text: 28px / Bold (700)
--turn-text: 24px / Medium (500)
```

## Spacing & Sizing

### Component Sizes
```css
/* Touch Targets */
--touch-target-min: 60px;

/* Buttons */
--button-height: 56px;
--button-min-width: 140px;
--button-radius: 8px;

/* Board */
--cell-min-size: 60px;
--cell-max-size: 95px;
--cell-gap: 4px;
--board-padding: 16px;
--board-radius: 8px;

/* Pieces */
--piece-size: 85-90% of cell;
--piece-border: 3px;
```

### Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-xxl: 48px;
```

## Animation Specifications

### Timing Functions
```css
/* Easing Functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

### Duration Values
```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 400ms;
--duration-slower: 500ms;
```

### Specific Animations
```css
/* Piece Drop */
animation: dropPiece 400ms ease-in;

/* Win Pulse */
animation: winPulse 500ms ease-in-out infinite alternate;

/* Column Preview */
animation: fadeIn 150ms ease-out;

/* Invalid Shake */
animation: shake 300ms ease-in-out;

/* Modal Appear */
animation: modalSlideUp 300ms ease-out;
```

## Icon Requirements

### Icons Needed
1. **Menu Icon** (hamburger) - 24×24px
2. **Settings Icon** (gear) - 24×24px
3. **Undo Icon** (curved arrow left) - 24×24px
4. **Restart Icon** (circular arrow) - 24×24px
5. **New Game Icon** (plus or play) - 24×24px
6. **Trophy Icon** (for win modal) - 64×64px
7. **Handshake Icon** (for draw modal) - 64×64px
8. **Close Icon** (X) - 24×24px

### Icon Style
- Line icons (not filled)
- 2px stroke weight
- Rounded line caps
- Simple, clean design
- SVG format preferred
- Accessible with 4.5:1 contrast ratio

## Asset Export Guidelines

### Image Formats
- **Mockups:** PNG with transparency
- **Icons:** SVG + PNG fallbacks
- **Patterns:** SVG or PNG

### Resolution Exports
- **1x** - Standard resolution
- **2x** - Retina displays
- **3x** - High-resolution tablets

### File Naming Convention
```
[component]-[state]-[size].png

Examples:
- main-game-landscape-2x.png
- button-primary-normal-3x.png
- icon-menu-2x.png
```

## Design Tool Recommendations

### Figma (Recommended)
- Free for personal use
- Excellent collaboration
- Auto-layout for responsive design
- Component libraries
- Prototype interactions

### Adobe XD
- Professional tool
- Good prototyping
- Adobe integration

### Sketch
- Mac-only
- Industry standard
- Great plugins

## Mockup Checklist

- [ ] Main game screen - landscape
- [ ] Main game screen - portrait
- [ ] Game in progress
- [ ] Column preview/hover
- [ ] Winning state - horizontal
- [ ] Winning state - vertical
- [ ] Winning state - diagonal
- [ ] Draw state
- [ ] Invalid move feedback
- [ ] High contrast mode
- [ ] Color-blind mode
- [ ] Settings panel
- [ ] Responsive layouts comparison
- [ ] Animation sequence
- [ ] All icons created
- [ ] Color palette swatches
- [ ] Typography samples
- [ ] Spacing examples

## Handoff to Development

When mockups are complete:
1. Export all screens at 1x, 2x, 3x
2. Create design specification document
3. Export icon set in SVG
4. Document all measurements and spacing
5. Provide Figma/XD link for inspection
6. Create style guide with all colors/fonts
7. Include animation timing specifications
