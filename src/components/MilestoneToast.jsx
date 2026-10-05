import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMilestone } from '../store/slices/typingSlice';
import { Flame, Star, Zap, Trophy, Sparkles } from 'lucide-react';

const MILESTONE_CONFIG = {
  10:  { icon: Flame,    label: '10 streak!',   color: 'from-orange-500 to-amber-400',   textColor: 'text-orange-300',   glow: 'shadow-orange-500/50' },
  25:  { icon: Zap,      label: '25 streak!',   color: 'from-yellow-500 to-amber-300',   textColor: 'text-yellow-300',   glow: 'shadow-yellow-500/50' },
  50:  { icon: Star,     label: '50 streak!',   color: 'from-cyan-500 to-blue-400',      textColor: 'text-cyan-200',     glow: 'shadow-cyan-500/60'   },
  100: { icon: Trophy,   label: '100 streak!',  color: 'from-purple-500 to-pink-400',    textColor: 'text-purple-200',   glow: 'shadow-purple-500/60' },
  200: { icon: Sparkles, label: '200 LEGEND!',  color: 'from-emerald-400 to-cyan-400',   textColor: 'text-emerald-200',  glow: 'shadow-emerald-500/70'},
};

export default function MilestoneToast() {
  const dispatch = useDispatch();
  const activeMilestone = useSelector((state) => state.typing.activeMilestone);
  const timerRef = useRef(null);

  useEffect(() => {
    if (activeMilestone) {
      // Auto-dismiss after 2.5s
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        dispatch(clearMilestone());
      }, 2500);
    }
    return () => clearTimeout(timerRef.current);
  }, [activeMilestone, dispatch]);

  if (!activeMilestone) return null;

  const cfg = MILESTONE_CONFIG[activeMilestone.threshold] || MILESTONE_CONFIG[10];
  const Icon = cfg.icon;

  return (
    <div
      key={activeMilestone.id}
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      {/* Animated toast pill */}
      <div
        className={`
          flex items-center gap-3 px-5 py-3 rounded-2xl
          bg-gradient-to-r ${cfg.color}
          shadow-2xl ${cfg.glow}
          border border-white/20
          animate-bounce-in
          text-white font-bold text-base tracking-wide
        `}
        style={{
          animation: 'milestoneIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}
      >
        <Icon className="w-6 h-6 drop-shadow-md" />
        <span className="drop-shadow">{cfg.label}</span>
        <span className="text-sm font-mono opacity-80">Keep going! 🔥</span>
      </div>

      <style>{`
        @keyframes milestoneIn {
          0%   { transform: translateY(-20px) scale(0.8); opacity: 0; }
          60%  { transform: translateY(4px)  scale(1.05); opacity: 1; }
          100% { transform: translateY(0px)  scale(1);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
