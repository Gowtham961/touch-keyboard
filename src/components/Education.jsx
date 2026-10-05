import React from 'react';
import { education } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Star } from 'lucide-react';

export default function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Education & Qualifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous engineering foundation in Electronics & Communication at BIHER Chennai with strong mathematical fundamentals.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((item, idx) => {
            const isBTech = idx === 0;
            const isSSC = idx === 2;

            return (
              <div
                key={idx}
                className={`glass-panel glass-panel-hover rounded-3xl p-6 sm:p-8 border transition-all ${
                  isBTech
                    ? 'border-cyan-500/30 bg-slate-900/80 shadow-cyan-500/5'
                    : isSSC
                    ? 'border-amber-500/30 bg-slate-900/60'
                    : 'border-slate-800 bg-slate-900/50'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isBTech
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                            : isSSC
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.score}
                      </span>
                      {item.highlight && (
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-emerald-400" />
                          <span>{item.highlight}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.degree}
                    </h3>
                    <div className="text-sm font-medium text-cyan-300">
                      {item.field}
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-col md:items-end gap-1.5 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Institution & Details */}
                <div className="pt-4 space-y-2">
                  <div className="text-base font-semibold text-slate-200">
                    {item.institution}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
