import React from 'react';
import { useSelector } from 'react-redux';
import { FINGER_DATA } from '../data/fingerMapping';
import { Hand, Sparkles } from 'lucide-react';

export default function HandsVisualizer() {
  const activeKey = useSelector((state) => state.typing.activeKey);
  const showHands = useSelector((state) => state.ui.showHands);

  if (!showHands) return null;

  const normalizedChar = activeKey ? activeKey.toLowerCase() : '';
  const currentFingerMeta = FINGER_DATA[normalizedChar] || (normalizedChar === ' ' ? FINGER_DATA[' '] : null);
  const activeFingerId = currentFingerMeta?.finger;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl transition-all">
      {/* Title & Guidance Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Hand className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
            Hand & Finger Positioning Visualizer
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Muscle Memory Guide
          </span>
        </div>

        {/* Active Finger Status Pill */}
        {currentFingerMeta ? (
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-950/80 border border-slate-700/60 shadow-sm">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: currentFingerMeta.colorHex }}
            />
            <span className="text-xs font-semibold text-slate-200">
              Active: <span style={{ color: currentFingerMeta.colorHex }}>{currentFingerMeta.fingerLabel}</span>
            </span>
            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-800 text-white border border-slate-700">
              Key {currentFingerMeta.display}
            </span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 font-mono">Rest all 8 fingers on the Home Row</span>
        )}
      </div>

      {/* SVG Vector Hands Representation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-2">
        
        {/* ================= LEFT HAND ================= */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 font-mono">
            Left Hand (A S D F)
          </span>

          <svg
            className="w-56 h-48 sm:w-64 sm:h-52 drop-shadow-md select-none transition-transform hover:scale-102"
            viewBox="0 0 240 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Palm & Wrist Base */}
            <path
              d="M 45 130 C 45 170, 70 215, 110 215 C 150 215, 175 170, 175 130 C 175 105, 160 90, 140 95 C 130 80, 110 80, 95 90 C 85 85, 65 90, 55 105 C 45 115, 45 125, 45 130 Z"
              fill="#141c2e"
              stroke="#2c3852"
              strokeWidth="2.5"
            />

            {/* Left Pinky (Key A) */}
            <g className="cursor-pointer">
              <rect
                x="30"
                y="55"
                width="22"
                height="65"
                rx="11"
                fill={activeFingerId === 'left-pinky' ? '#c084fc' : '#1e293b'}
                stroke={activeFingerId === 'left-pinky' ? '#a855f7' : '#334155'}
                strokeWidth={activeFingerId === 'left-pinky' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'left-pinky' ? 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.8))' : 'none',
                }}
              />
              <circle cx="41" cy="70" r="8" fill="#0f172a" />
              <text x="41" y="74" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">A</text>
            </g>

            {/* Left Ring (Key S) */}
            <g className="cursor-pointer">
              <rect
                x="60"
                y="30"
                width="24"
                height="80"
                rx="12"
                fill={activeFingerId === 'left-ring' ? '#60a5fa' : '#1e293b'}
                stroke={activeFingerId === 'left-ring' ? '#3b82f6' : '#334155'}
                strokeWidth={activeFingerId === 'left-ring' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'left-ring' ? 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.8))' : 'none',
                }}
              />
              <circle cx="72" cy="46" r="8" fill="#0f172a" />
              <text x="72" y="50" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">S</text>
            </g>

            {/* Left Middle (Key D) */}
            <g className="cursor-pointer">
              <rect
                x="92"
                y="15"
                width="24"
                height="92"
                rx="12"
                fill={activeFingerId === 'left-middle' ? '#22d3ee' : '#1e293b'}
                stroke={activeFingerId === 'left-middle' ? '#06b6d4' : '#334155'}
                strokeWidth={activeFingerId === 'left-middle' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'left-middle' ? 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))' : 'none',
                }}
              />
              <circle cx="104" cy="32" r="8" fill="#0f172a" />
              <text x="104" y="36" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold" fontFamily="monospace">D</text>
            </g>

            {/* Left Index (Key F - Homing Anchor!) */}
            <g className="cursor-pointer">
              <rect
                x="124"
                y="28"
                width="24"
                height="82"
                rx="12"
                fill={activeFingerId === 'left-index' ? '#34d399' : '#1e293b'}
                stroke={activeFingerId === 'left-index' ? '#10b981' : '#334155'}
                strokeWidth={activeFingerId === 'left-index' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'left-index' ? 'drop-shadow(0 0 10px rgba(52, 211, 153, 0.8))' : 'none',
                }}
              />
              <circle cx="136" cy="44" r="8" fill="#0f172a" />
              <text x="136" y="48" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">F</text>
              {/* Anchor dot on index */}
              <circle cx="136" cy="57" r="1.5" fill="#34d399" />
            </g>

            {/* Left Thumb (Space) */}
            <g className="cursor-pointer">
              <path
                d="M 160 115 C 185 105, 205 125, 195 145 C 185 160, 160 155, 155 140 Z"
                fill={activeFingerId === 'thumb' ? '#fbbf24' : '#1e293b'}
                stroke={activeFingerId === 'thumb' ? '#f59e0b' : '#334155'}
                strokeWidth={activeFingerId === 'thumb' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'thumb' ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' : 'none',
                }}
              />
              <circle cx="185" cy="132" r="7" fill="#0f172a" />
              <text x="185" y="135" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">␣</text>
            </g>
          </svg>
        </div>

        {/* ================= RIGHT HAND ================= */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 font-mono">
            Right Hand (J K L ;)
          </span>

          <svg
            className="w-56 h-48 sm:w-64 sm:h-52 drop-shadow-md select-none transition-transform hover:scale-102"
            viewBox="0 0 240 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Palm & Wrist Base */}
            <path
              d="M 195 130 C 195 170, 170 215, 130 215 C 90 215, 65 170, 65 130 C 65 105, 80 90, 100 95 C 110 80, 130 80, 145 90 C 155 85, 175 90, 185 105 C 195 115, 195 125, 195 130 Z"
              fill="#141c2e"
              stroke="#2c3852"
              strokeWidth="2.5"
            />

            {/* Right Thumb (Space) */}
            <g className="cursor-pointer">
              <path
                d="M 80 115 C 55 105, 35 125, 45 145 C 55 160, 80 155, 85 140 Z"
                fill={activeFingerId === 'thumb' ? '#fbbf24' : '#1e293b'}
                stroke={activeFingerId === 'thumb' ? '#f59e0b' : '#334155'}
                strokeWidth={activeFingerId === 'thumb' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'thumb' ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))' : 'none',
                }}
              />
              <circle cx="55" cy="132" r="7" fill="#0f172a" />
              <text x="55" y="135" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace">␣</text>
            </g>

            {/* Right Index (Key J - Homing Anchor!) */}
            <g className="cursor-pointer">
              <rect
                x="92"
                y="28"
                width="24"
                height="82"
                rx="12"
                fill={activeFingerId === 'right-index' ? '#34d399' : '#1e293b'}
                stroke={activeFingerId === 'right-index' ? '#10b981' : '#334155'}
                strokeWidth={activeFingerId === 'right-index' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'right-index' ? 'drop-shadow(0 0 10px rgba(52, 211, 153, 0.8))' : 'none',
                }}
              />
              <circle cx="104" cy="44" r="8" fill="#0f172a" />
              <text x="104" y="48" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">J</text>
              {/* Anchor dot on index */}
              <circle cx="104" cy="57" r="1.5" fill="#34d399" />
            </g>

            {/* Right Middle (Key K) */}
            <g className="cursor-pointer">
              <rect
                x="124"
                y="15"
                width="24"
                height="92"
                rx="12"
                fill={activeFingerId === 'right-middle' ? '#22d3ee' : '#1e293b'}
                stroke={activeFingerId === 'right-middle' ? '#06b6d4' : '#334155'}
                strokeWidth={activeFingerId === 'right-middle' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'right-middle' ? 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))' : 'none',
                }}
              />
              <circle cx="136" cy="32" r="8" fill="#0f172a" />
              <text x="136" y="36" textAnchor="middle" fill="#22d3ee" fontSize="11" fontWeight="bold" fontFamily="monospace">K</text>
            </g>

            {/* Right Ring (Key L) */}
            <g className="cursor-pointer">
              <rect
                x="156"
                y="30"
                width="24"
                height="80"
                rx="12"
                fill={activeFingerId === 'right-ring' ? '#60a5fa' : '#1e293b'}
                stroke={activeFingerId === 'right-ring' ? '#3b82f6' : '#334155'}
                strokeWidth={activeFingerId === 'right-ring' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'right-ring' ? 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.8))' : 'none',
                }}
              />
              <circle cx="168" cy="46" r="8" fill="#0f172a" />
              <text x="168" y="50" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold" fontFamily="monospace">L</text>
            </g>

            {/* Right Pinky (Key ;) */}
            <g className="cursor-pointer">
              <rect
                x="188"
                y="55"
                width="22"
                height="65"
                rx="11"
                fill={activeFingerId === 'right-pinky' ? '#c084fc' : '#1e293b'}
                stroke={activeFingerId === 'right-pinky' ? '#a855f7' : '#334155'}
                strokeWidth={activeFingerId === 'right-pinky' ? '3' : '2'}
                className="transition-all duration-300"
                style={{
                  filter: activeFingerId === 'right-pinky' ? 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.8))' : 'none',
                }}
              />
              <circle cx="199" cy="70" r="8" fill="#0f172a" />
              <text x="199" y="74" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">;</text>
            </g>
          </svg>
        </div>

      </div>

      {/* Ergonomic Touch Typing Pro-Tip */}
      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Touch Typing Principle:
        </span>
        <span className="text-slate-400 text-right">
          Never look at the physical keys. Trust the glowing finger guides and anchor ridges on F & J.
        </span>
      </div>
    </div>
  );
}
