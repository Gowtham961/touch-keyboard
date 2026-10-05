import React, { useState, useEffect } from 'react';
import { personalInfo, stats } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Activity,
  ArrowRight,
  Download,
  Code2,
  Cpu,
  Globe
} from 'lucide-react';

export default function Hero({ onOpenResume, accent }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const roles = [
    'Python Full Stack Developer',
    'Software Engineer',
    'React.js Web Developer',
    'DSP & Embedded Systems Developer',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const getAccentGradient = () => {
    if (accent === 'purple') return 'from-purple-400 via-pink-400 to-indigo-400';
    if (accent === 'emerald') return 'from-emerald-400 via-teal-400 to-cyan-400';
    return 'from-cyan-400 via-sky-300 to-blue-500';
  };

  return (
    <section id="about" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text and Intro */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-slate-300">
                {personalInfo.status}
              </span>
            </div>

            {/* Main Greeting & Name */}
            <div className="space-y-2">
              <p className="text-sm font-mono tracking-wider uppercase text-cyan-400 font-semibold">
                Hi, my name is
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                <span className="text-slate-100">{personalInfo.name}</span>
              </h1>
              
              {/* Animated Changing Subtitle */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-slate-400 text-lg sm:text-2xl font-medium mr-2">I am a</span>
                <span
                  key={currentRoleIndex}
                  className={`text-xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getAccentGradient()} animate-pulse`}
                >
                  {roles[currentRoleIndex]}
                </span>
              </div>
            </div>

            {/* Bio summary from resume */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              B.Tech <strong className="text-white font-semibold">Electronics and Communication Engineering</strong> graduate from <span className="text-cyan-300 font-medium">BIHER Chennai</span> (CGPA: 8.14) with strong skills in <strong className="text-white font-semibold">Python</strong>, SQL, and web technologies. Experienced in building full-stack web applications and real-time DSP systems with <span className="text-cyan-300 font-medium">React.js</span>, Java, MySQL, and modern tooling.
            </p>

            {/* Quick Contact Chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all group"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/[\s-]+/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-cyan-500/50 transition-all group"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono">{personalInfo.phone}</span>
              </a>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/60">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{personalInfo.location}</span>
              </div>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-slate-300" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all"
              >
                <span>Interactive Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#dsp-lab"
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-cyan-500/30 hover:border-cyan-400 shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <Activity className="w-4 h-4 text-cyan-400 group-hover:animate-pulse" />
                <span>Launch DSP Lab</span>
              </a>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>View Full CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Gowtham's Portrait & Cyber Floating Cards */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-72 sm:w-80 md:w-96 aspect-square">
              
              {/* Outer Glowing Cyber Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-600/20 blur-2xl animate-pulse-slow"></div>

              {/* Decorative Concentric Rings */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-cyan-500/30 animate-spin-slow pointer-events-none"></div>
              <div className="absolute -inset-8 rounded-full border border-slate-800/80 pointer-events-none"></div>

              {/* Main Photo Frame */}
              <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-b from-cyan-400/40 via-blue-500/20 to-slate-900 border-2 border-cyan-400/50 shadow-2xl overflow-hidden group">
                <img
                  src={personalInfo.avatar}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subtle sheen overlay */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Floating Badge 1: Embedded DSP */}
              <div className="absolute -top-3 -left-6 bg-[#0d111b]/95 border border-cyan-500/40 backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Embedded DSP</div>
                  <div className="text-[10px] font-mono text-cyan-400">TMS320C6748 Lab</div>
                </div>
              </div>

              {/* Floating Badge 2: Python & React Web */}
              <div className="absolute -bottom-4 -right-4 bg-[#0d111b]/95 border border-purple-500/40 backdrop-blur-md rounded-xl p-3 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Python & React</div>
                  <div className="text-[10px] font-mono text-purple-400">Full-Stack Web</div>
                </div>
              </div>

              {/* Floating Badge 3: 8.14 CGPA */}
              <div className="absolute top-1/2 -right-8 -translate-y-1/2 hidden sm:flex bg-[#0d111b]/95 border border-emerald-500/40 backdrop-blur-md rounded-xl py-2 px-3 shadow-xl items-center gap-2">
                <span className="text-emerald-400 font-bold text-sm">8.14</span>
                <span className="text-[11px] text-slate-300">CGPA @ BIHER</span>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-4 sm:p-5 rounded-2xl border border-slate-800"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
