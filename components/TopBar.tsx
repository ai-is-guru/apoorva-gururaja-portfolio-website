
import React, { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, Pause } from 'lucide-react';
import { SPOTIFY_TRACK_INFO } from './SpotifyPlayer';

interface TopBarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isSpotifyPlaying?: boolean;
  onSpotifyPause?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ darkMode, toggleDarkMode, isSpotifyPlaying = false, onSpotifyPause }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update every minute instead of every second for better performance
    const timer = setInterval(() => setTime(new Date()), 60000);
    // Update immediately on mount
    setTime(new Date());
    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    return time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }, [time]);

  return (
    <div className="fixed top-4 left-4 right-4 sm:top-5 sm:left-5 sm:right-5 md:top-6 md:left-6 md:right-6 z-50 flex justify-between items-center pointer-events-none gap-2 sm:gap-3 md:gap-4 pt-safe">
      {/* Brand */}
      <div className="pointer-events-auto bg-white/20 dark:bg-black/20 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 rounded-full border border-white/20 text-slate-900 dark:text-white font-serif font-bold tracking-wide shadow-sm flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
         <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse"></span>
         <span className="text-xs sm:text-sm md:text-base">ApoorvaOS</span>
      </div>

      {/* Right Controls */}
      <div className="flex gap-3 sm:gap-4 md:gap-5 pointer-events-auto items-center flex-shrink min-w-0">
         {/* Spotify Widget - Shows when playing */}
         {isSpotifyPlaying && (
           <div className="bg-white/20 dark:bg-black/20 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2 md:px-4 md:py-2.5 rounded-full border border-white/20 shadow-sm flex items-center gap-2 sm:gap-2.5 md:gap-3 text-slate-900 dark:text-white max-w-[calc(100vw-200px)] sm:max-w-none overflow-hidden">
             <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 min-w-0">
               <span className="text-[9px] sm:text-[10px] md:text-xs font-medium text-slate-600 dark:text-neutral-400 whitespace-nowrap hidden xs:inline">Setting the vibe:</span>
               <span className="text-[9px] sm:text-xs md:text-sm font-serif font-semibold whitespace-nowrap truncate max-w-[80px] sm:max-w-none">{SPOTIFY_TRACK_INFO.trackName}</span>
               <span className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-neutral-500 whitespace-nowrap hidden md:inline">by {SPOTIFY_TRACK_INFO.artistName}</span>
             </div>
             {onSpotifyPause && (
               <button
                 onClick={onSpotifyPause}
                 className="p-1.5 sm:p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
                 aria-label="Pause music"
               >
                 <Pause size={12} className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
               </button>
             )}
           </div>
         )}

         {/* Big Visible Clock */}
         <div className="text-slate-900 dark:text-white font-serif font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl drop-shadow-md whitespace-nowrap">
            {formattedTime}
         </div>

         {/* Mini Toggle */}
         <button 
          onClick={toggleDarkMode}
          className="bg-white/20 dark:bg-black/20 backdrop-blur-md p-2.5 sm:p-3 md:p-3.5 rounded-full border border-white/20 shadow-sm hover:bg-white/40 transition-colors text-slate-900 dark:text-white flex-shrink-0"
        >
          {darkMode ? <Sun size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" /> : <Moon size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />}
        </button>
      </div>
    </div>
  );
};

export default React.memo(TopBar);