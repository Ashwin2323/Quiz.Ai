import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md";
  
  const variants = {

    primary: "bg-primary-500 text-white dark:text-slate-950 hover:bg-primary-400 hover:shadow-primary-500/25 border border-transparent",
    

    secondary: "bg-surfaceHighlight text-onSurface hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent",
    

    outline: "bg-transparent text-primary-600 dark:text-primary-400 border border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-900/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
