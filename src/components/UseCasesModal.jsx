import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeInfoModal } from '../store/slices/uiSlice';
import { X, CheckCircle, Sparkles, Users, Cpu, Layers, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function UseCasesModal() {
  const dispatch = useDispatch();
  const showInfoModal = useSelector((state) => state.ui.showInfoModal);

  if (!showInfoModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => dispatch(closeInfoModal())}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">
              Architecture & Customer Use Cases
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Thought process, engineering choices, and multi-persona considerations
            </p>
          </div>
        </div>

        {/* Section 1: Customer Use Cases */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <Users className="w-4 h-4" />
            1. Comprehensive Customer Use Cases Addressed
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Persona 1 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono font-bold">1</span>
                <h4 className="text-sm font-semibold text-slate-200">The Absolute Beginner</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Has never touch-typed. Needs progressive scaffolding. Starts with anchor keys (<code className="text-emerald-400">F & J</code>) with tactile ridges, followed by pair additions (<code className="text-cyan-400">D & K</code>, <code className="text-blue-400">S & L</code>, <code className="text-purple-400">A & ;</code>). Vector hands visually illuminate exactly which finger to move.
              </p>
            </div>

            {/* Persona 2 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs font-mono font-bold">2</span>
                <h4 className="text-sm font-semibold text-slate-200">The Muscle Memory Builder</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspired by <em>ngram-type</em> reference. Drills high-frequency bigrams/trigrams (<code className="text-blue-300">asdf, jkl;, fjdk, sla;</code>) and alternating hand rolls. Instant procedural audio clicks give sub-millisecond tactile feedback.
              </p>
            </div>

            {/* Persona 3 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-mono font-bold">3</span>
                <h4 className="text-sm font-semibold text-slate-200">The 5-Minute Assessment Taker</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Meets the core requirement: rigorous measurement of <strong>total keys pressed in a 5-minute window</strong>, calculating real-time accuracy %, WPM, and KPM. Features dynamic infinite text streaming so fast typists never run out of stream.
              </p>
            </div>

            {/* Persona 4 */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-mono font-bold">4</span>
                <h4 className="text-sm font-semibold text-slate-200">The Adaptive Learner</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tracks accuracy per key (<code className="text-slate-200">A, S, D, F, J, K, L, ;</code>). At the end of the session, the system identifies the weakest finger and generates targeted practice sequences emphasizing those keys.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Architecture & Redux Saga */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-purple-400 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            2. Technical Architecture & Redux-Saga Middleware
          </h3>

          <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-xs text-slate-200">Redux Toolkit State Management:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Predictable state slices (<code className="text-cyan-300">typingSlice</code>, <code className="text-cyan-300">lessonSlice</code>, <code className="text-cyan-300">uiSlice</code>) tracking every keystroke, accuracy formula, and active key.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-xs text-slate-200">Redux-Saga Async Middleware:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  <code className="text-purple-300">lessonSaga</code> handles asynchronous external resource access (<code className="text-slate-300">fetchExternalLessonRequest</code>), while <code className="text-purple-300">timerSaga</code> guarantees drift-free 1-second countdown intervals using Saga <code className="text-slate-300">delay</code> and cancellation race effects.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-xs text-slate-200">Web Audio API Sound Engine:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Procedurally synthesized mechanical click tones and completion fanfares. Zero external MP3/WAV dependencies, preventing 404s and enabling full offline support.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-xs text-slate-200">CSS3 & SVG Vector Visuals:</strong>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hardware-accelerated CSS keypress transforms, finger glow aura animations, and full anatomical hand SVGs with home ridge anchor guidance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-3 border-t border-slate-800">
          <button
            onClick={() => dispatch(closeInfoModal())}
            className="px-6 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
          >
            Back to Practice
          </button>
        </div>

      </div>
    </div>
  );
}
