import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TrendingUp } from 'lucide-react';

export default function WpmSparkline() {
  const wpmHistory = useSelector((state) => state.typing.wpmHistory);
  const status     = useSelector((state) => state.typing.status);
  const canvasRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    if (wpmHistory.length < 2) {
      // Draw empty baseline
      ctx.strokeStyle = 'rgba(148,163,184,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height - 2);
      ctx.lineTo(width, height - 2);
      ctx.stroke();
      return;
    }

    const maxWpm = Math.max(...wpmHistory.map((p) => p.wpm), 10);
    const minWpm = Math.min(...wpmHistory.map((p) => p.wpm), 0);
    const range  = maxWpm - minWpm || 1;

    const xStep = width / (wpmHistory.length - 1);

    const toX = (i)   => i * xStep;
    const toY = (wpm) => height - 4 - ((wpm - minWpm) / range) * (height - 8);

    // Draw gradient fill below the line
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0,   'rgba(34,211,238,0.35)');
    grad.addColorStop(1,   'rgba(34,211,238,0.00)');

    ctx.beginPath();
    wpmHistory.forEach((p, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(p.wpm));
      else ctx.lineTo(toX(i), toY(p.wpm));
    });
    ctx.lineTo(toX(wpmHistory.length - 1), height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Draw line
    ctx.beginPath();
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth   = 2;
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    wpmHistory.forEach((p, i) => {
      if (i === 0) ctx.moveTo(toX(i), toY(p.wpm));
      else ctx.lineTo(toX(i), toY(p.wpm));
    });
    ctx.stroke();

    // Draw last point dot
    const last = wpmHistory[wpmHistory.length - 1];
    ctx.beginPath();
    ctx.arc(toX(wpmHistory.length - 1), toY(last.wpm), 3, 0, Math.PI * 2);
    ctx.fillStyle = '#22d3ee';
    ctx.fill();
  }, [wpmHistory]);

  if (status === 'idle') return null;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
        <TrendingUp className="w-3 h-3 text-cyan-400" />
        <span>WPM over time</span>
      </div>
      <canvas
        ref={canvasRef}
        width={140}
        height={36}
        className="rounded-lg bg-slate-950/60 border border-slate-800"
      />
    </div>
  );
}
