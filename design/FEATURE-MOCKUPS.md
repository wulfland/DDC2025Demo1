# Feature Mockups - Missing UX Elements

**Date:** 2025-11-26  
**Purpose:** Visual specifications for missing/incomplete features

---

## 1. Column Preview Feature

### Description
Ghost piece that appears at the top of a column when user hovers or touches it, showing where the piece will land.

### Visual Specification

**Current State:**
```
+-------------------------+
|         [Empty]         |
|         [Empty]         |
|         [Empty]         |
|         [Empty]         |
|         [Empty]         |
|         [Red]           |
+-------------------------+
   User hovers here ↑
   Nothing happens
```

**Desired State:**
```
+-------------------------+
|    [👻 Ghost Red]      |  ← 40% opacity preview
|         [Empty]         |
|         [Empty]         |
|         [Empty]         |
|         [Empty]         |
|         [Red]           |
+-------------------------+
Column highlighted (subtle)
```

### Behavior Specification

**Desktop (Mouse):**
1. User moves mouse over any cell in column
2. Ghost piece fades in at top (150ms)
3. Column gets subtle highlight (10% white overlay)
4. Moving to different column: preview updates
5. Mouse leaves board: preview fades out

**Mobile/Tablet (Touch):**
1. User touches any cell in column
2. Ghost piece fades in immediately
3. Column gets subtle highlight
4. Dragging to different column: preview follows
5. Touch ends: preview fades out, piece drops

### CSS Implementation

```css
/* Ghost piece at column top */
.column-preview {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 150ms ease-out;
  pointer-events: none;
}

.column-preview.visible {
  opacity: 0.4;
}

.column-preview .piece {
  width: 85%;
  height: 85%;
  border-radius: 50%;
}

.column-preview .piece.red {
  background: #E74C3C;
}

.column-preview .piece.yellow {
  background: #F39C12;
}

/* Column highlight */
.column:hover,
.column.active {
  background: rgba(255, 255, 255, 0.1);
}
```

### User Impact
- **Sophia (Casual):** Feels more confident about piece placement
- **Marcus (Competitive):** Can plan strategy more effectively
- **All Users:** Reduces mistakes, improves UX

---

## 2. Complete Header Design

### Description
Add menu and settings buttons to complete the professional header design.

### Visual Specification

**Current State:**
```
+------------------------------------------+
|            CONNECT 4                     |
+------------------------------------------+
```

**Desired State:**
```
+------------------------------------------+
|  [☰]      CONNECT 4            [⚙️]     |
+------------------------------------------+
   Menu                          Settings
```

### Component Specifications

**Menu Button (Left):**
- Icon: Hamburger (three horizontal lines)
- Size: 48×48px icon
- Touch Target: 60×60px (with padding)
- Color: #2C3E50 (primary text)
- Hover: Light gray background
- Future: Opens side menu

**Settings Button (Right):**
- Icon: Gear/cog
- Size: 48×48px icon
- Touch Target: 60×60px (with padding)
- Color: #2C3E50 (primary text)
- Hover: Light gray background
- Future: Opens settings panel

### Icon SVGs

**Hamburger Icon:**
```svg
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M3 6h18M3 12h18M3 18h18" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round"/>
</svg>
```

**Gear Icon:**
```svg
<svg width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" 
        stroke="currentColor" 
        stroke-width="2"/>
  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83..." 
        fill="currentColor"/>
</svg>
```

### Placeholder Behavior
Until full functionality implemented:
- Click menu → Show toast: "Menu coming soon"
- Click settings → Show toast: "Settings coming soon"
- Helps users understand these will be functional

---

## 3. Enhanced Animations

### 3.1 Piece Drop with Gravity

**Current:**
Simple instant appearance or basic drop

**Desired:**
Natural falling motion with subtle bounce

**Animation Curve:**
```
Height
  ^
  |     
  |   ╱─╲
  |  ╱   ╲
  | ╱     ╲___
  |╱          ─╲_
  +───────────────> Time
  0ms        400ms
```

**Visual Sequence:**
```
Frame 1 (0ms):    [Piece at top]
                       ⬇️
Frame 2 (100ms):  [Piece mid-drop]
                       ⬇️
Frame 3 (300ms):  [Piece lands]
                       ⬇️
Frame 4 (350ms):  [Slight bounce up]
                       ⬆️
Frame 5 (400ms):  [Settles down]
                       ✓
```

### 3.2 Invalid Move Feedback

**Current:**
Subtle or no feedback

**Desired:**
Strong visual feedback with shake + flash

**Animation Sequence:**
```
Frame 1:   Column normal
           |      |
           
Frame 2:   Shift left
          |      |
          
Frame 3:   Shift right
              |      |
              
Frame 4:   Shift left (repeat)
          |      |
          
Frame 5:   Return center
           |      |

+ Red flash border simultaneously
```

**Visual Effect:**
```css
@keyframes invalidMove {
  0%, 100% { 
    transform: translateX(0); 
    border-color: transparent;
  }
  10%, 30%, 50%, 70%, 90% { 
    transform: translateX(-5px); 
  }
  20%, 40%, 60%, 80% { 
    transform: translateX(5px); 
  }
  50% { 
    border-color: #E74C3C; 
    box-shadow: 0 0 10px rgba(231, 76, 60, 0.5);
  }
}
```

### 3.3 Turn Indicator Pulse

**Current:**
Static piece indicator

**Desired:**
Gentle pulse to draw attention

**Animation:**
```
Size
  ^
  |     ╱─╲     ╱─╲     ╱─╲
  | ───╱   ╲───╱   ╲───╱   ╲───
  +──────────────────────────> Time
     1s      1s      1s
```

**Visual:**
```
Normal:    [🔴]  Scale: 1.0
           
Pulse:     [ 🔴 ]  Scale: 1.1
           
Normal:    [🔴]  Scale: 1.0
```

Repeats continuously during player's turn.

---

## 4. Responsive Layout Examples

### 4.1 Landscape Mode (Primary)

**Large Tablet (12-13"):**
```
+--------------------------------------------------------+
|  [☰]               CONNECT 4               [⚙️]        |
|                                                        |
|                   Red: 3 | Yellow: 2                  |
|                                                        |
|                 +----------------------+               |
|                 |                      |               |
|                 |   GAME BOARD 7×6    |               |
|                 |   (85px cells)       |               |
|                 |                      |               |
|                 +----------------------+               |
|                                                        |
|                Current Turn: 🔴                        |
|                                                        |
|        [Undo]       [Restart]       [New Game]        |
+--------------------------------------------------------+
    1366×1024px or similar - Spacious, comfortable
```

**Medium Tablet (10-11"):**
```
+--------------------------------------------------+
|  [☰]            CONNECT 4            [⚙️]        |
|                                                  |
|                Red: 2 | Yellow: 1               |
|                                                  |
|              +--------------------+              |
|              |                    |              |
|              |  GAME BOARD 7×6   |              |
|              |  (75px cells)      |              |
|              |                    |              |
|              +--------------------+              |
|                                                  |
|             Current Turn: 🔴                     |
|                                                  |
|      [Undo]     [Restart]     [New Game]        |
+--------------------------------------------------+
      1024×768px - Standard, well-balanced
```

**Small Tablet (7-8"):**
```
+----------------------------------------+
|  [☰]       CONNECT 4       [⚙️]        |
|                                        |
|           Red: 1 | Yellow: 0          |
|                                        |
|         +-----------------+            |
|         |                 |            |
|         | GAME BOARD 7×6 |            |
|         | (60px cells)    |            |
|         |                 |            |
|         +-----------------+            |
|                                        |
|        Current Turn: 🔴                |
|                                        |
|    [Undo]  [Restart]  [New]          |
+----------------------------------------+
    800×600px - Compact but playable
```

### 4.2 Portrait Mode (Secondary)

**Tablet Portrait:**
```
+------------------------------+
|  [☰]  CONNECT 4       [⚙️]   |
|                              |
|      Red: 2 | Yellow: 1     |
|                              |
|   +---------------------+    |
|   |                     |    |
|   |                     |    |
|   |   GAME BOARD 7×6   |    |
|   |                     |    |
|   |                     |    |
|   |                     |    |
|   +---------------------+    |
|                              |
|     Current Turn: 🔴         |
|                              |
|     [Undo]  [Restart]       |
|       [New Game]             |
+------------------------------+
    768×1024px - Vertical orientation
    Buttons wrapped to 2 rows
```

### Key Responsive Principles

1. **Maintain Aspect Ratio:** 7:6 board always
2. **Scale Pieces:** Proportional to cell size
3. **Minimum Cell Size:** 60×60px (touch targets)
4. **Font Scaling:** Adjust for readability
5. **Button Reflow:** Stack in portrait mode
6. **Spacing:** Reduce margins on small screens

---

## 5. Accessibility Mode Mockups

### 5.1 High Contrast Mode

**Standard Mode:**
```
Board: #3498DB (medium blue)
Pieces: #E74C3C (red), #F39C12 (yellow)
Background: #ECF0F1 (light gray)
Text: #2C3E50 (dark blue-gray)
```

**High Contrast Mode:**
```
Board: #0056B3 (darker blue)
Pieces: #C0392B (darker red), #D68910 (darker yellow)
Background: #FFFFFF (pure white)
Text: #000000 (black)
Borders: 3px (thicker), black
```

**Visual Comparison:**

Standard:
```
+------------------------+
|  [Light Gray Bg]       |
|   [Medium Blue Board]  |
|     [Bright Pieces]    |
+------------------------+
   Comfortable viewing
```

High Contrast:
```
+------------------------+
|  [Pure White Bg]       |
|   [Dark Blue Board]    |
|     [Dark Pieces]      |
|   [Bold Borders]       |
+------------------------+
   Maximum visibility
```

### 5.2 Color-Blind Mode

**Standard Pieces:**
```
Red:     Yellow:
  🔴       🟡
Solid     Solid
colors    colors
```

**Color-Blind Mode:**
```
Red:        Yellow:
  🔴          🟡
 //// ////    ●●●●
 //// ////    ●●●●
Diagonal     Dot
stripes      pattern
```

**Pattern Specifications:**

**Red - Diagonal Stripes:**
```css
background: 
  repeating-linear-gradient(
    -45deg,
    #E74C3C,
    #E74C3C 3px,
    #FFFFFF 3px,
    #FFFFFF 6px
  );
```

**Yellow - Dots:**
```css
background: 
  radial-gradient(
    circle,
    #FFFFFF 30%,
    transparent 30%
  ),
  radial-gradient(
    circle,
    #FFFFFF 30%,
    transparent 30%
  );
background-color: #F39C12;
background-size: 10px 10px;
background-position: 0 0, 5px 5px;
```

**User Benefit:**
- Red pieces always have stripes
- Yellow pieces always have dots
- Both color AND pattern differentiate pieces
- Works for all types of color blindness

---

## 6. Settings Panel Design

### Visual Layout

```
+--------------------------------+
|  Settings               [✕]    |
+--------------------------------+
|                                |
|  🎯 Game Settings              |
|  ┌────────────────────────┐   |
|  │ Current Scores          │   |
|  │ Red: 5  |  Yellow: 3   │   |
|  │                          │   |
|  │ [Reset All Scores]      │   |
|  └────────────────────────┘   |
|                                |
|  ♿ Accessibility              |
|  ┌────────────────────────┐   |
|  │ High Contrast Mode      │   |
|  │                    [⚪] │   |
|  │                          │   |
|  │ Color-Blind Patterns    │   |
|  │                    [⚪] │   |
|  │                          │   |
|  │ Reduced Motion          │   |
|  │                    [⚪] │   |
|  └────────────────────────┘   |
|                                |
|  ℹ️ About                      |
|  ┌────────────────────────┐   |
|  │ Version 1.0.0           │   |
|  │ How to Play             │   |
|  │ Credits                 │   |
|  └────────────────────────┘   |
|                                |
+--------------------------------+
```

### Panel Behavior

**Entry Animation:**
```
From:  [Off-screen right]
To:    [Slide in from right, 300ms]
```

**Exit Animation:**
```
From:  [On screen]
To:    [Slide out to right, 300ms]
```

**Backdrop:**
- Semi-transparent overlay
- Click backdrop to close
- Blur background (optional)

---

## 7. Modal Improvements

### Win Modal - Enhanced

**Current (Functional):**
```
+------------------+
| Red Wins!        |
|      🏆          |
| Red: 3 | Yellow: 2|
| [New Game]       |
| [Close]          |
+------------------+
```

**Enhanced (Polished):**
```
+----------------------+
|                      |
|    ✨ Red Wins! ✨   |
|                      |
|        🏆            |
|    (bouncing)        |
|                      |
|  🎉 Congratulations! |
|                      |
| Red: 3  |  Yellow: 2 |
|                      |
| [🎮 New Game]        |
|    (primary)         |
|                      |
| [✕ Close]            |
|   (secondary)        |
+----------------------+
  Smooth entrance
  Backdrop blur
  Subtle shadow
```

**Enhancements:**
1. Trophy icon bounces gently
2. Sparkle emojis add celebration
3. Congratulations message
4. Icons in buttons for clarity
5. Smoother animations
6. Better visual hierarchy

### Draw Modal - Enhanced

**Enhanced Version:**
```
+----------------------+
|                      |
|   It's a Draw! 🤝    |
|                      |
|   Well played!       |
|   Both sides even.   |
|                      |
| Red: 2  |  Yellow: 2 |
|   (No points added)  |
|                      |
| [🎮 New Game]        |
|    (primary)         |
|                      |
| [✕ Close]            |
|   (secondary)        |
+----------------------+
```

---

## 8. Touch Target Verification Guide

### Measurement Template

For each interactive element:

```
Element: [Name]
Visual Size: [Width] × [Height]
Padding: [Top] [Right] [Bottom] [Left]
Total Touch Area: [Width] × [Height]
Meets 60×60px? [Yes/No]
Action: [None/Adjust padding/Resize]
```

### Example Measurements

**Game Cell:**
```
Element: Game Cell
Visual Size: 75px × 75px
Padding: 0
Total Touch Area: 75px × 75px
Meets 60×60px? ✅ Yes
Action: None needed
```

**Undo Button:**
```
Element: Undo Button
Visual Size: 120px × 48px
Padding: 6px all sides
Total Touch Area: 132px × 60px
Meets 60×60px? ✅ Yes
Action: None needed
```

**Small Icon Button (if <60×60px):**
```
Element: Menu Icon
Visual Size: 48px × 48px
Padding: 6px all sides
Total Touch Area: 60px × 60px
Meets 60×60px? ✅ Yes (with padding)
Action: Padding is critical, maintain
```

### Testing Method

1. **Chrome DevTools:**
   - Inspect element
   - Check computed size
   - Include padding in measurement

2. **Real Device:**
   - Test with different finger sizes
   - Verify comfortable tapping
   - Check for accidental misses

3. **Accessibility Tools:**
   - Use touch target overlay
   - Verify spacing between targets
   - Check WCAG compliance

---

## Conclusion

These mockups provide clear visual specifications for implementing the missing and incomplete features identified in the UX/UI review. Each mockup includes:

- ✅ Visual specifications
- ✅ Behavior descriptions
- ✅ Code examples where applicable
- ✅ User impact assessment
- ✅ Implementation guidance

**Priority Implementation Order:**
1. Column Preview (High impact, quick win)
2. Complete Header (Professional appearance)
3. Responsive Layout (Critical for tablets)
4. Enhanced Animations (Polish and delight)
5. Accessibility Features (Inclusive design)

---

**Document Created By:** UX Agent  
**Date:** 2025-11-26  
**For Implementation:** Development team reference
