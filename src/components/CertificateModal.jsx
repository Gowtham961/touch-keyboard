import React, { useState } from 'react';
import { X, Award, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { personalInfo, certifications } from '../data/portfolioData';

export default function CertificateModal({ isOpen, onClose }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!isOpen) return null;

  const currentCert = certifications[selectedIdx] || certifications[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e1628] to-[#07090e] border border-amber-500/40 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 pr-10">
          {certifications.map((c, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                selectedIdx === idx
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {c.badge}
            </button>
          ))}
        </div>

        {/* Certificate Decorative Border */}
        <div className="border-2 border-dashed border-amber-500/30 rounded-2xl p-6 sm:p-8 relative">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-800">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mx-auto flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20">
              <Award className="w-7 h-7" />
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Certificate of Completion & Achievement
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentCert.title}
            </h3>
            <p className="text-xs text-slate-400">
              Verified Credential • {currentCert.issuer}
            </p>
          </div>

          {/* Body */}
          <div className="py-6 text-center space-y-3">
            <p className="text-xs text-slate-400">This credential certifies that</p>
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 tracking-wide uppercase">
              {personalInfo.name}
            </div>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              {currentCert.summary}
            </p>

            {/* Topics covered chips */}
            <div className="flex flex-wrap justify-center gap-1.5 pt-2">
              {currentCert.skillsCovered.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-amber-300/90 border border-slate-700"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Footer of Certificate */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-left space-y-0.5">
              <div className="text-slate-400 text-[11px]">Issuer Organization</div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{currentCert.issuer}</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
            </div>

            <div className="text-center sm:text-right space-y-0.5">
              <div className="text-slate-400 text-[11px]">Year of Issue</div>
              <div className="font-mono font-bold text-amber-400">{currentCert.year}</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
