import React from 'react';
import Navbar from './components/Navbar';
import StatsBar from './components/StatsBar';
import TypingBox from './components/TypingBox';
import HandsVisualizer from './components/HandsVisualizer';
import VirtualKeyboard from './components/VirtualKeyboard';
import LessonSelector from './components/LessonSelector';
import SessionHistory from './components/SessionHistory';
import ResultsModal from './components/ResultsModal';
import UseCasesModal from './components/UseCasesModal';
import MilestoneToast from './components/MilestoneToast';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cyber Grid Accent */}
      <div className="fixed inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 relative z-10">
        
        {/* Practice Session Stats Bar (5-Min Countdown, Total Keys Pressed, Accuracy) */}
        <StatsBar />

        {/* Typing Box Arena & Upcoming Key Visualizer */}
        <TypingBox />

        {/* Visual Guides: Hands & Virtual Keyboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HandsVisualizer />
          <VirtualKeyboard />
        </div>

        {/* Curriculum & Drills (Including Redux-Saga Async Resource Fetcher) */}
        <LessonSelector />

        {/* 📈 Session History — persisted across browser sessions via localStorage */}
        <SessionHistory />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-6 text-center text-xs text-slate-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <span>TypeFlow • 8-Key Touch Typing Mastery (A S D F J K L ;)</span>
          <span className="text-slate-400">
            Powered by React 18, Redux Toolkit & Redux-Saga Middleware
          </span>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ResultsModal />
      <UseCasesModal />

      {/* 🔔 Milestone streak toast — portal-like fixed overlay */}
      <MilestoneToast />
    </div>
  );
}
