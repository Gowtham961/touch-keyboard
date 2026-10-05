import React from 'react';
import { useSelector } from 'react-redux';
import { Flame, Zap } from 'lucide-react';

export default function StreakCounter() {
  const currentStreak = useSelector((state) => state.typing.currentStreak);
  const bestStreak    = useSelector((state) => state.typing.bestStreak);
  const status        = useSelector((state) => state.typing.status);

  if (status === 'idle') return null;

  // Determine heat level
  const isHot    = currentStreak >= 25;
  const isOnFire = currentStreak >= 50;
  const isCold   = currentStreak === 0;

  return (
    <div className="flex items-center gap-3">
      {/* Current streak badge */}
      <div
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono font-bold text-sm transition-all duration-300
          ${isCold
            ? 'bg-slate-900/70 border-slate-700 text-slate-400'
            : isOnFire
            ? 'bg-gradient-to-r from-orange-600/30 to-amber-500/30 border-orange-400/60 text-orange-300 shadow-lg shadow-orange-500/30 scale-105'
            : isHot
            ? 'bg-gradient-to-r from-yellow-600/25 to-amber-500/25 border-yellow-400/50 text-yellow-300 shadow-md shadow-yellow-500/20'
            : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
          }
        `}
      >
        <Flame
          className={`w-4 h-4 transition-all ${
            isOnFire ? 'text-orange-400 animate-pulse' :
            isHot    ? 'text-yellow-400' :
            isCold   ? 'text-slate-500' : 'text-emerald-400'
          }`}
        />
        <span>{currentStreak}</span>
        <span className="text-[10px] font-normal opacity-70">streak</span>
      </div>

      {/* Best streak */}
      {bestStreak > 0 && (
        <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-slate-400">
          <Zap className="w-3 h-3 text-amber-400" />
          <span>Best: <strong className="text-amber-300">{bestStreak}</strong></span>
        </div>
      )}
    </div>
  );
}
