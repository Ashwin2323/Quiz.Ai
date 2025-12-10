import React, { useState } from 'react';
import { Button } from './Button';

const PRESET_TOPICS = [
  "Wellness and Yoga",
  "Tech Trends",
  "Pop Culture 90s",
  "High School Science",
  "Frontend Development",
  "Backend Development"
];

export const TopicSelection = ({ onSelectTopic }) => {
  const [customTopic, setCustomTopic] = useState("");

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (customTopic.trim()) {
      onSelectTopic(customTopic.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-up">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-onSurface mb-4 tracking-tight">
          Level Up Your <span className="text-primary-500">Knowledge</span>
        </h2>
        <p className="text-onSurfaceMuted text-lg">Select a domain or engineer your own challenge.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        {PRESET_TOPICS.map((topic) => (
          <button
            key={topic}
            onClick={() => onSelectTopic(topic)}
            className="p-5 text-left rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-black/20 hover:border-primary-500 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 relative z-10">{topic}</span>
          </button>
        ))}
      </div>

      <div className="bg-surface p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg relative">
        <div className="bg-surfaceHighlight/50 backdrop-blur-sm p-5 rounded-xl">
            <label className="block text-sm font-semibold text-onSurfaceMuted mb-3 uppercase tracking-wider">Custom Challenge</label>
            <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="e.g. 'Artificial Intelligence'..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-background text-onSurface placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <Button type="submit" disabled={!customTopic.trim()} className="!py-2.5">
                Generate
            </Button>
            </form>
        </div>
      </div>
    </div>
  );
};
