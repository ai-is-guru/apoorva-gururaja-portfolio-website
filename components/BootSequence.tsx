import React, { useEffect, useState } from 'react';
import { Terminal, Cpu } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING_KERNEL...",
    "LOADING_NEURAL_INTERFACE_V2.5...",
    "MOUNTING_FILE_SYSTEM...",
    "CONNECTING_TO_GLOBAL_NETWORK...",
    "CALIBRATING_SENSORS...",
    "LOADING_USER_PROFILE: APOORVA_GURURAJA...",
    "STARTING_GUI_SUBSYSTEM...",
    "SYSTEM_READY."
  ];

  useEffect(() => {
    let logIndex = 0;
    
    // Log interval
    const logInterval = setInterval(() => {
      if (logIndex < bootLogs.length) {
        setLogs(prev => [...prev, bootLogs[logIndex]]);
        logIndex++;
      }
    }, 400);

    // Progress bar interval
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(logInterval);
          // Wait a bit before completing
          setTimeout(onComplete, 1000);
          return 100;
        }
        // Accelerate towards end
        const increment = prev > 80 ? 5 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center font-mono text-emerald-500 p-8 overflow-hidden">
      
      {/* Background Matrix-like effect (Simplified) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900 to-black pointer-events-none"></div>

      <div className="w-full max-w-lg relative z-10">
        <div className="flex items-center gap-3 mb-8 text-emerald-400">
           <Cpu className="animate-pulse" />
           <span className="text-xl font-bold tracking-widest">APOORVA<span className="text-white">OS</span></span>
        </div>

        {/* Logs */}
        <div className="h-48 overflow-hidden mb-6 border-l-2 border-emerald-500/30 pl-4 font-mono text-sm leading-relaxed">
          {logs.map((log, i) => (
            <div key={i} className="opacity-80 animate-fade-in-up">
              <span className="text-emerald-700 mr-2">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-emerald-300">{'>> '}{log}</span>
            </div>
          ))}
          <div className="animate-pulse text-emerald-500 mt-1">_</div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-emerald-900/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(52,211,153,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-emerald-600 font-bold">
          <span>BOOT_SEQUENCE</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;