import { createSlice } from '@reduxjs/toolkit';
import { LESSONS, generateDynamicBenchmarkText } from '../../data/lessons';

const DEFAULT_LESSON = LESSONS[0]; // 5-minute benchmark
const INITIAL_TEXT = DEFAULT_LESSON.sampleText;

const MILESTONE_THRESHOLDS = [10, 25, 50, 100, 200];

const initialKeyStats = {
  a: { total: 0, correct: 0, errors: 0 },
  s: { total: 0, correct: 0, errors: 0 },
  d: { total: 0, correct: 0, errors: 0 },
  f: { total: 0, correct: 0, errors: 0 },
  j: { total: 0, correct: 0, errors: 0 },
  k: { total: 0, correct: 0, errors: 0 },
  l: { total: 0, correct: 0, errors: 0 },
  ';': { total: 0, correct: 0, errors: 0 },
  ' ': { total: 0, correct: 0, errors: 0 },
};

const initialState = {
  targetText: INITIAL_TEXT,
  currentIndex: 0,
  typedHistory: [], // array of { char, expected, isCorrect, timestamp }
  totalKeysPressed: 0,
  correctKeysPressed: 0,
  incorrectKeysPressed: 0,
  keyStats: initialKeyStats,
  status: 'idle', // 'idle' | 'running' | 'paused' | 'completed'
  selectedDuration: 300, // 5 minutes = 300 seconds default
  timeRemaining: 300,
  elapsedSeconds: 0,
  wpm: 0,
  kpm: 0,
  accuracy: 100,
  activeKey: INITIAL_TEXT[0] || 'a',
  lastPressedKey: null,
  lastPressedCorrect: null,
  sessionStartTime: null,
  // 🔥 NEW: Streak & milestone tracking
  currentStreak: 0,         // consecutive correct presses
  bestStreak: 0,            // best streak in current session
  activeMilestone: null,    // e.g. { threshold: 50, id: 'ms-50' } — cleared by UI
  wpmHistory: [],           // [{second: N, wpm: N}] for sparkline graph
};

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setDuration: (state, action) => {
      const duration = action.payload;
      state.selectedDuration = duration;
      state.timeRemaining = duration;
      state.elapsedSeconds = 0;
      state.status = 'idle';
      state.currentIndex = 0;
      state.typedHistory = [];
      state.totalKeysPressed = 0;
      state.correctKeysPressed = 0;
      state.incorrectKeysPressed = 0;
      state.keyStats = initialKeyStats;
      state.wpm = 0;
      state.kpm = 0;
      state.accuracy = 100;
      state.lastPressedKey = null;
      state.lastPressedCorrect = null;
      state.currentStreak = 0;
      state.bestStreak = 0;
      state.activeMilestone = null;
      state.wpmHistory = [];
    },

    loadTargetText: (state, action) => {
      state.targetText = action.payload;
      state.currentIndex = 0;
      state.activeKey = state.targetText[0] || '';
      state.typedHistory = [];
      state.totalKeysPressed = 0;
      state.correctKeysPressed = 0;
      state.incorrectKeysPressed = 0;
      state.keyStats = initialKeyStats;
      state.status = 'idle';
      state.timeRemaining = state.selectedDuration;
      state.elapsedSeconds = 0;
      state.wpm = 0;
      state.kpm = 0;
      state.accuracy = 100;
      state.lastPressedKey = null;
      state.lastPressedCorrect = null;
      state.currentStreak = 0;
      state.bestStreak = 0;
      state.activeMilestone = null;
      state.wpmHistory = [];
    },

    handleKeyPress: (state, action) => {
      const { key } = action.payload;

      if (state.status === 'completed' || state.status === 'paused') {
        return;
      }

      // If idle, start session automatically on first keypress
      if (state.status === 'idle') {
        state.status = 'running';
        state.sessionStartTime = Date.now();
      }

      const expectedChar = state.targetText[state.currentIndex];
      const isCorrect = key === expectedChar;

      // Update counters
      state.totalKeysPressed += 1;
      if (isCorrect) {
        state.correctKeysPressed += 1;
      } else {
        state.incorrectKeysPressed += 1;
      }

      // Update per-key statistics
      const normalizedKey = key === ';' ? ';' : key.toLowerCase();
      if (state.keyStats[normalizedKey] !== undefined) {
        state.keyStats[normalizedKey].total += 1;
        if (isCorrect) {
          state.keyStats[normalizedKey].correct += 1;
        } else {
          state.keyStats[normalizedKey].errors += 1;
        }
      }

      // 🔥 Streak tracking
      if (isCorrect) {
        state.currentStreak += 1;
        if (state.currentStreak > state.bestStreak) {
          state.bestStreak = state.currentStreak;
        }
        // Check for milestone crossing
        const hitMilestone = MILESTONE_THRESHOLDS.find(
          (t) => state.currentStreak === t
        );
        if (hitMilestone) {
          state.activeMilestone = {
            threshold: hitMilestone,
            id: `ms-${hitMilestone}-${Date.now()}`,
          };
        }
      } else {
        state.currentStreak = 0;
        state.activeMilestone = null;
      }

      // Record in history
      state.typedHistory.push({
        char: key,
        expected: expectedChar,
        isCorrect,
        timestamp: Date.now(),
      });

      state.lastPressedKey = key;
      state.lastPressedCorrect = isCorrect;

      // Calculate accuracy %: (Correct Keys / Total Keys Pressed) * 100
      state.accuracy = state.totalKeysPressed > 0
        ? parseFloat(((state.correctKeysPressed / state.totalKeysPressed) * 100).toFixed(1))
        : 100;

      // Advance cursor
      const nextIndex = state.currentIndex + 1;

      // If we reach near end of text in timed mode, append dynamically so practice never cuts off early
      if (nextIndex >= state.targetText.length) {
        if (state.selectedDuration > 0 && state.status === 'running') {
          // Seamlessly extend stream
          const additional = generateDynamicBenchmarkText(50);
          state.targetText += ' ' + additional;
          state.currentIndex = nextIndex;
          state.activeKey = state.targetText[nextIndex];
        } else {
          // Untimed lesson completed
          state.currentIndex = nextIndex;
          state.status = 'completed';
          state.activeKey = '';
        }
      } else {
        state.currentIndex = nextIndex;
        state.activeKey = state.targetText[nextIndex];
      }
    },

    tickTimer: (state) => {
      if (state.status !== 'running') return;

      state.elapsedSeconds += 1;

      if (state.selectedDuration > 0) {
        state.timeRemaining = Math.max(0, state.timeRemaining - 1);
        if (state.timeRemaining === 0) {
          state.status = 'completed';
        }
      }

      // Recalculate WPM and KPM
      const minutes = state.elapsedSeconds / 60;
      if (minutes > 0) {
        state.kpm = Math.round(state.totalKeysPressed / minutes);
        // Standard WPM: (correct chars / 5) / minutes
        state.wpm = Math.round((state.correctKeysPressed / 5) / minutes);
      }

      // 📈 Record WPM snapshot every 5 seconds for sparkline graph
      if (state.elapsedSeconds % 5 === 0) {
        state.wpmHistory.push({ second: state.elapsedSeconds, wpm: state.wpm });
      }
    },

    clearMilestone: (state) => {
      state.activeMilestone = null;
    },

    pauseSession: (state) => {
      if (state.status === 'running') {
        state.status = 'paused';
      }
    },

    resumeSession: (state) => {
      if (state.status === 'paused') {
        state.status = 'running';
      }
    },

    resetSession: (state) => {
      state.currentIndex = 0;
      state.typedHistory = [];
      state.totalKeysPressed = 0;
      state.correctKeysPressed = 0;
      state.incorrectKeysPressed = 0;
      state.keyStats = initialKeyStats;
      state.status = 'idle';
      state.timeRemaining = state.selectedDuration;
      state.elapsedSeconds = 0;
      state.wpm = 0;
      state.kpm = 0;
      state.accuracy = 100;
      state.lastPressedKey = null;
      state.lastPressedCorrect = null;
      state.activeKey = state.targetText[0] || 'a';
      state.currentStreak = 0;
      state.bestStreak = 0;
      state.activeMilestone = null;
      state.wpmHistory = [];
    },

    completeSession: (state) => {
      state.status = 'completed';
    },
  },
});

export const {
  setDuration,
  loadTargetText,
  handleKeyPress,
  tickTimer,
  clearMilestone,
  pauseSession,
  resumeSession,
  resetSession,
  completeSession,
} = typingSlice.actions;

export default typingSlice.reducer;
