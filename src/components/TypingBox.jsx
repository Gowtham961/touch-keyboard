import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleKeyPress, resetSession } from '../store/slices/typingSlice';
import { setTypingFocus } from '../store/slices/uiSlice';
import { FINGER_DATA } from '../data/fingerMapping';
import { AlertCircle, CornerDownLeft, Sparkles, Hand, Keyboard } from 'lucide-react';

export default function TypingBox() {
  const dispatch = useDispatch();
  const {
    targetText,
    currentIndex,
    typedHistory,
    status,
    activeKey,
  } = useSelector((state) => state.typing);

  const isTypingFocused = useSelector((state) => state.ui.isTypingFocused);
  const showResultsModal = useSelector((state) => state.ui.showResultsModal);
  const showInfoModal = useSelector((state) => state.ui.showInfoModal);

  const containerRef = useRef(null);
  const activeCharRef = useRef(null);
  const [invalidKeyWarning, setInvalidKeyWarning] = useState(null);

  // Normalize expected character
  const expectedChar = targetText[currentIndex] || '';
  const currentFingerMeta = FINGER_DATA[expectedChar.toLowerCase()] || (expectedChar === ' ' ? FINGER_DATA[' '] : null);

  // Auto-scroll so active cursor stays centered
  useEffect(() => {
    if (activeCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const element = activeCharRef.current;
      const containerRect = container.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();

      if (elemRect.top < containerRect.top + 40 || elemRect.bottom > containerRect.bottom - 40) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex]);

  // Global keydown handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture keys if modal is open or modifier keys pressed
      if (showResultsModal || showInfoModal) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Handle Escape to restart
      if (e.key === 'Escape') {
        dispatch(resetSession());
        return;
      }

      // Check if space pressed - prevent page scrolling
      if (e.key === ' ') {
        e.preventDefault();
        dispatch(handleKeyPress({ key: ' ' }));
        return;
      }

      // We only accept single character keys
      if (e.key.length === 1) {
        const key = e.key === ';' ? ';' : e.key.toLowerCase();
        const allowedKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';', ' '];

        if (allowedKeys.includes(key)) {
          e.preventDefault();
          dispatch(handleKeyPress({ key }));
          setInvalidKeyWarning(null);
        } else {
          // Warning for keys outside the 8-key exercise scope
          setInvalidKeyWarning(`Key '${e.key}' ignored. Focus on 8 Home Row Keys: A S D F J K L ;`);
          setTimeout(() => setInvalidKeyWarning(null), 2500);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dispatch, showResultsModal, showInfoModal]);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Dynamic Visual Cue Banner for Upcoming Key */}
      <div className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-lg transition-all">
        
        {/* Next Expected Key Visual */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
              Next Key:
            </span>
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-extrabold text-2xl border-2 transition-all shadow-lg ${
                currentFingerMeta ? currentFingerMeta.badgeClass : 'bg-slate-800 border-slate-700 text-slate-100'
              } animate-bounce-slow`}
              style={{
                boxShadow: currentFingerMeta ? currentFingerMeta.activeGlow : undefined,
              }}
            >
              {expectedChar === ' ' ? '␣' : expectedChar.toUpperCase()}
            </div>
          </div>

          {/* Finger & Hand Guidance Badge */}
          {currentFingerMeta && (
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  {currentFingerMeta.fingerLabel}
                </span>
                <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                  {currentFingerMeta.hand === 'both' ? 'Both Thumbs' : `${currentFingerMeta.hand} Hand`}
                </span>
              </div>
              <span className="text-xs text-slate-400 mt-0.5">
                {currentFingerMeta.tip}
              </span>
            </div>
          )}
        </div>

        {/* Tactile Anchor Note if F or J */}
        {currentFingerMeta?.hasHomingBump && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tactile Anchor Ridge: Return fingers here without looking!</span>
          </div>
        )}
      </div>

      {/* Typing Stream Box */}
      <div
        onClick={() => dispatch(setTypingFocus(true))}
        className={`w-full relative bg-slate-950/90 border rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all cursor-text min-h-[180px] max-h-[260px] overflow-hidden flex flex-col justify-center ${
          isTypingFocused
            ? 'border-cyan-500/40 ring-2 ring-cyan-500/10'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Stream container */}
        <div
          ref={containerRef}
          className="font-mono text-xl sm:text-2xl md:text-3xl leading-relaxed tracking-wider select-none overflow-y-auto max-h-[160px] pr-2 scrollbar-none"
        >
          {targetText.split('').map((char, index) => {
            const isTyped = index < currentIndex;
            const isCurrent = index === currentIndex;
            const historyItem = typedHistory[index];

            // Render Past Typed Chars
            if (isTyped) {
              const isCorrect = historyItem?.isCorrect;
              return (
                <span
                  key={index}
                  className={`transition-colors duration-100 ${
                    isCorrect
                      ? 'text-emerald-400/90 font-medium'
                      : 'text-rose-400 bg-rose-500/20 underline decoration-rose-500 decoration-2 rounded px-0.5'
                  }`}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              );
            }

            // Render Current Active Char with pulsing caret
            if (isCurrent) {
              return (
                <span
                  key={index}
                  ref={activeCharRef}
                  className="relative inline-block"
                >
                  <span
                    className="px-1 py-0.5 rounded font-bold transition-all animate-pulse"
                    style={{
                      backgroundColor: currentFingerMeta ? `${currentFingerMeta.colorHex}25` : 'rgba(0, 242, 254, 0.2)',
                      color: currentFingerMeta ? currentFingerMeta.colorHex : '#00f2fe',
                      boxShadow: currentFingerMeta ? `0 0 16px ${currentFingerMeta.colorHex}60` : '0 0 16px rgba(0, 242, 254, 0.5)',
                      borderBottom: `3px solid ${currentFingerMeta ? currentFingerMeta.colorHex : '#00f2fe'}`,
                    }}
                  >
                    {char === ' ' ? '␣' : char}
                  </span>
                </span>
              );
            }

            // Render Upcoming Chars
            return (
              <span
                key={index}
                className="text-slate-500/80 transition-colors"
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Invalid key alert popup */}
        {invalidKeyWarning && (
          <div className="absolute bottom-3 left-6 right-6 flex items-center gap-2 bg-amber-500/10 border border-amber-500/40 text-amber-300 text-xs px-3 py-1.5 rounded-lg backdrop-blur-md animate-fade-in font-mono">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{invalidKeyWarning}</span>
          </div>
        )}

        {/* Initial Prompt overlay if Idle */}
        {status === 'idle' && currentIndex === 0 && (
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-slate-200 text-sm font-medium shadow-xl">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Start typing to begin the 5-minute session</span>
            </div>
          </div>
        )}
      </div>

      {/* Helpful keyboard hint bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <div className="flex items-center gap-3">
          <span>Home Row: <strong className="text-slate-300">A S D F  J K L ;</strong></span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Space: <strong className="text-slate-300">Thumbs</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px]">Esc</kbd>
          <span>to restart</span>
        </div>
      </div>
    </div>
  );
}
