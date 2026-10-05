# TypeFlow — 8-Key Touch Typing Mastery

> A production-grade, web-based touch typing trainer focused exclusively on the **8 home row keys** — `A S D F J K L ;` — built with **React 18**, **Redux Toolkit**, **Redux-Saga**, and **Tailwind CSS**.

---

## ✨ Live Features

### Must-Have Requirements ✅
| Requirement | Implementation |
|---|---|
| **Typing Box** | Real-time character stream with color-coded correct/incorrect indicators, animated cursor, and auto-scroll |
| **Next Key Visualizer** | Large animated key badge with finger color, hand label, and ergonomic tip displayed above the typing stream |
| **Keys Pressed in 5-min window** | Live counter in StatsBar prominently tracking total, correct, and missed keys for the timed session |
| **Accuracy %** | Calculated as `(correct / total) × 100` on every keystroke, with color-grade feedback (green ≥ 95%, amber ≥ 85%, red < 85%) |

### Nice-to-Have Requirements ✅
| Feature | Implementation |
|---|---|
| **CSS3 Animations** | Finger glow auras, SVG progress rings, keyframe animations (bounce, fade, slide), glassmorphism panels |
| **Redux State Management** | Three slices: `typingSlice`, `lessonSlice`, `uiSlice` via Redux Toolkit |
| **Redux-Saga Middleware** | `timerSaga` (drift-free countdown with pause/resume), `lessonSaga` (async external drill fetch), `audioSaga` (Web Audio API feedback) |
| **Appropriate Images** | Custom SVG anatomical hand diagrams with per-finger color coding and tactile bump indicators |

---

## 🏗 Architecture

```
src/
├── App.jsx                    # Root layout & component tree
├── main.jsx                   # React 18 + Redux Provider entry point
├── index.css                  # Tailwind base + custom CSS3 utilities
│
├── components/
│   ├── Navbar.jsx             # Global controls: restart, hands/keyboard toggles, sound, info modal
│   ├── StatsBar.jsx           # Live KPIs: time (circular ring), keys, accuracy, WPM/KPM, error rate
│   ├── TypingBox.jsx          # Main practice arena — next key cue + scrolling character stream
│   ├── HandsVisualizer.jsx    # SVG anatomical left/right hands with live finger highlighting
│   ├── VirtualKeyboard.jsx    # Full QWERTY keyboard visual with home row highlighted & active key pulsing
│   ├── LessonSelector.jsx     # Curriculum cards + async "Fetch Cloud Drill" (Redux-Saga demo)
│   ├── SessionHistory.jsx     # Persistent localStorage session log with trend indicators
│   ├── ResultsModal.jsx       # End-of-session report card with per-key heatmap, grade, PB detection
│   ├── UseCasesModal.jsx      # Architecture & customer use case documentation (in-app)
│   ├── StreakCounter.jsx      # Live consecutive correct-key streak with fire animations
│   ├── WpmSparkline.jsx       # Canvas-based live WPM-over-time sparkline chart
│   └── MilestoneToast.jsx     # Animated milestone pop-ups (10/25/50/100/200 streak)
│
├── store/
│   ├── index.js               # configureStore + sagaMiddleware setup
│   ├── rootSaga.js            # fork() all three sagas
│   ├── slices/
│   │   ├── typingSlice.js     # Core session state: text, index, stats, timer, streaks
│   │   ├── lessonSlice.js     # Curriculum, external lesson state
│   │   └── uiSlice.js         # Modals, toggles, focus state
│   └── sagas/
│       ├── timerSaga.js       # 1-second countdown; handles start/pause/resume/reset
│       ├── lessonSaga.js      # Async remote lesson fetching (simulated 800ms API latency)
│       └── audioSaga.js       # takeEvery keypress → Web Audio API click/error sounds
│
├── data/
│   ├── fingerMapping.js       # FINGER_DATA (per key: color, finger, glow), KEYBOARD_LAYOUT
│   └── lessons.js             # 7 structured lessons + HOME_ROW_WORDS + generateDynamicBenchmarkText()
│
└── utils/
    ├── audio.js               # SoundSynthesizer (Web Audio API, zero external files)
    └── storage.js             # localStorage helpers: sessions + personal best
```

---

## 🧑‍💻 Customer Use Cases Addressed

### 1. The Absolute Beginner
- Starts with **Lesson 1: Index Anchors** (F & J only — with tactile bump indicators)
- SVG hands illuminate the *exact* finger to use, preventing wrong-finger habits
- Progressive pair additions: D&K → S&L → A&; following proven muscle-memory pedagogy

### 2. The Muscle Memory Builder *(inspired by ngram-type)*
- **Lesson 5: N-Gram Rhythm & Flow** drills bigrams/trigrams (`asdf`, `jkl;`, `fjdk`, `sla;`)
- Alternating hand drill prevents dominant-hand bias
- Procedural audio click on every correct keypress provides sub-millisecond tactile reinforcement

### 3. The 5-Minute Assessment Taker *(core requirement)*
- Official 5-minute benchmark mode with circular progress ring countdown
- Tracks **total keys pressed** as the primary metric per specification
- Dynamic infinite text streaming — fast typists never run out mid-session
- End-of-session report card with grade (A+ through D), PB detection, and confetti

### 4. The Adaptive Learner
- Per-key accuracy breakdown across all 8 home row keys shown in Results Modal heatmap
- Auto-identifies the weakest key and offers a **1-click "Target Drill"** — generates focused practice weighted toward that finger

### 5. The Progress Tracker
- Session history table with trend arrows (↑↓) persisted across browser sessions via localStorage
- Personal best badge detection and celebration confetti
- Best-streak display throughout the session

---

## 🔧 Technical Highlights

### Redux Toolkit State Management
Three independent slices with tight separation of concerns:
- `typingSlice` — all keystroke logic, accuracy formula, streaks, text generation
- `lessonSlice` — curriculum management, async lesson loading state
- `uiSlice` — modal visibility, component toggles

### Redux-Saga Middleware
```
rootSaga
 ├── timerSaga    — race() between timer/pause/reset; correctly restarts after resume
 ├── lessonSaga   — takeLatest() on fetchExternalLessonRequest; simulates 800ms API
 └── audioSaga    — takeEvery() on handleKeyPress → Web Audio API feedback
```

### Web Audio API Sound Engine
Zero external MP3/WAV dependencies. Procedurally synthesized:
- **Correct key**: sine wave 650→880 Hz, 50ms decay
- **Incorrect key**: triangle wave 180→90 Hz, 80ms decay
- **Session complete**: ascending C-E-G-C5 fanfare chord

### CSS3 Design
- Glassmorphism panels with `backdrop-filter: blur()`
- Cyber grid background via repeating linear-gradient
- SVG circular progress ring with smooth `stroke-dashoffset` transitions
- Custom Tailwind keyframes: `bounceSlow`, `fadeIn`, `slideUp`
- Font: Inter (UI) + JetBrains Mono (monospace) via Google Fonts

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development server (Vite HMR)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

**Requirements**: Node.js 18+ / npm 9+

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `A S D F J K L ;` | Type (only valid keys accepted) |
| `Space` | Spacebar (thumb) — prevented from page scroll |
| `Esc` | Reset current session |
| `P` | *Pause* (via pause button in StatsBar) |

---

## 📦 Dependencies

| Package | Version | Purpose |
|---|---|---|
| `react` | ^18.3.1 | UI rendering |
| `react-redux` | ^9.3.0 | React-Redux bindings |
| `@reduxjs/toolkit` | ^2.13.0 | Redux store, slices, immer |
| `redux-saga` | ^1.5.1 | Async middleware (timer, lesson fetch, audio) |
| `lucide-react` | ^0.475.0 | SVG icon library |
| `canvas-confetti` | ^1.9.4 | End-of-session celebration effect |
| `tailwindcss` | ^3.4.17 | Utility-first CSS framework |
| `vite` | ^6.1.0 | Build tool & dev server |

---

## 🎨 Design Decisions

### Why only 8 keys?
The home row (`ASDF JKL;`) is where fingers rest naturally. Mastering these 8 keys first builds the **positional muscle memory** that makes learning remaining keys dramatically faster. This constraint also makes the UI cleaner and the practice more focused.

### Why Redux-Saga for the timer?
JavaScript's `setInterval` drifts. Using Saga's `delay()` + an inner loop gives a clean, cancellable, resumable countdown with no drift accumulation — and the saga's generator model makes the pause/resume state machine readable and testable.

### Why Web Audio API instead of MP3 files?
- No 404 risk on deployment
- No CORS issues
- Instant playback (no buffering)
- Full offline support
- Smaller bundle size

---

*Built with attention to the full customer journey — from the first-time beginner to the speed-typing assessment taker.*
