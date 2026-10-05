import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, Volume2, VolumeX, Cpu, Sliders, Code2, Info, RefreshCw } from 'lucide-react';

export default function OscilloscopeLab() {
  const canvasRef = useRef(null);
  const [waveType, setWaveType] = useState('sawtooth'); // 'sawtooth', 'sine', 'square'
  const [frequency, setFrequency] = useState(440); // Hz
  const [amplitude, setAmplitude] = useState(5.0); // Volts
  const [noise, setNoise] = useState(0.05); // Noise level
  const [samplingRate, setSamplingRate] = useState(48000); // Samples/sec
  const [isRunning, setIsRunning] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [activeTab, setActiveTab] = useState('scope'); // 'scope' | 'code' | 'hardware'

  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Handle Web Audio API for interactive sound preview
  useEffect(() => {
    if (isAudioOn) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();

        osc.type = waveType;
        osc.frequency.setValueAtTime(frequency, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime); // keep volume subtle & pleasant

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      } catch (err) {
        console.warn('AudioContext error:', err);
      }
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {}
        oscillatorRef.current = null;
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch (e) {}
        oscillatorRef.current = null;
      }
    };
  }, [isAudioOn, waveType]);

  // Update audio frequency dynamically
  useEffect(() => {
    if (oscillatorRef.current && audioCtxRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(
        frequency,
        audioCtxRef.current.currentTime
      );
    }
  }, [frequency]);

  // Canvas Oscilloscope Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const renderScope = () => {
      const w = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      // 1. Draw Oscilloscope Screen & Grid (Graticule)
      ctx.fillStyle = '#06101e';
      ctx.fillRect(0, 0, w, h);

      // Grid divisions
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.08)';
      ctx.lineWidth = 1;
      const divX = w / 10;
      const divY = h / 8;

      ctx.beginPath();
      for (let x = 0; x <= w; x += divX) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y <= h; y += divY) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Center crosshair axes
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(w, centerY);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      if (isRunning) {
        // Increment phase based on frequency
        phase += (frequency * 2 * Math.PI) / 12000;
      }

      // 2. Draw Waveform Trace (Glow effect)
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#00f2fe';
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const scaleY = (h * 0.35) * (amplitude / 10);
      const points = w;

      for (let x = 0; x < points; x++) {
        // Normalized t based on time/screen width
        const t = (x / w) * (frequency / 50) * Math.PI * 2 + phase;
        let yVal = 0;

        if (waveType === 'sawtooth') {
          // Mathematical sawtooth wave: 2 * ( (t/(2pi) mod 1) - 0.5 )
          const periodNorm = (t / (2 * Math.PI)) % 1;
          const positiveNorm = periodNorm < 0 ? periodNorm + 1 : periodNorm;
          yVal = 2 * (positiveNorm - 0.5);
        } else if (waveType === 'sine') {
          yVal = Math.sin(t);
        } else if (waveType === 'square') {
          yVal = Math.sin(t) >= 0 ? 0.95 : -0.95;
        }

        // Add simulated thermal/ADC noise
        if (noise > 0) {
          yVal += (Math.random() - 0.5) * noise;
        }

        const yPixel = centerY - yVal * scaleY;

        if (x === 0) ctx.moveTo(x, yPixel);
        else ctx.lineTo(x, yPixel);
      }

      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // 3. Draw on-screen telemetry
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(`CH1: ${amplitude.toFixed(1)}V/DIV`, 14, 22);
      ctx.fillText(`TIME: ${(1000 / frequency).toFixed(2)}ms`, 14, 38);
      ctx.fillText(`Fs: ${(samplingRate / 1000).toFixed(0)} kHz`, 14, 54);

      ctx.fillStyle = '#4ade80';
      ctx.fillText(`TRIGGER: AUTO [EDGE]`, w - 160, 22);
      ctx.fillText(`TMS320C6748 @ 456MHz`, w - 160, 38);

      animationId = requestAnimationFrame(renderScope);
    };

    renderScope();

    return () => cancelAnimationFrame(animationId);
  }, [waveType, frequency, amplitude, noise, samplingRate, isRunning]);

  return (
    <div id="dsp-lab" className="glass-panel rounded-3xl border border-cyan-500/30 overflow-hidden shadow-2xl p-6 sm:p-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                TMS320C6748 Real-Time DSP Signal Lab
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Live Simulator
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Interactive reproduction of Gowtham's Academic DSP Waveform Generation Project
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('scope')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'scope'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Oscilloscope
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            C & MATLAB Code
          </button>
          <button
            onClick={() => setActiveTab('hardware')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'hardware'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hardware Specs
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'scope' && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Oscilloscope Screen */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/40 shadow-inner bg-[#06101e]">
              <canvas
                ref={canvasRef}
                width={700}
                height={380}
                className="w-full h-auto aspect-[16/10] block"
              />
              
              {/* Screen Corner Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 tracking-wider">LIVE DSP SYNTH</span>
              </div>
            </div>

            {/* Oscilloscope Control Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-medium transition-all ${
                    isRunning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isRunning ? 'HOLD' : 'RUN'}</span>
                </button>

                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono font-medium transition-all ${
                    isAudioOn
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  {isAudioOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{isAudioOn ? 'Audio ON' : 'Mute Tone'}</span>
                </button>
              </div>

              {/* Waveform Selector */}
              <div className="flex items-center gap-1">
                <span className="text-slate-400 mr-1">Waveform:</span>
                {[
                  { id: 'sawtooth', label: 'Sawtooth (Resume Project)' },
                  { id: 'sine', label: 'Sine' },
                  { id: 'square', label: 'Square' },
                ].map((wave) => (
                  <button
                    key={wave.id}
                    onClick={() => setWaveType(wave.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                      waveType === wave.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    {wave.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Metrics Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Parameter Modulation</span>
              </h4>

              {/* Frequency slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Frequency (Hz):</span>
                  <span className="text-cyan-300 font-bold">{frequency} Hz</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1200"
                  step="10"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>50 Hz (Low Bass)</span>
                  <span>1.2 kHz (High Tone)</span>
                </div>
              </div>

              {/* Amplitude slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Peak Amplitude (Vpp):</span>
                  <span className="text-cyan-300 font-bold">{amplitude.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.5"
                  value={amplitude}
                  onChange={(e) => setAmplitude(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Noise slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Thermal Noise (ADC):</span>
                  <span className="text-cyan-300 font-bold">{(noise * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.25"
                  step="0.01"
                  value={noise}
                  onChange={(e) => setNoise(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Sampling Rate Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Sampling Rate (Fs):</span>
                  <span className="text-cyan-300 font-bold">{samplingRate / 1000} kHz</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[16000, 48000, 96000].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSamplingRate(rate)}
                      className={`py-1 rounded text-xs font-mono transition-all ${
                        samplingRate === rate
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rate / 1000}k
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Telemetry Summary Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/20 space-y-2">
              <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wide">
                Hardware Analysis Summary
              </div>
              <ul className="text-xs text-slate-300 space-y-1 font-mono">
                <li>• Period (T): {(1000 / frequency).toFixed(3)} ms</li>
                <li>• Nyquist Limit: {(samplingRate / 2000).toFixed(1)} kHz</li>
                <li>• DSP Clock: TMS320C6748 @ 456 MHz</li>
                <li>• Verification: Real Oscilloscope Probe</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Code Tab */}
      {activeTab === 'code' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>// C Algorithm (CCS TI Compiler)</span>
              <span>TMS320C6748</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`#include <stdio.h>
#include <c6x.h>
#include "dsk6748.h"

#define SAMPLING_FREQ 48000
#define FREQ_TARGET   1000
#define MAX_AMPLITUDE 32767

void generate_sawtooth_stream() {
    int step = (MAX_AMPLITUDE * 2 * FREQ_TARGET) / SAMPLING_FREQ;
    short sample = -MAX_AMPLITUDE;

    while(1) {
        // Output to McASP codec buffer
        output_left_sample(sample);
        output_right_sample(sample);

        sample += step;
        if(sample >= MAX_AMPLITUDE) {
            sample = -MAX_AMPLITUDE; // Reset ramp
        }
    }
}`}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span>% MATLAB Signal Synthesis & FFT Validation</span>
              <span>MATLAB R2024</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`Fs = 48000;              % Sampling frequency
t = 0:1/Fs:0.02;          % Time vector (20ms)
f = 1000;                 % Target 1 kHz
y = sawtooth(2 * pi * f * t);

% Calculate Fast Fourier Transform (FFT)
L = length(y);
Y = fft(y);
P2 = abs(Y / L);
P1 = P2(1:L/2 + 1);
P1(2:end-1) = 2 * P1(2:end-1);

% Plot Oscilloscope Correlation
figure;
plot(t * 1000, y, 'b', 'LineWidth', 1.5);
title('Synthesized Sawtooth Wave (TMS320C6748)');
xlabel('Time (ms)'); ylabel('Amplitude (V)');
grid on;`}
            </pre>
          </div>
        </div>
      )}

      {/* Hardware Specs Tab */}
      {activeTab === 'hardware' && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>TMS320C6748 Processor</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-performance 32-bit floating-point DSP from Texas Instruments operating up to 456 MHz. Features C674x VLIW core with dual datapaths and up to 3648 MIPS / 2746 MFLOPS.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Code Composer Studio</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Integrated development environment for TI embedded processors. Used for writing, compiling, loading C firmware onto target DSP flash, and real-time JTAG debugging.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Oscilloscope Validation</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Verified waveform amplitude, frequency accuracy, ramp linearity, and rise/fall transitions via digital storage oscilloscope probes connected directly to the DAC output header.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
