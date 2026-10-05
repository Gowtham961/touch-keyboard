import React from 'react';
import { certifications } from '../data/portfolioData';
import { Award, CheckCircle, ExternalLink, Calendar, ShieldCheck, Sparkles } from 'lucide-react';

export default function Certifications({ onOpenCert }) {
  return (
    <section id="certifications" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Achievements
          </h2>
          <p className="text-slate-400 text-sm">
            Professional certifications in Full-Stack Python, Enterprise Java, and Agile / Scrum workflows
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 border border-slate-800 hover:border-amber-500/40 shadow-xl transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-400">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    {cert.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-400">
                    Issuer: {cert.issuer}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {cert.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skillsCovered.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">{cert.year}</span>
                <button
                  onClick={onOpenCert}
                  className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 font-semibold transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
