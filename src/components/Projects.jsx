import React, { useState } from 'react';
import { projects } from '../data/portfolioData';
import OscilloscopeLab from './OscilloscopeLab';
import TerminalContactBook from './TerminalContactBook';
import ArchitectureViewer from './ArchitectureViewer';
import { Cpu, Terminal, Server, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeInteractive, setActiveInteractive] = useState('dsp'); // 'dsp' | 'terminal' | 'arch'

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Embedded Systems & DSP', label: 'Embedded & DSP' },
    { id: 'Software Development', label: 'Python & CLI' },
    { id: 'Full Stack Development', label: 'Java Full Stack' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Portfolio Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Engineering Work
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real projects from academic research in Digital Signal Processing to full-stack enterprise Java systems and modular Python software.
          </p>
        </div>

        {/* Interactive Lab Selector Hub */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping inline-block"></span>
              <span>Live In-Browser Labs</span>
            </h3>

            <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveInteractive('dsp')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeInteractive === 'dsp'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>1. DSP Oscilloscope Lab</span>
              </button>

              <button
                onClick={() => setActiveInteractive('terminal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeInteractive === 'terminal'
                    ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>2. Python CLI Shell</span>
              </button>

              <button
                onClick={() => setActiveInteractive('arch')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeInteractive === 'arch'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Server className="w-4 h-4" />
                <span>3. Java REST Architecture</span>
              </button>
            </div>
          </div>

          {/* Render Active Interactive Lab */}
          <div>
            {activeInteractive === 'dsp' && <OscilloscopeLab />}
            {activeInteractive === 'terminal' && <TerminalContactBook />}
            {activeInteractive === 'arch' && <ArchitectureViewer />}
          </div>
        </div>

        {/* Project Details Cards Grid */}
        <div className="space-y-8 pt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-2xl font-bold text-white">Project Case Studies</h3>
              <p className="text-xs text-slate-400">Detailed technical deliverables from resume</p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-slate-700 text-white border border-slate-600'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-panel glass-panel-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Category */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                      {project.type}
                    </span>
                    <span className="text-xs text-slate-400">{project.category}</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h4>

                  {/* Short description */}
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.shortDesc}
                  </p>

                  {/* Resume Points */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {project.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools Tags & Action */}
                <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tools.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Quick test jump */}
                  <button
                    onClick={() => {
                      if (project.id === 'dsp-sawtooth') setActiveInteractive('dsp');
                      else if (project.id === 'python-contact-book') setActiveInteractive('terminal');
                      else setActiveInteractive('arch');
                      window.scrollTo({ top: document.getElementById('projects').offsetTop + 150, behavior: 'smooth' });
                    }}
                    className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Launch Interactive Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
