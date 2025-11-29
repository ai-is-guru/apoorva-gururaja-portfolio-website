
import React, { useMemo, useCallback, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, Briefcase, Image as ImageIcon, Mic, Newspaper, Mail, ShoppingBag, Calendar } from 'lucide-react';

const Dock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const apps = useMemo(() => [
    { name: 'Home', path: '/', icon: Home, color: 'text-blue-500' },
    { name: 'About', path: '/about', icon: User, color: 'text-yellow-500' },
    { name: 'Career', path: '/career', icon: Briefcase, color: 'text-indigo-500' },
    { name: 'Gallery', path: '/passion', icon: ImageIcon, color: 'text-rose-500' },
    { name: 'Podcast', path: '/aligned-intelligence', icon: Mic, color: 'text-purple-500' },
    { name: 'Shop', path: '/lifestyle', icon: ShoppingBag, color: 'text-pink-500' },
    { name: 'Blogs', path: '/blog', icon: Newspaper, color: 'text-orange-500' },
    { name: 'Calendar', path: '/calendar', icon: Calendar, color: 'text-blue-500' },
    { name: 'Contact', path: '/contact', icon: Mail, color: 'text-teal-500' },
  ], []);

  const isActive = useCallback((path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  }, [location.pathname]);

  return (
    <div className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 animate-fade-in flex justify-center w-full px-2 sm:px-0" style={{ overflow: 'visible', pointerEvents: 'none' }}>
      {/* Subtle glow effect behind the dock */}
      <div className="absolute inset-0 -bottom-3 blur-3xl opacity-30 dark:opacity-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full -z-10 animate-pulse-slow"></div>
      
      <div className="bg-white/90 dark:bg-black/70 backdrop-blur-2xl px-3 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-12 lg:py-6 rounded-full border-2 border-white/30 dark:border-white/20 shadow-2xl flex items-center justify-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.4)] dark:hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] max-w-[calc(100vw-2rem)] sm:max-w-none relative scrollbar-hide" style={{ pointerEvents: 'auto', overflowX: 'auto' }}>
        {apps.map((app) => {
          return (
            <div key={app.name} className="group relative flex-shrink-0">
              <button
                ref={(el) => { buttonRefs.current[app.name] = el; }}
                onMouseEnter={() => setHoveredApp(app.name)}
                onMouseLeave={() => setHoveredApp(null)}
                onClick={() => navigate(app.path)}
                className={`
                  p-2.5 sm:p-3 md:p-4 lg:p-5 rounded-full transition-all duration-300 ease-out flex items-center justify-center
                  hover:bg-white/60 dark:hover:bg-white/15 hover:scale-125 hover:rotate-6
                  active:scale-95 touch-manipulation
                  ${isActive(app.path) ? 'bg-white/70 dark:bg-white/25 shadow-lg scale-110 ring-2 ring-offset-2 ring-offset-transparent ring-white/40 dark:ring-white/30' : ''}
                `}
                aria-label={app.name}
              >
                <app.icon size={20} className={`${app.color} opacity-95 group-hover:opacity-100 transition-opacity sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8`} />
              </button>
              
              {/* Enhanced Active Indicator */}
              {isActive(app.path) && (
                <div className="absolute -bottom-2 sm:-bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 shadow-lg animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Tooltips rendered outside scrollable container */}
      {hoveredApp && buttonRefs.current[hoveredApp] && (() => {
        const buttonRect = buttonRefs.current[hoveredApp]?.getBoundingClientRect();
        if (!buttonRect) return null;
        return (
          <div
            key={hoveredApp}
            className="fixed pointer-events-none whitespace-nowrap z-[100] transition-opacity duration-200"
            style={{
              bottom: `${window.innerHeight - buttonRect.top + 12}px`,
              left: `${buttonRect.left + buttonRect.width / 2}px`,
              transform: 'translateX(-50%)',
            }}
          >
            <div className="bg-slate-900/90 dark:bg-white/90 backdrop-blur-md border border-slate-700/50 dark:border-slate-300/30 rounded-lg px-3 py-1.5 shadow-lg">
              <span className="text-xs font-medium text-white dark:text-slate-900">
                {hoveredApp}
              </span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-slate-900/90 dark:border-t-white/90"></div>
          </div>
        );
      })()}
    </div>
  );
};

export default React.memo(Dock);
