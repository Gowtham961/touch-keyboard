import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeResultsModal } from '../store/slices/uiSlice';
import { resetSession, loadTargetText, setDuration } from '../store/slices/typingSlice';
import { FINGER_DATA } from '../data/fingerMapping';
import { generateDynamicBenchmarkText } from '../data/lessons';
import { saveSession, evaluateAndSavePB } from '../utils/storage';
import confetti from 'canvas-confetti';
import {
  Trophy, Target, Hash, Zap, X, RotateCcw, Sparkles,
  AlertTriangle, ArrowRight, Flame, Crown
} from 'lucide-react';

export default function ResultsModal() {
  const dispatch = useDispatch();
  const showResultsModal = useSelector((state) => state.ui.showResultsModal);
  const {
    totalKeysPressed,
    correctKeysPressed,
    incorrectKeysPressed,
    accuracy,
    wpm,
    kpm,
    keyStats,
    elapsedSeconds,
    selectedDuration,
    bestStreak,
  } = useSelector((state) => state.typing);

  const [isNewPB, setIsNewPB] = useState(false);

  // Save session and check PB on open
  useEffect(() => {
    if (!showResultsModal) return;

    const session = {
      date: new Date().toISOString(),
      totalKeys: totalKeysPressed,
      accuracy,
      wpm,
      kpm,
      bestStreak,
      duration: selectedDuration,
    };

    saveSession(session);
    const { isNewPB: newPB } = evaluateAndSavePB(session);
    setIsNewPB(newPB);

    // Confetti intensity scales with accuracy
    try {
      confetti({
        particleCount: accuracy >= 95 ? 120 : 70,
        spread: accuracy >= 95 ? 90 : 60,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#9d4edd', '#10b981', '#f59e0b'],
      });
      if (newPB) {
        setTimeout(() => {
          confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
        }, 600);
      }
    } catch {
      // ignore
    }
  }, [showResultsModal]); // eslint-disable-line

  if (!showResultsModal) return null;

  // Grade evaluation
  const getGrade = (acc, words) => {
    if (acc >= 98 && words >= 50) return { grade: 'A+', label: 'Master Typist',          color: 'text-emerald-400' };
    if (acc >= 95 && words >= 35) return { grade: 'A',  label: 'Proficient',             color: 'text-cyan-400'   };
    if (acc >= 90)                return { grade: 'B',  label: 'Solid Foundation',        color: 'text-blue-400'   };
    if (acc >= 80)                return { grade: 'C',  label: 'Developing Memory',       color: 'text-amber-400'  };
    return                               { grade: 'D',  label: 'Needs More Practice',     color: 'text-rose-400'   };
  };
  const performance = getGrade(accuracy, wpm);

  // Per-key breakdown
  const homeKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
  const analyzedKeys = homeKeys.map((k) => {
    const stat = keyStats[k] || { total: 0, correct: 0, errors: 0 };
    const acc  = stat.total > 0 ? (stat.correct / stat.total) * 100 : 100;
    return { key: k, ...stat, accuracy: acc, fingerMeta: FINGER_DATA[k] };
  });

  const activeKeys  = analyzedKeys.filter((k) => k.total > 0);
  const weakestKey  = activeKeys.length > 0
    ? [...activeKeys].sort((a, b) => a.accuracy - b.accuracy)[0]
    : null;

  const handleRetake = () => {
    dispatch(closeResultsModal());
    dispatch(resetSession());
  };

  const handlePracticeWeakKey = () => {
    const drillText = weakestKey
      ? generateDynamicBenchmarkText(40, [weakestKey.key])
      : generateDynamicBenchmarkText(40);
    dispatch(closeResultsModal());
    dispatch(setDuration(180));
    dispatch(loadTargetText(drillText));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8">

        {/* Ambient top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/20 to-transparent blur-2xl pointer-events-none" />

        {/* Close */}
        <button
          onClick={() => dispatch(closeResultsModal())}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 mb-3 shadow-lg shadow-cyan-500/10">
            <Trophy className="w-7 h-7 text-cyan-400" />
            {isNewPB && (
              <span className="absolute -top-2 -right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold shadow-md">
                <Crown className="w-2.5 h-2.5" /> PB!
              </span>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            5-Minute Session Report Card
            {isNewPB && (
              <span className="ml-3 text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2.5 py-0.5 rounded-full align-middle">
                🏆 New Personal Best!
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Official benchmark of total keys pressed & home row accuracy
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-semibold mb-1">
              <Hash className="w-3.5 h-3.5" /> Keys Pressed
            </div>
            <div className="text-3xl font-mono font-extrabold text-cyan-300">{totalKeysPressed}</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">5-min total</div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold mb-1">
              <Target className="w-3.5 h-3.5" /> Accuracy
            </div>
            <div className="text-3xl font-mono font-extrabold text-emerald-400">{accuracy.toFixed(1)}%</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{correctKeysPressed}/{totalKeysPressed} hits</div>
          </div>

          <div className="bg-slate-950/80 border border-blue-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-blue-400 font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" /> Net WPM
            </div>
            <div className="text-3xl font-mono font-extrabold text-blue-400">{wpm}</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{kpm} KPM</div>
          </div>

          <div className="bg-slate-950/80 border border-orange-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-1.5 text-xs text-orange-400 font-semibold mb-1">
              <Flame className="w-3.5 h-3.5" /> Best Streak
            </div>
            <div className="text-3xl font-mono font-extrabold text-orange-300">{bestStreak}</div>
            <div className="text-[11px] text-slate-400 font-mono mt-0.5">consecutive correct</div>
          </div>
        </div>

        {/* Grade */}
        <div className="flex items-center justify-between bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-2.5 mb-5">
          <span className="text-xs text-slate-400 font-mono">Overall Rating</span>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">{performance.label}</span>
            <span className={`text-2xl font-mono font-extrabold ${performance.color}`}>{performance.grade}</span>
          </div>
        </div>

        {/* 8-Key Heatmap */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-6">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-300 mb-3 flex items-center justify-between">
            <span>Per-Key Accuracy (8 Home Row Keys)</span>
            <span className="text-[10px] font-mono text-slate-500 font-normal">Target: 95%+</span>
          </h4>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {analyzedKeys.map((item) => (
              <div
                key={item.key}
                className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 flex flex-col items-center justify-between text-center"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-sm mb-1"
                  style={{
                    backgroundColor: `${item.fingerMeta.colorHex}20`,
                    color: item.fingerMeta.colorHex,
                    border: `1px solid ${item.fingerMeta.colorHex}60`,
                  }}
                >
                  {item.key.toUpperCase()}
                </div>
                <div className="text-[10px] font-mono text-slate-400">{item.total} pressed</div>
                <div
                  className={`text-xs font-mono font-bold mt-1 ${
                    item.accuracy >= 95 ? 'text-emerald-400' :
                    item.accuracy >= 85 ? 'text-amber-400'  :
                    item.total === 0    ? 'text-slate-600'   : 'text-rose-400'
                  }`}
                >
                  {item.total > 0 ? `${item.accuracy.toFixed(0)}%` : '—'}
                </div>
              </div>
            ))}
          </div>

          {/* Weak key advisory */}
          {weakestKey && weakestKey.accuracy < 92 && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  Key <strong className="font-mono text-white">[{weakestKey.key.toUpperCase()}]</strong> ({weakestKey.fingerMeta.fingerLabel}) — lowest at {weakestKey.accuracy.toFixed(0)}%.
                </span>
              </div>
              <button
                onClick={handlePracticeWeakKey}
                className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30 transition text-[11px] font-semibold whitespace-nowrap flex items-center gap-1"
              >
                Target Drill <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={() => dispatch(closeResultsModal())}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition"
          >
            Review & Close
          </button>
          <button
            onClick={handleRetake}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Retake 5-Min Test
          </button>
        </div>
      </div>
    </div>
  );
}
