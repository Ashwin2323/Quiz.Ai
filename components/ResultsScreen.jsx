import React from 'react';
import { Button } from './Button';

export const ResultsScreen = ({
  score,
  total,
  feedback,
  topic,
  onRestart
}) => {
  const percentage = Math.round((score / total) * 100);
  

  const radius = 55;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-full max-w-md mx-auto text-center animate-slide-up">
      <div className="bg-surface rounded-3xl p-6 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 mb-6 border border-slate-200 dark:border-slate-800 relative overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
        
        <h2 className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mb-6">Result: {topic}</h2>
        
        <div className="relative flex items-center justify-center mb-6 h-40">
           <svg
              height="140"
              width="140"
              viewBox="0 0 140 140"
              className="transform -rotate-90 drop-shadow-md"
            >
              <circle
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth={stroke}
                fill="transparent"
                r={normalizedRadius}
                cx="70"
                cy="70"
              />
              <circle
                stroke="#10b981"
                strokeWidth={stroke}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-out" }}
                strokeLinecap="round"
                fill="transparent"
                r={normalizedRadius}
                cx="70"
                cy="70"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-4xl font-extrabold text-onSurface block tracking-tighter">{score}</span>
              <span className="text-onSurfaceMuted font-semibold text-xs">/ {total}</span>
            </div>
        </div>

        <h3 className="text-xl font-bold text-onSurface mb-6">
            {percentage >= 80 ? 'Outstanding!' : percentage >= 50 ? 'Good Effort!' : 'Keep Practicing!'}
        </h3>
        

        <div className="relative group text-left rounded-2xl bg-surfaceHighlight/50 border border-slate-200 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary-500/30">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600"></div>
            <div className="p-6 flex gap-4">
                <div className="shrink-0 pt-1">
                     <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                     </div>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-onSurface mb-1 uppercase tracking-wide">AI Feedback</h4>
                    <p className="text-onSurfaceMuted text-sm leading-relaxed">
                        {feedback}
                    </p>
                </div>
            </div>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} fullWidth>
          Start New Quiz
        </Button>
      </div>
    </div>
  );
};
