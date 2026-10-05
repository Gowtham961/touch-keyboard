import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectLesson, fetchExternalLessonRequest } from '../store/slices/lessonSlice';
import { loadTargetText, setDuration } from '../store/slices/typingSlice';
import { BookOpen, CloudDownload, CheckCircle, Award, Sparkles, Loader2 } from 'lucide-react';

export default function LessonSelector() {
  const dispatch = useDispatch();
  const lessons = useSelector((state) => state.lesson.lessons);
  const currentLessonId = useSelector((state) => state.lesson.currentLessonId);
  const isFetchingExternal = useSelector((state) => state.lesson.isFetchingExternal);

  const handleSelectLesson = (lesson) => {
    dispatch(selectLesson(lesson.id));
    dispatch(setDuration(lesson.durationSeconds || (lesson.isTimed ? 300 : 0)));
    dispatch(loadTargetText(lesson.sampleText));
  };

  const handleFetchCloudDrill = () => {
    dispatch(fetchExternalLessonRequest({ topic: 'cloud-words' }));
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span className="text-xs uppercase tracking-wider font-bold text-slate-300">
            Practice Modules & Curriculum
          </span>
        </div>

        {/* Asynchronous Redux-Saga Resource Fetcher Button */}
        <button
          onClick={handleFetchCloudDrill}
          disabled={isFetchingExternal}
          title="Demonstrates Redux-Saga middleware fetching remote lesson packages asynchronously"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 active:scale-95 transition-all shadow-sm shadow-purple-500/10 disabled:opacity-50"
        >
          {isFetchingExternal ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400" />
          ) : (
            <CloudDownload className="w-3.5 h-3.5 text-purple-400" />
          )}
          <span>{isFetchingExternal ? 'Saga Fetching...' : 'Fetch Async Drill (Redux-Saga)'}</span>
        </button>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {lessons.map((lesson) => {
          const isSelected = lesson.id === currentLessonId;

          return (
            <div
              key={lesson.id}
              onClick={() => handleSelectLesson(lesson)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group text-left ${
                isSelected
                  ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span
                    className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold border ${
                      lesson.id === 'benchmark-5min'
                        ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                        : isSelected
                        ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {lesson.tag}
                  </span>
                  {isSelected && (
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  )}
                </div>

                {/* Lesson Title */}
                <h3
                  className={`text-sm font-semibold mb-1 line-clamp-1 group-hover:text-cyan-300 transition-colors ${
                    isSelected ? 'text-cyan-300 font-bold' : 'text-slate-200'
                  }`}
                >
                  {lesson.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  {lesson.description}
                </p>
              </div>

              {/* Keys Preview Footer */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Keys:</span>
                <span className="text-cyan-400 font-bold uppercase tracking-wider">
                  {lesson.keys.join(' ')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
