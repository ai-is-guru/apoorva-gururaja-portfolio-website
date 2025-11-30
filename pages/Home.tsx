
import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Play, Mic, Image as ImageIcon, Briefcase, Linkedin, Github, Moon, Sun, ShoppingBag, Coffee, Calendar as CalendarIcon } from 'lucide-react';
import { PODCAST_EPISODES, JOBS, GALLERY_IMAGES, BLOG_POSTS } from '../constants';
import SpotifyPlayer from '../components/SpotifyPlayer';

// Tilt Component for 3D Effect
interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  image?: string; // Optional background image
  variant?: 'solid' | 'glass' | 'custom';
}

const TiltCard = ({ children, className = "", to, onClick, image, variant = 'glass' }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastEventRef = useRef<React.MouseEvent | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Skip tilt effect on touch devices for better performance
    if (isTouchDevice) return;
    lastEventRef.current = e;
    
    // Update widget position and hover for bird avoidance
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const widgetId = ref.current.getAttribute('data-widget-id');
      
      if (widgetId) {
        const positionEvent = new CustomEvent('widgetPosition', {
          detail: {
            id: widgetId,
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
          }
        });
        window.dispatchEvent(positionEvent);
      }
      
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const hoverEvent = new CustomEvent('widgetHover', {
        detail: { 
          x: centerX, 
          y: centerY, 
          active: true,
          width: rect.width,
          height: rect.height
        }
      });
      window.dispatchEvent(hoverEvent);
    }
    
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current || !lastEventRef.current) {
          rafRef.current = null;
          return;
        }
        
        const rect = ref.current.getBoundingClientRect();
        const x = lastEventRef.current.clientX - rect.left;
        const y = lastEventRef.current.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Subtle tilt
        const rotateX = ((y - centerY) / centerY) * -1.5; 
        const rotateY = ((x - centerX) / centerX) * 1.5;

        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
        
        rafRef.current = null;
        lastEventRef.current = null;
      });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Generate unique ID for this widget
    const widgetId = ref.current.getAttribute('data-widget-id') || `widget-${Math.random().toString(36).substr(2, 9)}`;
    if (!ref.current.getAttribute('data-widget-id')) {
      ref.current.setAttribute('data-widget-id', widgetId);
    }
    
    // Emit widget position update
    const positionEvent = new CustomEvent('widgetPosition', {
      detail: {
        id: widgetId,
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      }
    });
    window.dispatchEvent(positionEvent);
    
    // Emit custom event for widget hover
    const hoverEvent = new CustomEvent('widgetHover', {
      detail: { x: centerX, y: centerY, active: true }
    });
    window.dispatchEvent(hoverEvent);
  };

  const handleMouseLeave = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    lastEventRef.current = null;
    
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    
    // Emit custom event for widget leave
    const event = new CustomEvent('widgetHover', {
      detail: { x: 0, y: 0, active: false }
    });
    window.dispatchEvent(event);
  };

  // Base styles:
  // If image is present -> Text White, Overlay Dark
  const isImageWidget = !!image;
  
  let themeClasses = '';
  
  if (isImageWidget) {
      // Image widgets always dark overlay with white text
      themeClasses = 'bg-neutral-900 border-neutral-800 text-white shadow-2xl';
  } else {
      // Solid/Glass widgets
      // Light Mode: White Background, Dark Text
      // Dark Mode: Dark Background, White Text
      themeClasses = 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-slate-900 dark:text-white shadow-lg dark:shadow-2xl';
  }

  const Content = (
    <div 
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative h-full w-full overflow-hidden rounded-2xl 
        border transition-all duration-300 group touch-manipulation
        ${themeClasses} ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out', zIndex: 10, position: 'relative', WebkitTapHighlightColor: 'transparent', pointerEvents: 'auto' }}
    >
      {/* Background Image Layer */}
      {image && (
        <>
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img src={image} alt="" loading="lazy" className={`w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0 ${to === '/aligned-intelligence' ? 'blur-[2px]' : ''}`} />
            </div>
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30 z-0"></div>
        </>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );

  if (to) {
    return <Link to={to} className="block h-full w-full">{Content}</Link>;
  }
  return Content;
};

interface HomeProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  onSpotifyPlay?: () => void;
  onSpotifyPause?: () => void;
  isSpotifyPlaying?: boolean;
}

const ComingSoonBadge = () => (
  <div className="absolute top-0 right-0 bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm z-50 uppercase tracking-wider pointer-events-none">
    Coming Soon
  </div>
);

const Home: React.FC<HomeProps> = ({ darkMode, toggleDarkMode, onSpotifyPlay, onSpotifyPause, isSpotifyPlaying = false }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);
  
  const latestEpisode = useMemo(() => PODCAST_EPISODES[0], []);
  const currentJob = useMemo(() => JOBS[0], []);
  const isBrewing = useMemo(() => currentJob.id === 'next-play', [currentJob.id]);

  const handleSpotifyToggle = useCallback(() => {
    onSpotifyPlay?.();
  }, [onSpotifyPlay]);

  // Slideshow logic for Gallery
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, []);

  // Track all widget positions for bird avoidance
  useEffect(() => {
    const updateWidgetPositions = () => {
      const widgets = document.querySelectorAll('[data-widget-id]');
      widgets.forEach((widget) => {
        const rect = widget.getBoundingClientRect();
        const widgetId = widget.getAttribute('data-widget-id');
        if (widgetId) {
          const positionEvent = new CustomEvent('widgetPosition', {
            detail: {
              id: widgetId,
              x: rect.left,
              y: rect.top,
              width: rect.width,
              height: rect.height
            }
          });
          window.dispatchEvent(positionEvent);
        }
      });
    };

    // Update positions on mount and resize
    updateWidgetPositions();
    window.addEventListener('resize', updateWidgetPositions);
    const interval = setInterval(updateWidgetPositions, 1000); // Update every second

    return () => {
      window.removeEventListener('resize', updateWidgetPositions);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto thin-scrollbar pb-48 sm:pb-52 md:pb-56 lg:pb-60 pt-20 sm:pt-24 md:pt-28 px-3 sm:px-4 md:px-6 safe-area-inset" style={{ paddingBottom: 'max(240px, env(safe-area-inset-bottom, 0px) + 240px)' }}>
      {/* 
         Grid Layout Strategy (4 Columns):
         Row 1: Profile (2x2), Theme (1x1), Map (1x1)
         Row 2: Profile (cont), Spotify (2x1), Gallery (1x1)
         Row 3: Career (1x1), Podcast (1x2), Social (1x1)
         Row 4: Blog (2x1), Podcast (cont), Shop (1x1)
      */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3 auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[220px] lg:auto-rows-[240px]">
        
        {/* 1. Profile / Bio - Large Block (2x2) */}
        <div className="col-span-1 md:col-span-2 row-span-2">
            <TiltCard to="/about" className="flex flex-col p-4 sm:p-6 md:p-8 justify-between">
                <div className="flex justify-between items-start mb-4 sm:mb-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white/5 border-2 sm:border-4 border-slate-100 dark:border-white/10 shadow-lg group-hover:scale-105 transition-all duration-500">
                        <img 
                            src="https://res.cloudinary.com/dxa01fjve/image/upload/c_thumb,g_face,w_400,h_400,q_auto,f_auto/v1764395976/IMG_1106_reb90r.jpg" 
                            alt="Apoorva" 
                            loading="eager"
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="p-2 sm:p-2.5 md:p-3 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                        <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5 md:w-6 md:h-6" size={18} />
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 tracking-tight">
                        I'm Apoorva.
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-neutral-400 font-medium leading-relaxed">
                        Driving Strategy & Execution Across Engineering + AI | Bridging Product Vision with Technical Delivery
                    </p>
                </div>
            </TiltCard>
        </div>

        {/* 2. Status Widget - Tall Block (1x2) - Next to Profile */}
        <div className="col-span-1 row-span-2">
            <TiltCard to="/career" className={`p-3 sm:p-4 md:p-5 flex flex-col ${isBrewing ? 'justify-center' : 'justify-between'} hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors relative overflow-hidden ${isBrewing ? 'bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-amber-50/30 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-amber-950/10' : ''}`}>
                 
                 {isBrewing ? (
                     <div className="flex flex-col flex-1 relative z-10 min-h-0">
                        {/* Header Label - Aligned to Left with Arrow */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
                            <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-bold">
                                <Briefcase size={12} className="sm:w-4 sm:h-4" />
                                <span>Status</span>
                            </div>
                            <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                                <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5" size={16} />
                            </div>
                        </div>
                        
                        {/* Coffee Icon with Steam Animation - Positioned lower */}
                        <div className="flex flex-col items-center justify-start flex-1 min-h-0 mt-24 sm:mt-28 md:mt-32">
                            <div className="relative flex items-center justify-center mb-2 sm:mb-3">
                                <div className="absolute inset-0 bg-amber-200/20 dark:bg-amber-400/10 rounded-full blur-xl -z-10"></div>
                                <Coffee size={48} className="sm:w-14 sm:h-14 md:w-16 md:h-16 text-amber-600 dark:text-amber-400 drop-shadow-xl relative z-10 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
                                {/* Animated Steam - positioned above the coffee cup */}
                                <div className="absolute -top-10 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 w-20 sm:w-22 md:w-24 h-12 sm:h-14 md:h-16 opacity-90 pointer-events-none z-0">
                                    <div className="absolute w-2 sm:w-2.5 h-5 sm:h-6 md:h-7 bg-gradient-to-t from-orange-300/70 to-transparent dark:from-orange-400/50 dark:to-transparent rounded-full blur-[4px] animate-[float_2s_infinite] left-3 sm:left-4 md:left-5 top-0"></div>
                                    <div className="absolute w-2 sm:w-2.5 h-6 sm:h-7 md:h-8 bg-gradient-to-t from-orange-300/60 to-transparent dark:from-orange-400/40 dark:to-transparent rounded-full blur-[4px] animate-[float_2.5s_infinite_0.3s] left-1/2 -translate-x-1/2 top-0"></div>
                                    <div className="absolute w-2 sm:w-2.5 h-4 sm:h-5 md:h-6 bg-gradient-to-t from-orange-300/50 to-transparent dark:from-orange-400/30 dark:to-transparent rounded-full blur-[4px] animate-[float_1.8s_infinite_0.6s] right-3 sm:right-4 md:right-5 top-1"></div>
                                </div>
                            </div>
                            {/* Text Content - Centered */}
                            <div className="text-center space-y-1 sm:space-y-1.5 flex-shrink-0">
                                <h3 className="text-sm sm:text-base font-serif font-bold text-slate-900 dark:text-white leading-tight">{currentJob.role}</h3>
                                <p className="text-[10px] sm:text-[11px] text-slate-600 dark:text-neutral-400 font-medium tracking-wide">
                                    Ready for what's next
                                </p>
                            </div>
                        </div>
                     </div>
                 ) : (
                     <>
                         <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-[9px] sm:text-[10px] font-bold mb-1 relative z-10">
                             <Briefcase size={10} className="sm:w-3 sm:h-3" />
                             <span>Current Role</span>
                         </div>
                         <div className="flex flex-col justify-center flex-1 relative z-10">
                             <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 leading-tight">{currentJob.role}</h3>
                             <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400">
                                 at {currentJob.company}
                             </p>
                         </div>
                     </>
                 )}
            </TiltCard>
        </div>

        {/* 3. Theme Toggle Widget - Small Block (1x1) */}
        <div className="col-span-1 row-span-1">
            <TiltCard onClick={toggleDarkMode} className="p-0 flex items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors touch-manipulation">
                 <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 h-full w-full">
                     <div className="p-3 sm:p-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10">
                        {darkMode ? <Sun className="sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} /> : <Moon className="sm:w-7 sm:h-7 md:w-8 md:h-8" size={24} />}
                     </div>
                     <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-500">
                         {darkMode ? 'Light' : 'Dark'}
                     </span>
                 </div>
            </TiltCard>
        </div>

        {/* 4. Calendar Widget - Small Block (1x1) */}
        <div className="col-span-1 row-span-1">
            <TiltCard 
                className="p-3 sm:p-4 md:p-5 flex flex-col group relative"
            >
                <div className="flex justify-start items-start absolute top-3 left-0 sm:top-4 md:top-5 pl-3 sm:pl-4 md:pl-5">
                    <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-bold">
                        <CalendarIcon size={12} className="sm:w-4 sm:h-4" />
                        <span>Calendar</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 h-full">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-1 leading-none text-center">
                        {new Date().getDate()}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 font-medium text-center">
                        {new Date().toLocaleDateString('en-US', { month: 'short' })} {new Date().getFullYear()}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-neutral-500 font-medium text-center mt-0.5">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                    </div>
                </div>
            </TiltCard>
        </div>

        {/* 5. Spotify - Wide Block (2x1) */}
        <div className="col-span-1 md:col-span-2 row-span-1">
             <TiltCard 
                onClick={!isSpotifyPlaying ? handleSpotifyToggle : undefined}
                image={!isSpotifyPlaying ? "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=800&auto=format&fit=crop" : undefined}
                className={`border-neutral-800 ${isSpotifyPlaying ? '!p-0 bg-[#282828]' : 'flex flex-col justify-between p-5 cursor-pointer group'} ${isSpotifyPlaying ? 'ring-2 ring-green-500/50' : ''}`}
             >
                 {isSpotifyPlaying ? (
                     // Show player when playing - centered
                     <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
                         <SpotifyPlayer isPlaying={isSpotifyPlaying} onPause={onSpotifyPause} inline={true} />
                     </div>
                 ) : (
                     // Show card content when not playing
                     <>
                         <div className="flex justify-between items-start relative z-10">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" className="w-5 h-5 sm:w-6 sm:h-6 invert opacity-80" alt="Spotify" />
                             <div className="flex space-x-0.5 sm:space-x-1 items-end h-3 sm:h-4">
                                <div className="w-0.5 sm:w-1 bg-green-500/50 h-full"></div>
                                <div className="w-0.5 sm:w-1 bg-green-500/50 h-2/3"></div>
                                <div className="w-0.5 sm:w-1 bg-green-500/50 h-3/4"></div>
                             </div>
                         </div>
                         
                         {/* Hover Play Overlay */}
                         <div className="absolute inset-0 flex items-center justify-center z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                <Play fill="currentColor" className="text-white ml-0.5 sm:ml-1 sm:w-6 sm:h-6" size={20} />
                            </div>
                         </div>

                         <div className="relative z-10 group-hover:opacity-20 transition-opacity duration-300">
                             <div className="text-[10px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
                                 Now Playing
                             </div>
                             <div className="font-serif text-lg sm:text-xl text-white leading-none">Cornfield Chase</div>
                             <div className="text-[10px] sm:text-xs text-neutral-400 mt-1">Hans Zimmer</div>
                         </div>
                     </>
                 )}
             </TiltCard>
        </div>

        {/* 6. Gallery / Photos - Small Block (1x1) */}
        <div className="col-span-1 row-span-1">
             <TiltCard 
                to="/passion" 
                className="group p-0 border-neutral-800 transition-all duration-1000 bg-neutral-900 relative"
             >
                 {/* Slideshow Background */}
                 <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-neutral-950">
                     <img 
                        src={GALLERY_IMAGES[galleryIndex].src} 
                        alt="Gallery Slideshow"
                        loading="lazy"
                        className="w-full h-full object-contain transition-opacity duration-1000 opacity-60 group-hover:scale-105"
                        style={{ objectPosition: 'center center' }}
                     />
                 </div>
                 {/* Gradient Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>

                 {/* Arrow Button - Top Right */}
                 <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30">
                     <div className="p-2 sm:p-2.5 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 group-hover:bg-white/20 dark:group-hover:bg-white/10 transition-colors">
                         <ArrowUpRight className="text-white sm:w-5 sm:h-5" size={16} />
                     </div>
                 </div>

                 <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                     <div className="flex items-center gap-2 text-white font-serif italic text-lg border border-white/30 px-4 py-2 rounded-full backdrop-blur-md">
                        <ImageIcon size={18} />
                        <span>Gallery</span>
                     </div>
                 </div>
             </TiltCard>
        </div>

        {/* 7. Podcast - Tall Block (1x2) - WITH STUDIO IMAGE */}
        <div className="col-span-1 row-span-2 relative">
            <TiltCard 
                to="/aligned-intelligence" 
                image="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop" 
                className="border-neutral-800"
            >
                {/* Standard Dark Gradient for Image Widgets */}
                <ComingSoonBadge />
                
                {/* Internal Layout Container */}
                <div className="h-full w-full p-6 flex flex-col justify-end relative z-10 filter blur-[2px] opacity-70">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-4 shadow-lg">
                        <Mic size={20} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-md">The Aligned Intelligence</h3>
                    <p className="text-neutral-300 text-sm line-clamp-3 font-medium mb-6 leading-relaxed opacity-90">{latestEpisode.description}</p>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                         <span className="text-xs font-mono text-neutral-400">{latestEpisode.duration}</span>
                         <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                            Listen <Play size={10} fill="currentColor" />
                         </div>
                    </div>
                </div>
            </TiltCard>
        </div>

        {/* 8. Social - Small Block (1x1) */}
        <div className="col-span-1 row-span-1">
            <TiltCard to="/contact" className="p-6 flex flex-col justify-center items-center gap-5 hover:bg-slate-50 dark:hover:bg-neutral-800">
                <div className="flex -space-x-3">
                    <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-white border-2 border-white dark:border-neutral-900 z-30 group-hover:-translate-y-1 transition-transform"><Linkedin size={24} /></div>
                    <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center text-slate-700 dark:text-white border-2 border-white dark:border-neutral-900 z-20 group-hover:-translate-y-1 transition-transform delay-75"><Github size={24} /></div>
                </div>
                <div className="text-xs font-bold text-slate-400 dark:text-neutral-400 uppercase tracking-widest">Connect</div>
            </TiltCard>
        </div>

        {/* 9. Blog / Writing - Wide Block (2x1) */}
        <div className="col-span-1 md:col-span-2 row-span-1 relative">
             <TiltCard to="/blog" className="p-4 sm:p-5 md:p-6 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors group">
                 {BLOG_POSTS.length > 0 && (
                     <>
                         <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <div className="flex items-center space-x-1.5 sm:space-x-2 text-slate-500 dark:text-neutral-500 uppercase tracking-widest text-xs sm:text-sm font-bold">
                                <span>Blogs</span>
                            </div>
                            <div className="p-2 sm:p-2.5 bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group-hover:bg-slate-200 dark:group-hover:bg-white/10 transition-colors">
                                <ArrowUpRight className="text-slate-900 dark:text-white sm:w-5 sm:h-5" size={16} />
                            </div>
                         </div>
                         
                         <div className="flex-1 flex flex-col justify-center">
                             <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 leading-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                 {BLOG_POSTS[0].title}
                             </h3>
                             <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4">
                                 {BLOG_POSTS[0].excerpt}
                             </p>
                             <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-neutral-500">
                                 <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-medium">
                                     {BLOG_POSTS[0].category}
                                 </span>
                                 <span>•</span>
                                 <span>{BLOG_POSTS[0].date}</span>
                             </div>
                         </div>
                     </>
                 )}
             </TiltCard>
        </div>

        {/* 10. Shop / Lifestyle - Small Block (1x1) */}
        <div className="col-span-1 row-span-1 relative">
            <TiltCard to="/lifestyle" className="flex flex-col justify-end items-start p-6">
                <ComingSoonBadge />
                <div className="flex flex-col items-start w-full filter blur-[2px] opacity-70">
                    <div className="mb-2 p-3 bg-slate-200 dark:bg-white/5 rounded-full text-slate-500 dark:text-slate-400 group-hover:bg-slate-300 dark:group-hover:bg-white/10 transition-colors">
                        <ShoppingBag size={20} />
                    </div>
                    <div className="text-sm font-bold text-slate-500 dark:text-slate-400">Shop My Gear</div>
                    <div className="text-xs text-slate-400 dark:text-slate-600 mt-1">Tech & Essentials</div>
                </div>
            </TiltCard>
        </div>

      </div>
    </div>
  );
};

export default Home;
