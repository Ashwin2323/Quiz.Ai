import React, { useState, useEffect } from 'react';
import { AppStatus } from './types';
import { generateQuizQuestions, generateQuizFeedback } from './services/geminiService';
import { TopicSelection } from './components/TopicSelection';
import { QuizInterface } from './components/QuizInterface';
import { ResultsScreen } from './components/ResultsScreen';
import { Button } from './components/Button';


const INITIAL_STATE = {
  status: AppStatus.TOPIC_SELECTION,
  topic: "",
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  feedback: "",
  error: null,
};

const App = () => {
  const [state, setState] = useState(INITIAL_STATE);
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const handleTopicSelect = async (topic) => {
    setState(prev => ({ ...prev, status: AppStatus.LOADING, topic, error: null }));
    
    try {
      const questions = await generateQuizQuestions(topic);
      setState(prev => ({ 
        ...prev, 
        questions, 
        status: AppStatus.QUIZ,
        currentQuestionIndex: 0,
        userAnswers: {}
      }));
    } catch (err) {
      setState(prev => ({ 
        ...prev, 
        status: AppStatus.ERROR, 
        error: err.message || "Failed to generate quiz." 
      }));
    }
  };


  const handleSelectOption = (optionId) => {
    const currentQuestionId = state.questions[state.currentQuestionIndex].id;
    setState(prev => ({
      ...prev,
      userAnswers: { ...prev.userAnswers, [currentQuestionId]: optionId }
    }));
  };


  const handleNext = () => {
    setState(prev => ({ 
      ...prev, 
      currentQuestionIndex: Math.min(prev.currentQuestionIndex + 1, prev.questions.length - 1) 
    }));
  };

  const handlePrev = () => {
    setState(prev => ({ 
      ...prev, 
      currentQuestionIndex: Math.max(prev.currentQuestionIndex - 1, 0) 
    }));
  };


  const handleSubmit = async () => {

    let score = 0;
    state.questions.forEach(q => {
      if (state.userAnswers[q.id] === q.correctOptionId) {
        score++;
      }
    });

    setState(prev => ({ ...prev, status: AppStatus.GENERATING_FEEDBACK }));

    try {
      const feedback = await generateQuizFeedback(state.topic, score, state.questions.length);
      setState(prev => ({ ...prev, feedback, status: AppStatus.RESULTS }));
    } catch (err) {

      setState(prev => ({ 
        ...prev, 
        feedback: "Feedback currently unavailable.", 
        status: AppStatus.RESULTS 
      }));
    }
  };

  const handleRestart = () => {
    setState(INITIAL_STATE);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-onSurface selection:bg-primary-500 selection:text-white transition-colors duration-300">

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-900/5 dark:bg-primary-900/10 rounded-full blur-[120px] transition-opacity duration-500"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-primary-600/5 dark:bg-primary-600/5 rounded-full blur-[100px] transition-opacity duration-500"></div>
      </div>

      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={handleRestart}>
           <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/20 flex items-center justify-center text-white font-extrabold text-xl group-hover:scale-105 transition-transform">Q</div>
           <h1 className="text-xl font-bold tracking-tight text-onSurface group-hover:text-primary-500 transition-colors">Quiz.ai</h1>
        </div>
        

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-surfaceHighlight hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm text-onSurface"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </header>

      <main className="w-full max-w-4xl pt-12 relative z-10">
        
        {state.status === AppStatus.TOPIC_SELECTION && (
          <TopicSelection onSelectTopic={handleTopicSelect} />
        )}

        {(state.status === AppStatus.LOADING || state.status === AppStatus.GENERATING_FEEDBACK) && (
          <div className="flex flex-col items-center justify-center animate-fade-in space-y-8">
            <div className="relative w-24 h-24">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 dark:border-slate-800 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-500 rounded-full border-t-transparent animate-spin shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="text-center">
                <p className="text-onSurface font-semibold text-lg animate-pulse-glow mb-2">
                {state.status === AppStatus.LOADING 
                    ? `Generating "${state.topic}" Challenge` 
                    : "Analyzing Your Performance"}
                </p>

            </div>
          </div>
        )}

        {state.status === AppStatus.ERROR && (
            <div className="text-center animate-fade-in max-w-md mx-auto bg-surface p-8 rounded-3xl shadow-2xl shadow-black/10 dark:shadow-black/50 border border-slate-200 dark:border-slate-800">
                <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-onSurface">System Error</h3>
                <p className="text-onSurfaceMuted mb-8">{state.error}</p>
                <Button onClick={handleRestart} variant="secondary" fullWidth>Retry Connection</Button>
            </div>
        )}

        {state.status === AppStatus.QUIZ && state.questions.length > 0 && (
          <QuizInterface
            question={state.questions[state.currentQuestionIndex]}
            currentIndex={state.currentQuestionIndex}
            totalQuestions={state.questions.length}
            selectedOptionId={state.userAnswers[state.questions[state.currentQuestionIndex].id]}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            onSubmit={handleSubmit}
          />
        )}

        {state.status === AppStatus.RESULTS && (
          <ResultsScreen
            score={state.questions.filter(q => state.userAnswers[q.id] === q.correctOptionId).length}
            total={state.questions.length}
            feedback={state.feedback}
            topic={state.topic}
            userAnswers={state.userAnswers}
            questions={state.questions}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
};

export default App;
