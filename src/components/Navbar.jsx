import { Volume2, VolumeX, Keyboard, Eye, EyeOff, RotateCcw, HelpCircle, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSound, toggleHands, toggleKeyboard, openInfoModal } from '../store/slices/uiSlice';
import { resetSession } from '../store/slices/typingSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const soundEnabled = useSelector((state) => state.ui.soundEnabled);
  const showHands = useSelector((state) => state.ui.showHands);
  const showKeyboard = useSelector((state) => state.ui.showKeyboard);
  const currentLessonId = useSelector((state) => state.lesson.currentLessonId);

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-lg">
              8K
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-1.5">
                TypeFlow <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">ASDF JKL;</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Home Row Touch Typing Mastery • 8 Keys & Muscle Memory
            </p>
          </div>
        </div>

        {/* Global Controls & Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Restart Button */}
          <button
            onClick={() => dispatch(resetSession())}
            title="Reset Session (Esc / Restart)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 transition-all active:scale-95 hover:border-slate-600"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Restart</span>
          </button>

          {/* Hands Visualizer Toggle */}
          <button
            onClick={() => dispatch(toggleHands())}
            title={showHands ? 'Hide Hands Visualizer' : 'Show Hands Visualizer'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showHands
                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/10'
                : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {showHands ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">Hands Guide</span>
          </button>

          {/* Virtual Keyboard Toggle */}
          <button
            onClick={() => dispatch(toggleKeyboard())}
            title={showKeyboard ? 'Hide Virtual Keyboard' : 'Show Virtual Keyboard'}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              showKeyboard
                ? 'bg-blue-500/10 border-blue-500/40 text-blue-300 shadow-sm shadow-blue-500/10'
                : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Keyboard</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => dispatch(toggleSound())}
            title={soundEnabled ? 'Mute Mechanical Click Sound' : 'Enable Mechanical Click Sound'}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-purple-500/10 border-purple-500/40 text-purple-300'
                : 'bg-slate-900/80 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Use Cases & Architecture Guide Button */}
          <button
            onClick={() => dispatch(openInfoModal())}
            title="Design Thought Process, Customer Use Cases & Redux Saga Specs"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shadow-sm shadow-emerald-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Use Cases & Specs</span>
          </button>
        </div>

      </div>
    </header>
  );
}
