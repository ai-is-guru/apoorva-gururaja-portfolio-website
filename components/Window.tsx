import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string; // Kept for backward compat but ignored in standard style
}

const Window: React.FC<WindowProps> = ({ title, icon, children, className = "" }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-pop-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity touch-manipulation" 
        onClick={() => navigate('/')}
      ></div>

      {/* Modal Content - Fixed standard size for uniformity */}
      <div className="relative w-full sm:w-[95vw] md:w-[90vw] max-w-6xl h-[95vh] sm:h-[90vh] md:h-[85vh] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/20 dark:border-white/5 perspective-container transform transition-all duration-300">
        
        {/* Minimal Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 border-b border-gray-100/50 dark:border-white/5 bg-white/50 dark:bg-black/20 z-10 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
             <div className="p-1.5 sm:p-2 bg-slate-100 dark:bg-white/10 rounded-full text-slate-600 dark:text-white flex-shrink-0">
                {icon}
             </div>
             <h2 className="text-base sm:text-lg md:text-xl font-serif font-bold text-slate-900 dark:text-white tracking-tight truncate">{title}</h2>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-500 dark:text-white flex-shrink-0 touch-manipulation"
            aria-label="Close"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={`flex-1 overflow-y-auto thin-scrollbar ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;