
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Dock from './components/Dock';
import BootSequence from './components/BootSequence';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import SpotifyPlayer from './components/SpotifyPlayer';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Career = lazy(() => import('./pages/Career'));
const Passion = lazy(() => import('./pages/Passion'));
const AlignedIntelligence = lazy(() => import('./pages/AlignedIntelligence'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));
const Lifestyle = lazy(() => import('./pages/Lifestyle'));
const Calendar = lazy(() => import('./pages/Calendar'));

const AppContent: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to Dark Mode for the "mature" vibe
  const [booted, setBooted] = useState(false);
  const [isSpotifyPlaying, setIsSpotifyPlaying] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => setDarkMode(prev => !prev), []);
  const handleSpotifyPlay = useCallback(() => setIsSpotifyPlaying(true), []);
  const handleSpotifyPause = useCallback(() => setIsSpotifyPlaying(false), []);

  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className={`h-screen w-screen overflow-hidden font-sans relative transition-colors duration-1000 ${darkMode ? 'bg-black' : 'bg-slate-50'}`}>
      
      {/* Background Layer */}
      <ParticleBackground darkMode={darkMode} />
      
      {/* Subtle Grain/Noise Overlay for Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <CustomCursor />

      {/* Spotify Player - Always mounted to maintain playback */}
      {/* Hidden when on home page (shown in card instead) */}
      <div style={{ display: 'none' }}>
        <SpotifyPlayer isPlaying={isSpotifyPlaying} onPause={handleSpotifyPause} />
      </div>

      {/* UI Layer */}
      <div className="relative z-10 h-full w-full flex flex-col">
        <TopBar 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
          isSpotifyPlaying={isSpotifyPlaying}
          onSpotifyPause={handleSpotifyPause}
        />
        
        {/* Main Workspace */}
        <main className="flex-1 relative overflow-hidden">
           <Suspense fallback={<div className="flex items-center justify-center h-full text-slate-500 dark:text-neutral-400">Loading...</div>}>
             <Routes>
               <Route 
                 path="/" 
                 element={
                   <Home 
                     darkMode={darkMode} 
                     toggleDarkMode={toggleDarkMode}
                     onSpotifyPlay={handleSpotifyPlay}
                     onSpotifyPause={handleSpotifyPause}
                     isSpotifyPlaying={isSpotifyPlaying}
                   /> 
                 } 
               /> 
               <Route path="/about" element={<About />} />
               <Route path="/career" element={<Career />} />
               <Route path="/passion" element={<Passion />} />
               <Route path="/aligned-intelligence" element={<AlignedIntelligence />} />
               <Route path="/lifestyle" element={<Lifestyle />} />
               <Route path="/blog" element={<Blog />} />
               <Route path="/contact" element={<Contact />} />
               <Route path="/calendar" element={<Calendar />} />
             </Routes>
           </Suspense>
        </main>

        <Dock />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
