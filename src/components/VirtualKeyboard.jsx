import React from 'react';
import { useSelector } from 'react-redux';
import { KEYBOARD_LAYOUT, FINGER_DATA } from '../data/fingerMapping';

export default function VirtualKeyboard() {
  const activeKey = useSelector((state) => state.typing.activeKey);
  const lastPressedKey = useSelector((state) => state.typing.lastPressedKey);
  const lastPressedCorrect = useSelector((state) => state.typing.lastPressedCorrect);
  const showKeyboard = useSelector((state) => state.ui.showKeyboard);

  if (!showKeyboard) return null;

  // Normalized active key for comparison
  const normalizedActive = activeKey ? activeKey.toLowerCase() : '';
  const normalizedPressed = lastPressedKey ? lastPressedKey.toLowerCase() : '';

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl transition-all">
      {/* Keyboard Header / Finger Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
            Interactive Keyboard Guide
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            Home Row Focus
          </span>
        </div>

        {/* Finger Color Legend */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-sm shadow-purple-500/50"></span>
            <span className="text-slate-400">Pinky (A, ;)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-sm shadow-blue-500/50"></span>
            <span className="text-slate-400">Ring (S, L)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-500/50"></span>
            <span className="text-slate-400">Middle (D, K)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/50"></span>
            <span className="text-slate-400">Index (F, J)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-500/50"></span>
            <span className="text-slate-400">Thumb (Space)</span>
          </div>
        </div>
      </div>

      {/* Keyboard Matrix Container */}
      <div className="flex flex-col items-center gap-1.5 overflow-x-auto py-2">
        {KEYBOARD_LAYOUT.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center">
            {row.map((item) => {
              const lowerKey = item.key.toLowerCase();
              const isHomeKey = item.isHome;
              const fingerInfo = FINGER_DATA[lowerKey];
              const isActive = (lowerKey === normalizedActive) || (item.key === ' ' && normalizedActive === ' ');
              const isPressed = (lowerKey === normalizedPressed) || (item.key === ' ' && normalizedPressed === ' ');

              // Styling computation
              let keyBg = 'bg-slate-900/90 border-slate-800 text-slate-500';
              let keyGlow = 'none';

              if (isHomeKey && fingerInfo) {
                // Home row keys stand out
                keyBg = `${fingerInfo.keyBgClass} text-slate-200 shadow-sm`;
              }

              if (isActive) {
                // Active expected key glows
                keyBg = `${fingerInfo ? fingerInfo.badgeClass : 'bg-cyan-500/20 text-cyan-300 border-cyan-400'} ring-2 ring-cyan-400/50`;
                keyGlow = fingerInfo ? fingerInfo.activeGlow : '0 0 15px rgba(0, 242, 254, 0.6)';
              }

              if (isPressed) {
                // Currently pressed key animation
                if (lastPressedCorrect) {
                  keyBg = 'bg-emerald-500/40 border-emerald-400 text-white translate-y-[2px] shadow-none';
                } else {
                  keyBg = 'bg-rose-500/40 border-rose-400 text-white translate-y-[2px] shadow-none';
                }
              }

              return (
                <div
                  key={item.key}
                  style={{ boxShadow: isActive ? keyGlow : undefined }}
                  className={`relative flex items-center justify-center h-10 sm:h-12 rounded-lg font-mono text-xs sm:text-sm font-semibold border transition-all duration-150 select-none ${
                    item.width
                  } ${keyBg} ${
                    isHomeKey ? 'scale-100 hover:border-slate-500' : 'opacity-40 hover:opacity-60'
                  }`}
                >
                  {/* Key label */}
                  <span>{item.label}</span>

                  {/* Physical Tactile Bump Indicator on F and J keys */}
                  {item.hasBump && (
                    <div
                      className="absolute bottom-1 w-3 sm:w-4 h-0.5 sm:h-[3px] bg-slate-300/80 rounded-full"
                      title="Tactile homing ridge bump"
                    />
                  )}

                  {/* Active target pulse ring */}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
