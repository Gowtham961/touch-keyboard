import React from 'react';
import { experience, certifications } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, Award, CheckCircle2, ChevronRight, FileCheck, GitBranch } from 'lucide-react';

export default function Experience({ onOpenCert }) {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono uppercase tracking-wider">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Industrial Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Internship & Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Hands-on professional software engineering training and full-stack enterprise development.
          </p>
        </div>

        {/* Experience Timeline Card */}
        <div className="max-w-4xl mx-auto">
          {experience.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"></div>

              {/* Title & Organization Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>{item.duration}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <div className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
                    <span>{item.company}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs font-normal text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Period & Certificate Action */}
                <div className="flex flex-col sm:items-end gap-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>

                  <button
                    onClick={onOpenCert}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition-all group"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>View Certificate</span>
                    <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="py-6 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {/* Bullets directly from resume */}
                <div className="space-y-3">
                  {item.highlights.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-6 border-t border-slate-800/80 space-y-3">
                <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technologies & Tools Applied:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
