import React, { useState } from 'react';
import { skillsCategories } from '../data/portfolioData';
import { Code2, Server, Cpu, Wrench, Sparkles, Check } from 'lucide-react';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const iconMap = {
    Code2: Code2,
    Server: Server,
    Cpu: Cpu,
    Wrench: Wrench,
  };

  const getAccentColor = (color) => {
    switch (color) {
      case 'cyan':
        return {
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          bar: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          ring: 'border-cyan-500/40',
        };
      case 'purple':
        return {
          badge: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
          bar: 'bg-gradient-to-r from-purple-500 to-pink-500',
          ring: 'border-purple-500/40',
        };
      case 'emerald':
        return {
          badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
          bar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
          ring: 'border-emerald-500/40',
        };
      case 'amber':
        return {
          badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
          bar: 'bg-gradient-to-r from-amber-500 to-orange-500',
          ring: 'border-amber-500/40',
        };
      default:
        return {
          badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
          bar: 'bg-gradient-to-r from-cyan-500 to-blue-500',
          ring: 'border-cyan-500/40',
        };
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Skills & Technical Stack
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            An agile engineering toolset bridging full-stack backend development with embedded real-time signal processing.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {skillsCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] || Code2;
            const isSelected = activeCategory === idx;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-white border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/10 scale-105'
                    : 'bg-slate-900/70 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Category Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsCategories.map((category, catIdx) => {
            const Icon = iconMap[category.icon] || Code2;
            const style = getAccentColor(category.color);
            const isHighlighted = activeCategory === catIdx;

            return (
              <div
                key={category.category}
                className={`glass-panel rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between ${
                  isHighlighted
                    ? `bg-slate-900/90 ${style.ring} shadow-xl scale-[1.02]`
                    : 'border-slate-800/80 hover:border-slate-700 opacity-90 hover:opacity-100'
                }`}
              >
                <div className="space-y-6">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${style.badge}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-white">{category.category}</h3>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50">
                            {skill.tag}
                          </span>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ${style.bar}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom chip */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Proficiency Verified</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Highlights Strip */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900 to-purple-950/30 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-cyan-400">Java + Spring Boot</div>
            <div className="text-xs text-slate-400 mt-0.5">RESTful Enterprise APIs</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
          <div>
            <div className="text-xl font-bold text-emerald-400">TMS320C6748 DSP</div>
            <div className="text-xs text-slate-400 mt-0.5">Real-time Embedded C & CCS</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
          <div>
            <div className="text-xl font-bold text-purple-400">MySQL & Hibernate</div>
            <div className="text-xs text-slate-400 mt-0.5">Relational ORM Data Layer</div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>
          <div>
            <div className="text-xl font-bold text-amber-400">Python 3</div>
            <div className="text-xs text-slate-400 mt-0.5">Modular CLI & JSON Storage</div>
          </div>
        </div>

      </div>
    </section>
  );
}
