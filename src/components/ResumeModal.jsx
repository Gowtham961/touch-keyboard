import React, { useEffect } from 'react';
import { personalInfo, education, experience, skillsCategories, projects, certifications } from '../data/portfolioData';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Code2, Github, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    confetti({ particleCount: 50, spread: 60 });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0f1422] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
        
        {/* Modal Controls Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
            <span className="text-sm font-bold text-white tracking-wide">
              Official Resume — {personalInfo.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Printable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 text-slate-900 bg-white print:p-0">
          
          {/* Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900 space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 uppercase">
              {personalInfo.name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs sm:text-sm text-slate-700 font-medium">
              <span>{personalInfo.phone}</span>
              <span>—</span>
              <span>{personalInfo.email}</span>
              <span>—</span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="flex justify-center items-center gap-4 text-xs text-blue-700 font-medium pt-1">
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
              <span>—</span>
              <a href={personalInfo.leetcode} target="_blank" rel="noreferrer" className="hover:underline">LeetCode</a>
              <span>—</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            </div>
          </div>

          {/* Objective */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              OBJECTIVE
            </h2>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify">
              Enthusiastic and detail-oriented B.Tech Electronics and Communication student with strong skills in Python, SQL, and web technologies. Experienced in developing full-stack projects with a focus on scalability and user experience. Seeking an entry-level Software Engineer role to contribute technical expertise and innovative solutions.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              EDUCATION
            </h2>
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                <span>Bharath Institute of Higher Education and Research (BIHER), Chennai</span>
                <span className="font-mono text-xs">2022 – 2026</span>
              </div>
              <div className="flex justify-between text-xs text-slate-700">
                <span>Bachelor of Technology in Electronics and Communication Engineering</span>
                <span className="font-bold text-slate-900">CGPA: 8.14</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              TECHNICAL SKILLS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-xs sm:text-sm">
              <div>
                <strong className="text-slate-950">Programming Languages:</strong> Python, JavaScript
              </div>
              <div>
                <strong className="text-slate-950">Web Technologies:</strong> HTML5, CSS3, JavaScript, React.js
              </div>
              <div>
                <strong className="text-slate-950">Database:</strong> MySQL
              </div>
              <div>
                <strong className="text-slate-950">Development Tools:</strong> Git, GitHub, VS Code
              </div>
              <div className="sm:col-span-2">
                <strong className="text-slate-950">AI & GenAI:</strong> Prompt Engineering
              </div>
            </div>
          </div>

          {/* Internship Experience */}
          <div className="space-y-3">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              INTERNSHIP
            </h2>

            {/* Internship 1: EduSkills */}
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                <span>EduSkills Java Full Stack Developer Intern</span>
                <span className="font-mono text-xs font-normal">Jan 2026 – Mar 2026</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-slate-800 space-y-0.5 pt-0.5">
                <li>Completed a 10-week virtual internship in Java Full Stack Development.</li>
                <li>Worked with HTML, CSS, Bootstrap, JavaScript, Core Java, Spring Boot, Hibernate, and MySQL.</li>
                <li>Gained hands-on experience in REST APIs, database integration, and version control using Git.</li>
                <li>Improved problem-solving and web application development skills through practical assignments.</li>
              </ul>
            </div>

            {/* Internship 2: Cod Tech */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-baseline text-xs sm:text-sm font-bold text-slate-900">
                <span>Cod Tech IT Solutions Private Limited</span>
                <span className="font-mono text-xs font-normal">Web Development Intern – Virtual</span>
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-slate-800 space-y-0.5 pt-0.5">
                <li>Assisted in building and enhancing web applications using HTML, CSS, JavaScript and AI tools under senior developer guidance.</li>
                <li>Designed and deployed a personal portfolio website to showcase projects and technical skills.</li>
                <li>Gained practical experience in teamwork, web development, and real-world project workflows.</li>
              </ul>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              PROJECTS
            </h2>
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Real-Time Saw Tooth Wave Generation using TMS320C6748 DSP Processor
              </div>
              <ul className="list-disc list-outside pl-4 text-xs text-slate-800 space-y-0.5 pt-0.5">
                <li>Developed a real-time saw tooth waveform generation system using Digital Signal Processing (DSP) techniques.</li>
                <li>Implemented waveform generation algorithms using TMS320C6748 DSP Trainer Kit and Code Composer Studio (CCS).</li>
                <li>Analyzed waveform parameters such as amplitude, frequency, and sampling rate using an oscilloscope.</li>
                <li>Utilized C programming, MATLAB, and DSP concepts for signal generation and waveform analysis.</li>
                <li>Improved understanding of real-time signal processing, DAC interfacing, and embedded system implementation.</li>
              </ul>
            </div>
          </div>

          {/* Certifications & Achievements */}
          <div className="space-y-1.5">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1">
              CERTIFICATIONS & ACHIEVEMENTS
            </h2>
            <div className="text-xs sm:text-sm text-slate-800">
              • Java Full Stack Development Internship – EduSkills
            </div>
          </div>

          {/* Declaration */}
          <div className="space-y-1.5 pt-2 border-t border-slate-300">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-950">
              DECLARATION
            </h2>
            <p className="text-xs text-slate-700 italic">
              • I hereby declare that the information provided above is true to the best of my knowledge and belief.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
