# Connect4 Animation System Documentation

## Overview
This document describes the animation system implemented for the Connect4 game, including all animations, their specifications, and implementation details.

## Animation Specifications

### 1. Piece Drop Animation
**Duration:** 200-400ms (variable based on distance)  
**Easing:** Cubic ease-in (simulates gravity)  
**Trigger:** After player taps/clicks a column

**Implementation:**
- Base duration: 200ms
- Additional time: 30ms per row of drop distance
- Maximum duration: 400ms
- Animation disables board interaction during drop
- Uses CSS `@keyframes drop` with transform and opacity

**CSS:**
```css
.piece.drop {
    animation: drop [duration]ms cubic-bezier(0.55, 0.085, 0.68, 0.53);
}

@keyframes drop {
    from { transform: translateY(-600%); opacity: 0.8; }
    to { transform: translateY(0); opacity: 1; }
}
```

**User Experience:**
- Clear visual feedback of piece placement
- Satisfying motion with realistic physics
- Quick enough to maintain gameplay flow
- Natural gravity effect with acceleration

---

### 2. Winning Pieces Celebration
**Duration:** 500ms per cycle (continuous)  
**Easing:** Ease-in-out  
**Trigger:** Win detected

**Animation Effects:**
- **Pulse:** Scale 1.0 → 1.15 → 1.0
- **Glow:** Opacity 1.0 → 0.7 → 1.0
- **Highlight:** Enhanced box-shadow with glow effect

**CSS:**
```css
.piece.winning {
    animation: winningPulse 500ms ease-in-out infinite;
    box-shadow: 0 0 20px rgba(231, 76, 60, 0.6);
}

@keyframes winningPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.15); opacity: 0.7; }
}
```

**Behavior:**
- Only winning 4 pieces animate
- Animation starts immediately on win detection
- Continues until modal is shown
- Separate glow color for red and yellow pieces

---

### 3. Column Preview Animation
**Duration:** 150ms  
**Easing:** Ease-out  
**Trigger:** Mouse hover or touch on column

**Effects:**
- Ghost piece appears at top of column (40% opacity)
- Smooth fade-in animation
- Column background highlight
- Responsive to touch and mouse events

**CSS:**
```css
.preview-piece {
    opacity: 0;
    transition: opacity 150ms ease-out, transform 150ms ease-out;
}

.preview-piece.show {
    opacity: 0.4;
    animation: previewFloat 150ms ease-out forwards;
}

@keyframes previewFloat {
    from { transform: translate(-50%, calc(-50% - 20px)); opacity: 0; }
    to { transform: translate(-50%, -50%); opacity: 0.4; }
}
```

**Behavior:**
- Shows on mouseenter/touchstart events
- Hides on mouseleave/touchend/touchcancel events
- Only shown for valid moves (non-full columns)
- Matches current player's color
- Fast response time (<50ms)

---

### 4. Invalid Move Feedback
**Duration:** 300ms  
**Easing:** Ease-in-out with elastic shake pattern  
**Trigger:** Click/tap on full column

**Effects:**
- Horizontal shake animation
- Red flash on cell borders
- Haptic feedback (if supported)
- Visual "no" indication

**CSS:**
```css
.cell.invalid-shake {
    animation: invalidShake 300ms ease-in-out;
}

@keyframes invalidShake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
    20%, 40%, 60%, 80% { transform: translateX(8px); }
}

.cell.invalid-flash {
    animation: invalidFlash 300ms ease-in-out;
}

@keyframes invalidFlash {
    0%, 100% { box-shadow: 0 0 0 0 transparent; }
    50% { box-shadow: 0 0 0 4px #E74C3C; }
}
```

**Behavior:**
- Applied to all cells in the full column
- Quick, attention-grabbing feedback
- Automatically dismisses after 300ms
- Includes haptic vibration (100ms) if supported

---

### 5. Turn Indicator Transition
**Duration:** 300ms  
**Easing:** Cubic-bezier with back overshoot  
**Trigger:** Turn switches to other player

**Effects:**
- Scale animation from 0.8 to 1.0
- Fade in from opacity 0 to 1
- Slight overshoot for emphasis
- Color change (red ↔ yellow)

**CSS:**
```css
.player-piece {
    transition: opacity 300ms ease-in-out, transform 300ms cubic-bezier(0.68, -0.55, 0.265, 1.7);
}

.player-piece.turn-transition {
    animation: turnTransition 300ms cubic-bezier(0.68, -0.55, 0.265, 1.7);
}

@keyframes turnTransition {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
```

**Behavior:**
- Triggered after piece placement animation completes
- Smooth color and scale transition
- Doesn't delay gameplay
- Clear visual update of current player

---

### 6. Modal Enter/Exit Animations
**Duration:** 300ms (modal), 200ms (backdrop)  
**Easing:** Cubic-bezier with overshoot (enter), ease-in (exit)  
**Trigger:** Modal show/hide

**Enter Animation:**
- Backdrop fades in (200ms)
- Modal scales from 0.9 to 1.0 (300ms)
- Slight overshoot for bounce effect
- Fade in to full opacity

**Exit Animation:**
- Modal scales from 1.0 to 0.9 (300ms)
- Fade out to 0 opacity
- Backdrop fades out (200ms)

**CSS:**
```css
.modal.show {
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
    animation: fadeInBackdrop 200ms ease-out forwards;
}

.modal-content {
    animation: modalEnter 300ms cubic-bezier(0.68, -0.55, 0.265, 1.2) forwards;
}

@keyframes modalEnter {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

@keyframes modalExit {
    from { transform: scale(1); opacity: 1; }
    to { transform: scale(0.9); opacity: 0; }
}
```

**Behavior:**
- Smooth entrance with bounce
- Professional exit animation
- Backdrop and content animated separately
- Proper timing ensures smooth experience

---

### 7. Piece Removal Animation (Undo)
**Duration:** 300ms  
**Easing:** Ease-in  
**Trigger:** Undo button pressed

**Effects:**
- Piece moves upward (reverse of drop)
- Fades out during movement
- Smooth disappearance
- Clear undo indication

**CSS:**
```css
.piece.removing {
    animation: undoRemove 300ms ease-in forwards;
}

@keyframes undoRemove {
    from { transform: translateY(0); opacity: 1; }
    to { transform: translateY(-200%); opacity: 0; }
}
```

**Behavior:**
- Triggered when undo button is clicked
- Piece floats upward and disappears
- State updated after animation completes
- Turn indicator transitions after undo

---

## Performance Optimizations

### GPU Acceleration
All animations use GPU-accelerated CSS properties:
- `transform` (translateX, translateY, scale)
- `opacity`
- Avoid animating `width`, `height`, `left`, `top`, `margin`

### Animation State Management
```javascript
this.isAnimating = false; // Prevents overlapping animations
```
- Board interaction disabled during piece drop
- Prevents rapid-fire clicks
- Ensures animations complete properly

### Accessibility
Respects user preferences for reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
    .piece.winning {
        animation: none !important;
    }
}
```

### Event Handling
- Touch events properly handled with preventDefault
- Mouse and touch events work together
- Efficient event delegation
- Cleanup of animation classes after completion

---

## Browser Compatibility

### Supported Features
- CSS Transforms (all modern browsers)
- CSS Animations with keyframes
- CSS Transitions
- Touch events
- Navigator Vibrate API (optional enhancement)

### Fallbacks
- Animations gracefully degrade on older browsers
- Core functionality works without animations
- Reduced motion preference supported

---

## Performance Metrics

### Target Performance
- **Frame Rate:** 60 FPS consistently
- **Touch Response:** <50ms
- **Drop Animation:** 200-400ms (variable)
- **Turn Transition:** 300ms
- **Modal Animations:** 300ms

### Optimization Techniques
1. Use of CSS transforms over position changes
2. GPU acceleration via transform/opacity
3. RequestAnimationFrame for smooth timing
4. Minimal DOM manipulation
5. Animation state tracking to prevent overlaps
6. Efficient event listener management

---

## Testing Checklist

- [x] Piece drop animation smooth and natural
- [x] Variable duration based on drop distance
- [x] Column preview appears on hover/touch
- [x] Invalid move shows shake and flash
- [x] Turn indicator transitions smoothly
- [x] Winning pieces pulse continuously
- [x] Modal animations polished (enter/exit)
- [x] Undo animation clear and visible
- [x] All animations run at 60 FPS
- [x] Touch response <50ms
- [x] Reduced motion support working
- [x] Haptic feedback on supported devices

---

## Future Enhancements

### Potential Additions
1. **Sound effects** - Piece drop, win celebration, invalid move
2. **Particle effects** - Confetti on win
3. **Advanced easing curves** - More sophisticated physics
4. **Customizable animation speed** - User preference
5. **Victory animation** - Full board celebration
6. **Combo animations** - Multiple wins in a row

### Performance Monitoring
Consider adding performance monitoring in production:
```javascript
const performanceMetrics = {
    frameRate: 60,
    dropDuration: 400,
    touchResponse: 50,
    animationOverhead: 5
};
```

---

## Code Examples

### Adding a New Animation

1. **Define CSS Keyframes:**
```css
@keyframes myAnimation {
    from { /* start state */ }
    to { /* end state */ }
}
```

2. **Create CSS Class:**
```css
.element.my-animation {
    animation: myAnimation 300ms ease-in-out;
}
```

3. **Trigger in JavaScript:**
```javascript
element.classList.add('my-animation');
setTimeout(() => {
    element.classList.remove('my-animation');
}, 300);
```

### Animation Timing
Use consistent timing for polish:
- **Fast:** 150ms (previews, highlights)
- **Normal:** 300ms (transitions, modals)
- **Slow:** 400-500ms (piece drops, celebrations)

---

## Support

For issues or questions about animations:
1. Check browser console for errors
2. Verify CSS animations are supported
3. Test with reduced motion disabled
4. Check performance in browser dev tools
5. Ensure JavaScript animation flags are properly managed

---

**Last Updated:** 2025-11-25  
**Version:** 1.0  
**Status:** Production Ready
