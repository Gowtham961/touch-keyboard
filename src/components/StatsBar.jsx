import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Clock, Target, Hash, Zap, AlertCircle, Play, Pause, RotateCcw } from 'lucide-react';
import { setDuration, pauseSession, resumeSession, resetSession } from '../store/slices/typingSlice';
import StreakCounter from './StreakCounter';
import WpmSparkline from './WpmSparkline';

export default function StatsBar() {
  const dispatch = useDispatch();
  const {
    totalKeysPressed,
    correctKeysPressed,
    incorrectKeysPressed,
    accuracy,
    wpm,
    kpm,
    timeRemaining,
    selectedDuration,
    status,
    elapsedSeconds,
  } = useSelector((state) => state.typing);

  // Format mm:ss
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress percentage of the timed window
  const timeProgress = selectedDuration > 0
    ? Math.min(100, Math.round(((selectedDuration - timeRemaining) / selectedDuration) * 100))
    : 0;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl transition-all">
      {/* Top row: Duration Selectors & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
        
        {/* Practice Window Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Window:
          </span>
          <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => dispatch(setDuration(300))}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedDuration === 300
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 ring-1 ring-cyan-400/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              5 Min Window ⭐
            </button>
            <button
              onClick={() => dispatch(setDuration(180))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDuration === 180
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3 Min
            </button>
            <button
              onClick={() => dispatch(setDuration(60))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDuration === 60
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1 Min
            </button>
            <button
              onClick={() => dispatch(setDuration(0))}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDuration === 0
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Free Flow
            </button>
          </div>
        </div>

        {/* Live Status Badge, Streak & Sparkline */}
        <div className="flex items-center gap-3">
          {/* Streak pill */}
          <StreakCounter />

          {/* Status badge */}
          <div className="flex items-center gap-2">
            {status === 'running' && (
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
                  TEST IN PROGRESS
                </span>
                <button
                  onClick={() => dispatch(pauseSession())}
                  className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
                  title="Pause (P)"
                >
                  <Pause className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {status === 'paused' && (
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400"></span>
                <span className="text-xs font-mono text-amber-400 font-semibold">PAUSED</span>
                <button
                  onClick={() => dispatch(resumeSession())}
                  className="p-1 rounded-md text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition"
                  title="Resume"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {status === 'idle' && (
              <span className="text-xs font-mono text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                Press any key to begin
              </span>
            )}

            {status === 'completed' && (
              <span className="text-xs font-mono text-cyan-300 bg-cyan-500/20 px-2.5 py-1 rounded-md border border-cyan-500/40 font-semibold">
                Session Finished 🎉
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">

        {/* 1. Time Remaining / Elapsed — with circular progress ring */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {selectedDuration > 0 ? 'Time Left' : 'Elapsed'}
            </span>
            {selectedDuration > 0 && (
              <span className="text-[10px] font-mono text-slate-500">
                {timeProgress}%
              </span>
            )}
          </div>
          <div className="my-1.5 flex items-center gap-3">
            {/* Circular SVG ring */}
            {selectedDuration > 0 && (
              <div className="relative flex-shrink-0" style={{ width: 40, height: 40 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
                  <circle cx="20" cy="20" r="17" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle
                    cx="20" cy="20" r="17" fill="none"
                    stroke={timeRemaining <= 30 && status === 'running' ? '#f59e0b' : '#22d3ee'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 17}`}
                    strokeDashoffset={`${2 * Math.PI * 17 * (timeProgress / 100)}`}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-mono font-bold text-slate-400">
                    {timeProgress}%
                  </span>
                </div>
              </div>
            )}
            <span className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
              selectedDuration > 0 && timeRemaining <= 30 && status === 'running'
                ? 'text-amber-400 animate-pulse'
                : 'text-slate-100'
            }`}>
              {selectedDuration > 0 ? formatTime(timeRemaining) : formatTime(elapsedSeconds)}
            </span>
          </div>
          {/* Progress bar line */}
          {selectedDuration > 0 && (
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
                style={{ width: `${timeProgress}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* 2. Total Keys Pressed (Must-Have Requirement) */}
        <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-400/60 transition shadow-sm shadow-cyan-500/10">
          <div className="flex items-center justify-between text-cyan-300 text-xs font-medium">
            <span className="flex items-center gap-1.5 font-semibold">
              <Hash className="w-3.5 h-3.5 text-cyan-400" />
              Keys Pressed
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
              {selectedDuration === 300 ? '5-MIN' : selectedDuration === 180 ? '3-MIN' : selectedDuration === 60 ? '1-MIN' : 'FREE'}
            </span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400 tracking-tight">
              {totalKeysPressed}
            </span>
            <span className="text-xs font-mono text-slate-400">keys</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span className="text-emerald-400">{correctKeysPressed} hit</span>
            <span className="text-rose-400">{incorrectKeysPressed} miss</span>
          </div>
        </div>

        {/* 3. Accuracy % (Must-Have Requirement) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-emerald-400" />
              Accuracy
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
              accuracy >= 95 ? 'text-emerald-400 bg-emerald-500/10' :
              accuracy >= 85 ? 'text-amber-400 bg-amber-500/10' :
              'text-rose-400 bg-rose-500/10'
            }`}>
              {accuracy >= 95 ? 'High' : accuracy >= 85 ? 'Good' : 'Train'}
            </span>
          </div>
          <div className="my-1.5">
            <span className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
              accuracy >= 95 ? 'text-emerald-400' :
              accuracy >= 85 ? 'text-cyan-400' :
              'text-rose-400'
            }`}>
              {accuracy.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                accuracy >= 95 ? 'bg-emerald-500' :
                accuracy >= 85 ? 'bg-cyan-500' :
                'bg-rose-500'
              }`}
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
        </div>

        {/* 4. Speed (WPM) */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              Typing Speed
            </span>
            <span className="text-[10px] font-mono text-slate-500">Net</span>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-400 tracking-tight">
              {wpm}
            </span>
            <span className="text-xs font-mono text-slate-400">WPM</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mb-1.5">
            {kpm} <span className="text-slate-500 text-[10px]">Keys/Min</span>
          </div>
          {/* 📈 Live WPM sparkline */}
          <WpmSparkline />
        </div>

        {/* 5. Error Rate & Reset shortcut */}
        <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
              Mistyped
            </span>
            <button
              onClick={() => dispatch(resetSession())}
              className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 transition flex items-center gap-1"
              title="Reset Test"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              Reset
            </button>
          </div>
          <div className="my-1.5 flex items-baseline gap-1">
            <span className={`text-2xl sm:text-3xl font-mono font-bold tracking-tight ${
              incorrectKeysPressed > 0 ? 'text-rose-400' : 'text-slate-400'
            }`}>
              {incorrectKeysPressed}
            </span>
            <span className="text-xs font-mono text-slate-400">errors</span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono truncate">
            {totalKeysPressed > 0 ? `${((incorrectKeysPressed / totalKeysPressed) * 100).toFixed(1)}% error rate` : '0 errors'}
          </div>
        </div>

      </div>
    </div>
  );
}
