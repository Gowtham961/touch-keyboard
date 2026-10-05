import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { loadSessions } from '../utils/storage';
import { History, Hash, Target, Zap, Calendar, TrendingUp, TrendingDown, Minus, Trash2 } from 'lucide-react';

function Trend({ current, previous }) {
  if (previous === undefined || previous === null) return <Minus className="w-3 h-3 text-slate-500" />;
  if (current > previous) return <TrendingUp className="w-3 h-3 text-emerald-400" />;
  if (current < previous) return <TrendingDown className="w-3 h-3 text-rose-400" />;
  return <Minus className="w-3 h-3 text-slate-500" />;
}

function formatDate(isoString) {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '—';
  }
}

export default function SessionHistory() {
  // Recompute when typing status changes (e.g. → 'completed' means a new session was just saved)
  const typingStatus = useSelector((state) => state.typing.status);
  const [refreshKey, setRefreshKey] = React.useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sessions = useMemo(() => loadSessions(), [typingStatus, refreshKey]);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('typeflow_sessions');
      localStorage.removeItem('typeflow_pb');
    } catch { /* ignore */ }
    setRefreshKey((k) => k + 1);
  };

  if (sessions.length === 0) {
    return (
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-slate-400" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Session History</span>
        </div>
        <p className="text-xs text-slate-500 font-mono text-center py-6">
          No sessions yet. Complete your first 5-minute test to see history here.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">Session History</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
            Last {sessions.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-slate-500 font-mono hidden sm:block">↑ = improved vs previous</span>
          <button
            onClick={handleClearHistory}
            title="Clear session history & personal best"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-rose-400 bg-rose-500/5 border border-rose-500/20 hover:bg-rose-500/15 transition-all"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="text-slate-500 uppercase tracking-wider text-[10px]">
              <th className="text-left pb-2 pr-4 font-semibold">#</th>
              <th className="text-left pb-2 pr-4 font-semibold">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
              </th>
              <th className="text-right pb-2 pr-4 font-semibold">
                <span className="flex items-center gap-1 justify-end"><Hash className="w-3 h-3 text-cyan-400" /> Keys</span>
              </th>
              <th className="text-right pb-2 pr-4 font-semibold">
                <span className="flex items-center gap-1 justify-end"><Target className="w-3 h-3 text-emerald-400" /> Acc %</span>
              </th>
              <th className="text-right pb-2 font-semibold">
                <span className="flex items-center gap-1 justify-end"><Zap className="w-3 h-3 text-blue-400" /> WPM</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sessions.map((s, idx) => {
              const prev = sessions[idx + 1];
              const isLatest = idx === 0;
              return (
                <tr
                  key={s.date + idx}
                  className={`transition-colors ${isLatest ? 'bg-cyan-500/5' : 'hover:bg-slate-800/40'}`}
                >
                  <td className="py-2 pr-4 text-slate-500">{idx + 1}</td>
                  <td className="py-2 pr-4 text-slate-300 whitespace-nowrap">
                    {formatDate(s.date)}
                    {isLatest && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-[9px] font-bold">
                        LATEST
                      </span>
                    )}
                  </td>
                  <td className="py-2 pr-4 text-right">
                    <span className={`font-bold ${isLatest ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {s.totalKeys}
                    </span>
                    <span className="ml-1">
                      <Trend current={s.totalKeys} previous={prev?.totalKeys} />
                    </span>
                  </td>
                  <td className="py-2 pr-4 text-right">
                    <span className={`font-bold ${
                      s.accuracy >= 95 ? 'text-emerald-400' :
                      s.accuracy >= 85 ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {s.accuracy}%
                    </span>
                    <span className="ml-1">
                      <Trend current={s.accuracy} previous={prev?.accuracy} />
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <span className={`font-bold ${isLatest ? 'text-blue-300' : 'text-slate-300'}`}>
                      {s.wpm}
                    </span>
                    <span className="ml-1">
                      <Trend current={s.wpm} previous={prev?.wpm} />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
