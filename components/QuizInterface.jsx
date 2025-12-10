import React from 'react';
import { Button } from './Button';

export const QuizInterface = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
  onSubmit
}) => {

  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">

      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 h-2 bg-surfaceHighlight rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
          <div 
            className="h-full bg-primary-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all duration-500 ease-out rounded-full" 
            style={{ width: `${progress}%` }} 
          />
        </div>
        <span className="text-xs font-bold text-primary-600 dark:text-primary-400 whitespace-nowrap tracking-wider">
          {currentIndex + 1} / {totalQuestions}
        </span>
      </div>


      <div className="bg-surface rounded-3xl p-5 sm:p-8 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 mb-6 border border-slate-200 dark:border-slate-800 relative overflow-hidden">

        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <h3 className="text-lg sm:text-xl font-bold text-onSurface leading-relaxed mb-6 relative z-10">
          {question.text}
        </h3>

        <div className="space-y-3 relative z-10">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all duration-200 flex items-center group
                ${selectedOptionId === option.id 
                  ? 'border-primary-500 bg-primary-500/10 shadow-sm' 
                  : 'border-slate-200 dark:border-slate-800 bg-surfaceHighlight/30 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-surfaceHighlight'
                }`}
            >
              <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-all duration-200
                ${selectedOptionId === option.id 
                  ? 'border-primary-500 bg-primary-500 text-white scale-110' 
                  : 'border-slate-300 dark:border-slate-600 text-transparent group-hover:border-slate-400'}`}>
                {selectedOptionId === option.id && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`text-sm font-medium transition-colors ${selectedOptionId === option.id ? 'text-onSurface' : 'text-slate-600 dark:text-slate-400 group-hover:text-onSurface'}`}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>


      <div className="flex justify-between items-center">
        <Button 
          variant="secondary" 
          onClick={onPrev} 
          disabled={currentIndex === 0}
          className={currentIndex === 0 ? "invisible" : ""}
        >
          Previous
        </Button>
        
        {isLastQuestion ? (
          <Button onClick={onSubmit} disabled={!selectedOptionId} className="bg-onSurface text-surface hover:bg-slate-700 dark:hover:bg-slate-200">
            Finish Quiz
          </Button>
        ) : (
          <Button onClick={onNext} disabled={!selectedOptionId}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
